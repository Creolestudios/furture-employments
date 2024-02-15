import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, FindManyOptions, Repository } from 'typeorm';
import { EMAIL_MSG, ERROR_MSG, SUCCESS_MSG } from '../../utils/constants';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';
import {
  SearchActiveVacanciesDTO,
  SearchVacancyDto,
  VacancyDTO,
} from '../../dto/vacancy/vacancy.dto';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { fileUpload, writeFile } from '../../utils/upload';
import { UserEntity } from '../../entity/user/user.entity';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { CampaignsDTO, UpdateCampaignDTO } from '../../dto/admin/campaign.dto';
import { VacancyCampaignsEntity } from '../../entity/admin/campaign.entity';
import { CampaignsStatus, VacancyStatus } from '../../utils/enum';
import { join } from 'path';
import { filterString } from '../../utils/helper';
import { startDateLesserThanEndDate } from '../../utils/helper';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import * as moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(VacancyCampaignsEntity)
    private campaignsRepository: Repository<VacancyCampaignsEntity>,

    @InjectRepository(VacancyEntity)
    private vacancyRepository: Repository<VacancyEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(EmployerEntity)
    private employerRepository: Repository<EmployerEntity>,

    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,

    private mailerService: MailerService,
  ) {}

  uploadFileInRootDir = async (file: FileUpload) => {
    const fileBuffer = await fileUpload(file);
    const dirPath = join(__dirname, '../../../public/files');

    writeFile(dirPath, file, fileBuffer);
  };

  async newVacancyService(
    vacancyDto: VacancyDTO,
    userId: number,
    uploadFile: any,
    additionalFile: any,
  ) {
    try {
      const isEmployerExist = await this.employerRepository.findOne({
        where: { user: { id: userId } },
      });

      const isUserExist = await this.userRepository.findOne({
        where: { employerUser: { user: { id: userId } } },
      });
      if (isUserExist) {
        if (uploadFile) {
          uploadFile && this.uploadFileInRootDir(uploadFile);
        }
        if (additionalFile) {
          additionalFile && this.uploadFileInRootDir(additionalFile);
        }
        const vacancy = await this.vacancyRepository.save({
          ...vacancyDto,
          type: [...vacancyDto?.type],
          fileName: uploadFile?.filename ?? '',
          additionalFileName: additionalFile?.filename ?? '',
          employer: isEmployerExist,
          user: isUserExist,
        });
        return { message: SUCCESS_MSG.NEW_VACANCY, vacancyId: vacancy.id };
      }
      throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async employersAllVacanciesService(
    employerId: number,
    userId: number,
    searchParams: SearchVacancyDto,
  ) {
    try {
      const { current, pageSize } = searchParams || {};
      const skip = (current - 1) * pageSize;
      const queryBuilder = this.vacancyRepository
        .createQueryBuilder('vacancy_entity')
        .leftJoinAndMapOne(
          'vacancy_entity.employer',
          'employer_entity',
          'employer_entity',
          'employer_entity.id = vacancy_entity.employerId',
        )
        .leftJoinAndMapMany(
          'vacancy_entity.applications',
          'candidate_application',
          'candidate_application',
          'candidate_application.vacancyId = vacancy_entity.id',
        )
        .orderBy('vacancy_entity.createdAt', 'DESC');

      if (userId) {
        queryBuilder.where('vacancy_entity.userId = :userId', { userId });
      }
      if (searchParams?.query) {
        queryBuilder
          .where('LOWER(employer_entity.companyName) LIKE LOWER(:query)', {
            query: `%${searchParams.query}%`,
          })
          .orWhere('LOWER(vacancy_entity.position) LIKE LOWER(:query)', {
            query: `%${searchParams.query}%`,
          });
      }

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .getManyAndCount();
      return { data, total };
    } catch (error) {
      getError(error);
    }
  }

  async vacancyDetailsService(vacancyId: number) {
    try {
      const details = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
        relations: ['employer', 'campaigns'],
      });
      if (!details) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      return { ...details, type: details.type };
    } catch (error) {
      getError(error);
    }
  }

  async vacancyDetailsByCategory(JobCat: string) {
    try {
      const vacancyDetailsByCat = await this.vacancyRepository.find({
        where: { category: JobCat },
      });
      if (!vacancyDetailsByCat) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      return { data: vacancyDetailsByCat };
    } catch (error) {
      getError(error);
    }
  }

  async vacancyDetailsById(vacancyId: number) {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const details = await this.vacancyRepository
        .createQueryBuilder('vacancy_entity')
        .leftJoinAndMapOne(
          'vacancy_entity.campaigns',
          'vacancy_campaigns',
          'vacancy_campaigns',
          'vacancy_campaigns.vacancyId = vacancy_entity.id',
        )
        .where({ id: vacancyId })
        .andWhere(
          '(vacancy_campaigns.endDate <= :currentDate OR vacancy_campaigns.endDate IS NOT NULL)',
          {
            currentDate,
          },
        )
        .getOne();
      if (!details) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      return { ...details, type: details.type };
    } catch (error) {
      getError(error);
    }
  }

  async allVacancyDetails() {
    try {
      const details = await this.vacancyRepository.find();
      if (!details) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      return { data: details };
    } catch (error) {
      getError(error);
    }
  }

  async approveVacancyService(vacancyId: number) {
    try {
      const details = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
        relations: ['user'],
      });

      if (!details) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }

      await this.vacancyRepository.update(vacancyId, {
        status: 2,
      });

      const isUser = await this.userRepository.findOne({
        where: { id: details.user.id },
      });

      this.mailerService.sendMail({
        to: isUser.email,
        from: process.env.MAIL_FROM_USER,
        subject: EMAIL_MSG.VACANCY_APPROVE,
        template: 'vacancyApprove',
        context: {
          name: isUser.firstName + ' ' + isUser.lastName,
          vacancy: details.position,
        },
      });

      return { message: SUCCESS_MSG.APPROVE_VACANCY };
    } catch (error) {
      getError(error);
    }
  }

  async updateVacancyFileService(
    file: any,
    additionalFile: any,
    vacancyId: number,
  ) {
    try {
      const details = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
      });
      if (!details) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      file && this.uploadFileInRootDir(file);
      additionalFile && this.uploadFileInRootDir(additionalFile);
      await this.vacancyRepository.update(vacancyId, {
        fileName: file?.filename,
        additionalFileName: additionalFile?.filename,
      });
      return { message: SUCCESS_MSG.FILE_UPDATED };
    } catch (error) {
      getError(error);
    }
  }

  async closeVacancyService(vacancyId: number, closeReason: string) {
    try {
      const vacancyDetails = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
        relations: ['user'],
      });

      if (!vacancyDetails) {
        GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }

      await this.vacancyRepository.update(vacancyId, {
        status: 3,
        closeReason: closeReason,
      });

      const isUser = await this.userRepository.findOne({
        where: { id: vacancyDetails.user.id },
      });

      this.mailerService.sendMail({
        to: isUser.email,
        from: process.env.MAIL_FROM_USER,
        subject: EMAIL_MSG.VACANCY_CLOSE,
        template: 'closeVacancy',
        context: {
          name: isUser.firstName + ' ' + isUser.lastName,
          vacancy: vacancyDetails.position,
        },
      });

      return { message: SUCCESS_MSG.CLOSE_VACANCY };
    } catch (error) {
      getError(error);
    }
  }

  async startCampaignService(
    campaignsDTO: CampaignsDTO,
    vacancyId,
    userId: number,
  ) {
    try {
      const isAdmin = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!isAdmin) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }

      const isVacancy = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
        relations: ['employer', 'employer.user'],
      });

      if (!isVacancy) {
        GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      if (
        !startDateLesserThanEndDate({
          startDate: campaignsDTO.startDate,
          endDate: campaignsDTO.endDate,
        })
      ) {
        GqlBadRequestErrorException(ERROR_MSG.CAMPAIGN_DATE_INVALID);
      }

      if (!campaignsDTO.slug) {
        campaignsDTO.slug = filterString(campaignsDTO.title)
          .toLowerCase()
          .split(' ')
          .join('-');
      }
      const newCampaign = await this.campaignsRepository.save({
        ...campaignsDTO,
        admin: isAdmin,
        vacancy: isVacancy,
      });

      const isUser = await this.userRepository.findOne({
        where: { id: isVacancy.employer.user.id },
      });

      this.mailerService.sendMail({
        to: isUser.email,
        from: process.env.MAIL_FROM_USER,
        subject: EMAIL_MSG.CAMPAIGN_START,
        template: 'campaignRun',
        context: {
          name: isUser.firstName + ' ' + isUser.lastName,
          vacancy: isVacancy.position,
          fromDate: campaignsDTO.startDate,
          toDate: campaignsDTO.endDate,
        },
      });

      return { id: newCampaign.id, message: SUCCESS_MSG.CAMPAIGN_CREATED };
    } catch (error) {
      getError(error);
    }
  }

  async vacancyCampaignsListService(vacancyId: number) {
    try {
      const isVacancy = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
      });

      if (!isVacancy) {
        GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }

      const vacancyCampaignsList: any = await this.campaignsRepository.find({
        where: { vacancy: { id: vacancyId } },
        relations: ['vacancy'],
      });

      const formattedCampaignsList = vacancyCampaignsList.map((campaign) => {
        return {
          ...campaign,
          startDate: moment(
            campaign.startDate,
            'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
          ).format('YYYY-MM-DD HH:mm:ss.SSSSSSZ'),

          endDate: moment(
            campaign.endDate,
            'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
          ).format('YYYY-MM-DD HH:mm:ss.SSSSSSZ'),
        };
      });
      return { data: formattedCampaignsList };
    } catch (error) {
      getError(error);
    }
  }

  async updateVacancyService(vacancyDto: any, vacancyId: number) {
    try {
      const vacancyDetails = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
      });
      if (!vacancyDetails) {
        GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      await this.vacancyRepository.update(vacancyId, {
        ...vacancyDto,
        type: vacancyDto?.type?.includes(',')
          ? vacancyDto.type?.split(',')
          : vacancyDto.type,
      });
      return { message: SUCCESS_MSG.UPDATE_VACANCY };
    } catch (error) {
      getError(error);
    }
  }

  async campaignsDetailsService(campaignId: number) {
    try {
      const isCampaign = await this.campaignsRepository.findOne({
        where: { id: campaignId },
      });
      if (!isCampaign) GqlNotFoundException(ERROR_MSG.CAMPAIGN_STATUS);
      return isCampaign;
    } catch (error) {
      getError(error);
    }
  }

  async updateCampaignService(updateCampaignDto: UpdateCampaignDTO) {
    try {
      const isCampaign = await this.campaignsRepository.findOne({
        where: { id: updateCampaignDto.id },
      });

      if (!isCampaign) GqlNotFoundException(ERROR_MSG.CAMPAIGN_NOT_FOUND);

      if (
        !startDateLesserThanEndDate({
          startDate: updateCampaignDto.startDate,
          endDate: updateCampaignDto.endDate,
        })
      )
        GqlBadRequestErrorException(ERROR_MSG.CAMPAIGN_DATE_INVALID);
      await this.campaignsRepository.update(
        updateCampaignDto.id,
        updateCampaignDto,
      );
      return { id: isCampaign.id, message: SUCCESS_MSG.CAMPAIGN_UPDATED };
    } catch (error) {
      getError(error);
    }
  }

  async updateCampaignStatusService(campaignId: number, status: number) {
    try {
      const isCampaign = await this.campaignsRepository.findOne({
        where: { id: campaignId },
      });

      if (!isCampaign) GqlNotFoundException(ERROR_MSG.CAMPAIGN_NOT_FOUND);

      await this.campaignsRepository.update(campaignId, { status });
      if (status === CampaignsStatus.STOP)
        return { id: isCampaign.id, message: SUCCESS_MSG.CAMPAIGN_STOP };
      return { id: isCampaign.id, message: SUCCESS_MSG.CAMPAIGN_START };
    } catch (error) {
      getError(error);
    }
  }
  async updateCampaignStatusOnExpire() {
    const currentDateTime = moment(
      new Date(),
      'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
    ).format('YYYY-MM-DD HH:mm:ss.SSSSSSZ');

    const campaigns = await this.campaignsRepository.find();
    for (const campaign of campaigns) {
      const endDate = moment(
        campaign.endDate,
        'YYYY-MM-DD HH:mm:ss.SSSSSSZ',
      ).format('YYYY-MM-DD HH:mm:ss.SSSSSSZ');
      if (moment(endDate) < moment(currentDateTime)) {
        campaign.status = CampaignsStatus.STOP;
        await this.campaignsRepository.save(campaign);
      }
    }
  }
  async findApplicationsByVacancy(
    current: number,
    pageSize: number,
    vacancyId: number,
  ) {
    try {
      const skip = (current - 1) * pageSize;
      const queryBuilder = this.applicationRepository
        .createQueryBuilder('candidate_application')
        .leftJoinAndMapOne(
          'candidate_application.vacancy',
          'vacancy_entity',
          'vacancy_entity',
          'vacancy_entity.id=candidate_application.vacancyId',
        )
        .leftJoinAndMapOne(
          'candidate_application.user',
          'user_entity',
          'user_entity',
          'user_entity.id=candidate_application.userId',
        )
        .where('candidate_application.vacancy = :vacancyId', { vacancyId });
      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .orderBy('candidate_application.createdAt', 'DESC')
        .getManyAndCount();
      const totalPages = Math.ceil(total / pageSize);
      return {
        data: data,
        pageNo: current,
        totalPages: totalPages,
      };
    } catch (error) {
      getError(error);
    }
  }

  async downloadVacancyFileService(vacancyId: number) {
    try {
      const details = await this.vacancyRepository.findOne({
        where: { id: vacancyId },
      });
      if (!details) {
        throw new GqlNotFoundException(ERROR_MSG.VACANCY_NOT_FOUND);
      }
      return {
        filename: details.fileName,
      };
    } catch (error) {
      getError(error);
    }
  }
  async vacanciesAwaitingApprovalService() {
    try {
      const queryBuilder = this.vacancyRepository
        .createQueryBuilder('vacancy_entity')
        .where('vacancy_entity.status = :status', {
          status: VacancyStatus.UNAPPROVED,
        })
        .leftJoinAndMapOne(
          'vacancy_entity.employer',
          'employer_entity',
          'employer_entity',
          'employer_entity.id = vacancy_entity.employerId',
        )
        .leftJoinAndMapOne(
          'vacancy_entity.user',
          'user_entity',
          'user_entity',
          'user_entity.id = vacancy_entity.userId',
        );

      const [data, total] = await queryBuilder.getManyAndCount();
      return {
        data,
        total,
      };
    } catch (error) {
      getError(error);
    }
  }

  async getLatestOpenVacanciesService(fromJobSearch: boolean) {
    try {
      const commonQuery: FindManyOptions<VacancyEntity> = {
        where: {
          status: VacancyStatus.OPEN,
          campaigns: { featured: true, status: CampaignsStatus.START },
        },
        order: { updatedAt: 'DESC' },
        relations: ['employer'],
      };

      const latestVacancyList = await this.vacancyRepository.find({
        ...commonQuery,
        take: fromJobSearch ? 6 : undefined,
      });
      return {
        data: latestVacancyList,
      };
    } catch (error) {
      getError(error);
    }
  }
  async searchActiveVacanciesService(
    current: number,
    pageSize: number,
    searchParams: SearchActiveVacanciesDTO,
  ) {
    try {
      const skip = (current - 1) * pageSize;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const queryBuilder = await this.vacancyRepository
        .createQueryBuilder('vacancy_entity')
        .leftJoinAndMapOne(
          'vacancy_entity.employer',
          'employer_entity',
          'employer_entity',
          'employer_entity.id = vacancy_entity.employerId',
        )
        .leftJoinAndMapOne(
          'vacancy_entity.user',
          'user_entity',
          'user_entity',
          'user_entity.id = vacancy_entity.userId',
        )
        .leftJoinAndMapOne(
          'vacancy_entity.campaigns',
          'vacancy_campaigns',
          'vacancy_campaigns',
          'vacancy_campaigns.vacancyId = vacancy_entity.id',
        );
      if (
        searchParams.query ||
        searchParams.jobType ||
        searchParams.salaryFrom ||
        searchParams.salaryTo
      ) {
        queryBuilder.where(
          new Brackets((qb) => {
            if (searchParams.query) {
              qb.andWhere(
                new Brackets((subQb) => {
                  subQb.orWhere('vacancy_entity.position ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                  subQb.orWhere('employer_entity.country ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                  subQb.orWhere('employer_entity.city ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                  subQb.orWhere('employer_entity.county ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                }),
              );
            }
            if (searchParams.salaryFrom && searchParams.salaryTo) {
              qb.andWhere(
                `CAST(
                  REPLACE(REPLACE(REPLACE(REPLACE(vacancy_entity.salary, 'Up to', ''), '£', ''), '$', ''), ',', '') AS NUMERIC
                ) BETWEEN CAST(:salaryFrom AS NUMERIC) AND CAST(:salaryTo AS NUMERIC)`,
                {
                  salaryFrom: parseFloat(searchParams.salaryFrom),
                  salaryTo: parseFloat(searchParams.salaryTo),
                },
              );
            }

            if (searchParams.jobType) {
              qb.andWhere(
                '(SELECT COUNT(*) FROM UNNEST(vacancy_entity.type) AS jobType WHERE LOWER(jobType) ILIKE LOWER(:jobType)) > 0',
                {
                  jobType: `%${searchParams.jobType}%`,
                },
              );
            }
          }),
        );
      }

      const [data, total] = await queryBuilder
        .andWhere(
          '(vacancy_campaigns.endDate <= :currentDate OR vacancy_campaigns.endDate IS NOT NULL)',
          {
            currentDate,
          },
        )
        .skip(skip)
        .take(pageSize)
        .getManyAndCount();
      return {
        data,
        current,
        total,
      };
    } catch (error) {
      getError(error);
    }
  }
  async isUserAppliedToVacancy(vacancyId: number, userId: number) {
    try {
      const details = await this.applicationRepository.findOne({
        where: { vacancy: { id: vacancyId }, user: { id: userId } },
      });
      if (!details) {
        return { applied_by_user: false };
      }

      return { applied_by_user: true };
    } catch (error) {
      getError(error);
    }
  }
}
