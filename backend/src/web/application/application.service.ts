import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { EMAIL_MSG, ERROR_MSG, SUCCESS_MSG } from '../../utils/constants';
import { ApplicationStatus } from '../../utils/enum';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { Repository } from 'typeorm';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import { UserEntity } from 'src/entity/user/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(CandidateProfileEntity)
    private readonly candidateRepository: Repository<CandidateProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailerService: MailerService,
  ) {}

  async getCandidateApplicationsService({
    current,
    pageSize,
    userId,
    candidateId,
  }) {
    try {
      if (candidateId) {
        const isCandidate = await this.candidateRepository.findOne({
          where: { id: candidateId },
          relations: ['user'],
        });
        userId = isCandidate?.user?.id;
      }

      const skip = (current - 1) * pageSize;
      const queryBuilder = this.applicationRepository
        .createQueryBuilder('candidate_application')
        .leftJoinAndMapOne(
          'candidate_application.vacancy',
          'vacancy_entity',
          'vacancy_entity',
          'vacancy_entity.id=candidate_application.vacancyId',
        )
        .where('candidate_application.userId = :userId', { userId });

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .orderBy('candidate_application.createdAt', 'DESC')
        .getManyAndCount();

      const result = data?.length > 0 ? data : null;

      if (result) {
        const _data = data.map((item) => ({
          ...item,
        }));
        return { applications: _data, total: total };
      } else {
        return { applications: [], total: 0 };
      }
    } catch (error) {
      getError(error);
    }
  }
  async getCandidateApplicationsForAdminService({ current, pageSize, userId }) {
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
        .leftJoin('vacancy_entity.employer', 'employer_entity')
        .select([
          'candidate_application',
          'vacancy_entity',
          'user_entity',
          'employer_entity',
        ])
        .where('user_entity.id = :userId', { userId });

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .orderBy('candidate_application.createdAt', 'DESC')
        .getManyAndCount();

      const result = data?.length > 0 ? data : null;
      if (result) {
        return { applications: result, total: total };
      } else {
        // REVIEW naming convention
        //NOTE - resolved
        return { applications: [], total: 0 };
      }
    } catch (error) {
      getError(error);
    }
  }

  async getEmployerApplicationsService({ current, pageSize, userId }) {
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
        .where('vacancy_entity.userId = :userId', { userId })
        .andWhere('candidate_application.status <> :status', { status: 1 });

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .orderBy('candidate_application.createdAt', 'DESC')
        .getManyAndCount();

      const result = data?.length > 0 ? data : null;
      if (result) {
        return { applications: data, total: total };
      } else {
        // REVIEW naming convention
        //NOTE - resolved
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
    } catch (error) {
      getError(error);
    }
  }

  async getAdminApplicationsService({ current, pageSize }) {
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
        .leftJoinAndMapOne(
          'candidate_application.aboutCandidate',
          'candidate_about',
          'candidate_about',
          'candidate_about.userId=candidate_application.userId',
        )
        .leftJoin('vacancy_entity.employer', 'employer_entity')
        .select([
          'candidate_application',
          'vacancy_entity',
          'user_entity',
          'employer_entity',
          'candidate_about',
        ]);

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .orderBy('candidate_application.createdAt', 'DESC')
        .getManyAndCount();

      const result = data?.length > 0 ? data : null;
      if (result) {
        return { applications: result, total: total };
      } else {
        return { applications: [], total: 0 };
      }
    } catch (error) {
      getError(error);
    }
  }

  async getApplicationByVacancyService({ current, pageSize, vacancyId }) {
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
        applications: data,
        pageNo: current,
        total: totalPages,
      };
    } catch (error) {
      getError(error);
    }
  }

  async applicationShortlisted(applicationId: number) {
    try {
      const application = await this.applicationRepository.find({
        where: { id: applicationId },
      });
      if (!application) GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      await this.applicationRepository.update(applicationId, {
        status: ApplicationStatus.SHORTLISTED,
      });
      return { message: SUCCESS_MSG.APPLICATION_SHORTLISTED };
    } catch (error) {
      getError(error);
    }
  }

  async applicationAccepted(applicationId: number) {
    try {
      const application = await this.applicationRepository.find({
        where: { id: applicationId },
      });
      if (!application) GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      await this.applicationRepository.update(applicationId, {
        status: ApplicationStatus.ACCEPTED,
      });
      return { message: SUCCESS_MSG.APPLICATION_ACCEPTED };
    } catch (error) {
      getError(error);
    }
  }

  async approveApplicationService(
    applicationId: number,
    approveReason: string,
    adminId: number,
  ) {
    try {
      const isApplication = await this.applicationRepository.findOne({
        where: { id: applicationId },
        relations: ['user'],
      });
      if (isApplication) {
        const admin = await this.userRepository.findOne({
          where: { id: adminId },
        });
        if (admin) {
          await this.applicationRepository.update(isApplication.id, {
            status: ApplicationStatus.OPEN,
            approveReason: approveReason,
            approvedBy: admin.firstName + ' ' + admin.lastName,
          });
        } else {
          GqlBadRequestErrorException(ERROR_MSG.SOMETHING_WRONG);
        }

        const candidateUser = await this.userRepository.findOne({
          where: { id: isApplication.user.id },
        });

        this.mailerService.sendMail({
          to: candidateUser.email,
          from: process.env.MAIL_FROM_USER,
          subject: EMAIL_MSG.APPLICATION_APPROVE,
          template: 'applicationApprove',
          context: {
            name: candidateUser.firstName + ' ' + candidateUser.lastName,
          },
        });
      } else {
        GqlBadRequestErrorException(ERROR_MSG.APPLICATION_NOT_FOUND);
      }
      return { message: SUCCESS_MSG.APPLICATION_APPROVE };
    } catch (error) {
      getError(error);
    }
  }

  async rejectApplicationService(rejectReason: string, applicationId: number) {
    try {
      const isApplication = await this.applicationRepository.findOne({
        where: { id: applicationId },
      });
      if (!isApplication)
        GqlBadRequestErrorException(ERROR_MSG.APPLICATION_NOT_FOUND);

      await this.applicationRepository.update(isApplication.id, {
        status: ApplicationStatus.CLOSED,
        reason: rejectReason,
      });
      return { message: SUCCESS_MSG.APPLICATION_REJECTED };
    } catch (error) {
      getError(error);
    }
  }

  async findCandidateApplication(applicationId: number) {
    try {
      const application = await this.applicationRepository.findOne({
        where: { id: applicationId },
        relations: [
          'vacancy',
          'user',
          'user.candidateProfile',
          'user.aboutCandidate',
          'aboutCandidate',
          'vacancy.employer',
        ],
      });

      if (application) {
        return {
          ...application,
          // createdAt: convertDateInGivenFormat(
          //   application.createdAt,
          //   DATE_FORMAT.DD_MM_YYYY,
          // ),
          profile: application.user.candidateProfile,
          about: application.user.aboutCandidate,
        };
      }
      throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async getApplicationsWaitingForApprovalService() {
    try {
      // const skip = (current - 1) * pageSize;
      const queryBuilder = this.applicationRepository
        .createQueryBuilder('candidate_application')
        .where('candidate_application.status = :status', {
          status: ApplicationStatus.UNAPPROVED,
        })
        .leftJoinAndMapOne(
          'candidate_application.vacancy',
          'vacancy_entity',
          'vacancy_entity',
          'vacancy_entity.id = candidate_application.vacancyId',
        )
        .leftJoinAndMapOne(
          'candidate_application.user',
          'user_entity',
          'user_entity',
          'user_entity.id = candidate_application.userId',
        )
        .leftJoinAndMapOne(
          'candidate_application.aboutCandidate',
          'candidate_about',
          'candidate_about',
          'candidate_about.userId=candidate_application.userId',
        )
        .leftJoin('vacancy_entity.employer', 'employer_entity')
        .select([
          'candidate_application',
          'vacancy_entity',
          'user_entity',
          'employer_entity',
          'candidate_about',
        ]);

      const [data, total] = await queryBuilder.getManyAndCount();

      const result = data?.length > 0 ? data : null;
      if (result) {
        return { applications: result, total: total };
      } else {
        return { applications: [], total: 0 };
      }
    } catch (error) {
      getError(error);
    }
  }
}
