import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { DisableAdminDto, UpdateAdminDto } from '../../dto/admin/admin.dto';
import { UserEntity } from '../../entity/user/user.entity';
import { ERROR_MSG, SUCCESS_MSG, TIMELINE_MSG } from '../../utils/constants';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { Brackets, ILike, Repository } from 'typeorm';
import { SearchClientDto } from '../../dto/admin/client.dto';
import {
  CandidateUpdateSkillsDTO,
  InviteCandidatesDTO,
  SearchCandidateDto,
} from '../../dto/admin/candidate.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FileUpload } from 'graphql-upload';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import { AboutCandidateEntity } from '../../entity/candidate/registration/about.entity';
import { UpdateUserBasicSignupDto } from '../../dto/user/updateUser.dto';
import { UpdateCandidateProfileDto } from '../../dto/candidate/registration/profile.dto';
import { UpdateAboutCandidateDto } from '../../dto/candidate/registration/about.dto';
import { fileUpload, getFileUrl, writeFile } from '../../utils/upload';
import { join } from 'path';
import { UpdateCandidateJobPreferenceDto } from '../../dto/candidate/registration/job-preference.dto';
import { CandidateJobPreferenceEntity } from '../../entity/candidate/registration/jobPreference.entity';
import { CandidateNoteEntity } from '../../entity/admin/candidateNote.entity';
import { UpdateNotesDTO } from '../../dto/admin/adminNote.dto';
import { EmployerNotesEntity } from '../../entity/admin/employerNote.entity';
import { AddAdminDTO } from '../../dto/admin/addAdmin.dto';
import { AddCityDTO } from '../../dto/lists/addList/addCity.dto';
import { CityEntity, CountryEntity } from '../../entity/lists/country.entity';
import { JobTypeEntity } from '../../entity/lists/jobType.entity';
import { LanguageEntity } from '../../entity/lists/language.entity';
import { JobCatEntity } from '../../entity/lists/jobCat.entity';
import { AddCountryDTO } from '../../dto/lists/addList/addCountry.dto';
import { AddLanguageDTO } from '../../dto/lists/addList/addLanguage.dto';
import { AddJobTypeDTO } from '../../dto/lists/addList/addJobType.dto';
import { AddJobCatDTO } from '../../dto/lists/addList/addJobCat.dto';
import { Role } from '../../utils/enum';
import { SkillsEntity } from '../../entity/admin/skills.entity';
import { SkillDTO } from '../../dto/admin/skill.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { VacancyEntity } from 'src/entity/vacancy/vacancy.entity';
import * as pdfParse from 'pdf-parse';
import { marked } from 'marked';
import {
  CloseClientDTO,
  NewProspectDto,
  ProspectAddressDTO,
  ProspectPeopleDTO,
  SearchProspectsClientsDto,
  UpdateConvertedClientDTO,
  UpdateProspectClientDTO,
} from 'src/dto/admin/prospectClient.dto';
import {
  ProspectAddress,
  ProspectClientsEntity,
  ProspectPeople,
} from 'src/entity/prospectsClients/prospectClients.entity';
import { ProspectTimelineEntity } from 'src/entity/prospectsClients/timeline.entity';
import { mapCamelKeysToPascalValues } from 'src/utils/helper';
import * as moment from 'moment';
import { EmployerProfileEditDto } from 'src/dto/employerRegistration/employerRegistration.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EmployerEntity)
    private employerRepository: Repository<EmployerEntity>,
    @InjectRepository(CandidateProfileEntity)
    private candidateRepository: Repository<CandidateProfileEntity>,
    @InjectRepository(AboutCandidateEntity)
    private aboutCandidateRepository: Repository<AboutCandidateEntity>,
    @InjectRepository(CandidateJobPreferenceEntity)
    private candidateJobPreferenceRepository: Repository<CandidateJobPreferenceEntity>,
    @InjectRepository(CandidateNoteEntity)
    private candidateNoteRepository: Repository<CandidateNoteEntity>,
    @InjectRepository(EmployerNotesEntity)
    private employerNotesRepository: Repository<EmployerNotesEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    @InjectRepository(JobTypeEntity)
    private jobTypeRepository: Repository<JobTypeEntity>,
    @InjectRepository(JobCatEntity)
    private jobCatRepository: Repository<JobCatEntity>,
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
    @InjectRepository(SkillsEntity)
    private skillsRepository: Repository<SkillsEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService,
    @InjectRepository(VacancyEntity)
    private vacancyRepository: Repository<VacancyEntity>,
    @InjectRepository(ProspectClientsEntity)
    private prospectRepository: Repository<ProspectClientsEntity>,
    @InjectRepository(ProspectAddress)
    private prospectAddressRepository: Repository<ProspectAddress>,
    @InjectRepository(ProspectPeople)
    private prospectPeopleRepository: Repository<ProspectPeople>,
    @InjectRepository(ProspectTimelineEntity)
    private prospectTimelineRepository: Repository<ProspectTimelineEntity>,
  ) {}

  async generateJWTToken(user) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: Role.ADMIN,
    };
    return this.jwtService.sign(jwtPayload);
  }

  async allAdminList() {
    try {
      const adminList = await this.userRepository.find({ where: { role: 3 } });
      return { data: adminList };
    } catch (error) {
      getError(error);
    }
  }

  async adminDetails(userId: number) {
    try {
      const adminDetails = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!adminDetails) {
        GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
      }

      return adminDetails;
    } catch (error) {
      getError(error);
    }
  }

  async addAdminService(addAdminDto: AddAdminDTO) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { email: addAdminDto.email },
      });
      if (isUser) {
        GqlBadRequestErrorException(ERROR_MSG.ADMIN_ALREADY_REGISTER);
      }

      const hashPassword = await bcrypt.hash(addAdminDto.password, 10);

      const newUser = await this.userRepository.save({
        ...addAdminDto,
        password: hashPassword,
        role: Role.ADMIN,
      });

      const token = await this.generateJWTToken(newUser);

      return {
        message: SUCCESS_MSG.ADMIN_CREATED,
        token: token,
      };
    } catch (error) {
      getError(error);
    }
  }

  async addCountry(addCountryDto: AddCountryDTO) {
    try {
      const isCountry = await this.countryRepository.findOne({
        where: { country: addCountryDto.country },
      });
      if (isCountry) {
        GqlBadRequestErrorException(ERROR_MSG.COUNTRY_ALREADY_EXIST);
      }

      const newCountry = this.countryRepository.create({
        ...addCountryDto,
      });
      await this.countryRepository.save(newCountry);

      return {
        message: SUCCESS_MSG.COUNTRY_ADDED,
      };
    } catch (error) {
      getError(error);
    }
  }

  async addCity(addCityDto: AddCityDTO) {
    try {
      const city = await this.cityRepository.findOne({
        where: { city: addCityDto.city },
      });
      if (city) {
        GqlBadRequestErrorException(ERROR_MSG.CITY_ALREADY_EXIST);
      }
      const country = await this.countryRepository.findOne({
        where: { country: addCityDto.country },
      });
      if (!country) {
        throw new Error('Country not found');
      }
      const newCity = await this.cityRepository.create({
        city: addCityDto.city,
        country: country,
      });
      await this.cityRepository.save(newCity);
      return {
        message: SUCCESS_MSG.CITY_ADDED,
      };
    } catch (error) {
      throw error;
    }
  }
  async addLanguage(addLanguageDto: AddLanguageDTO) {
    try {
      const isCountry = await this.languageRepository.findOne({
        where: { languages: addLanguageDto.languages },
      });
      if (isCountry) {
        GqlBadRequestErrorException(ERROR_MSG.Language_ALREADY_EXIST);
      }

      const newLanguage = this.languageRepository.create({
        ...addLanguageDto,
      });
      await this.languageRepository.save(newLanguage);

      return {
        message: SUCCESS_MSG.LANGUAGE_ADDED,
      };
    } catch (error) {
      getError(error);
    }
  }

  async addJobType(addJobTypeDto: AddJobTypeDTO) {
    try {
      const isCountry = await this.jobTypeRepository.findOne({
        where: { JobType: addJobTypeDto.jobType },
      });
      if (isCountry) {
        GqlBadRequestErrorException(ERROR_MSG.JOB_TYPE_ALREADY_EXIST);
      }

      const newJobType = this.jobTypeRepository.create({
        JobType: addJobTypeDto.jobType,
      });
      await this.jobTypeRepository.save(newJobType);

      return {
        message: SUCCESS_MSG.JOB_TYPE_ADDED,
      };
    } catch (error) {
      getError(error);
    }
  }

  async addJobCat(addJobCatDto: AddJobCatDTO) {
    try {
      const isCountry = await this.jobCatRepository.findOne({
        where: { JobCategory: addJobCatDto.jobCategory },
      });
      if (isCountry) {
        GqlBadRequestErrorException(ERROR_MSG.JOB_CAT_ALREADY_EXIST);
      }
      const newJobType = this.jobCatRepository.create({
        JobCategory: addJobCatDto.jobCategory,
      });
      await this.jobCatRepository.save(newJobType);

      return {
        message: SUCCESS_MSG.JOB_CAT_ADDED,
      };
    } catch (error) {
      getError(error);
    }
  }

  async disableAdminService(disableAdminDto: DisableAdminDto) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { id: disableAdminDto.userId },
      });
      if (!isUser) {
        GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
      }
      await this.userRepository.update(isUser.id, {
        disableAdmin: disableAdminDto.disableAdmin,
      });
      return { message: SUCCESS_MSG.DISABLE_ADMIN_SUCCESS };
    } catch (error) {
      getError(error);
    }
  }

  async updateAdminService(updateAdminDto: UpdateAdminDto) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { id: updateAdminDto.userId },
      });
      if (!isUser) {
        GqlBadRequestErrorException(ERROR_MSG.INVALID_TOKEN);
      }
      await this.userRepository.update(isUser.id, {
        firstName: updateAdminDto.firstName,
        lastName: updateAdminDto.lastName,
        email: updateAdminDto.email,
      });
      return { message: SUCCESS_MSG.ADMIN_UPDATED };
    } catch (error) {
      getError(error);
    }
  }

  async searchClientService(searchParams: SearchClientDto) {
    try {
      const { current, pageSize } = searchParams;
      const skip = (current - 1) * pageSize;

      // create a query builder instance for employer_entity
      // perform leftjoin with user_entity and mapping the result of user_entity

      const queryBuilder = this.employerRepository
        .createQueryBuilder('employer_entity')
        .leftJoinAndMapOne(
          'employer_entity.user',
          'user_entity',
          'user_entity',
          'user_entity.id = employer_entity.userId',
        );

      if (searchParams.query) {
        queryBuilder
          .where('employer_entity.companyName ILIKE :query', {
            query: `%${searchParams.query}%`,
          })
          .orWhere('user_entity.email ILIKE :query', {
            query: `%${searchParams.query}%`,
          })
          .orWhere('user_entity.firstName ILIKE :query', {
            query: `%${searchParams.query}%`,
          })
          .orWhere('user_entity.lastName ILIKE :query', {
            query: `%${searchParams.query}%`,
          });
      }

      const [data, total] = await queryBuilder
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

  async searchCandidateService(searchParams: SearchCandidateDto) {
    try {
      const { current, pageSize } = searchParams;
      const skip = (current - 1) * pageSize;
      const sortBy = searchParams.sortBy?.split(' ');
      const sortingType: string = sortBy[1];
      const sortingKey = sortBy[0];
      const queryBuilder = this.candidateRepository
        .createQueryBuilder('candidate_profile')
        .where('user_entity.id IS NOT NULL')
        .leftJoinAndMapOne(
          'candidate_profile.user',
          'user_entity',
          'user_entity',
          'user_entity.id = candidate_profile.userId AND user_entity.id IS NOT NULL',
        )
        .leftJoinAndMapOne(
          'candidate_profile.jobPreference',
          'candidate_job_preference',
          'candidate_job_preference',
          'candidate_job_preference.user = candidate_profile.user AND user_entity.id IS NOT NULL',
        )
        .leftJoinAndMapOne(
          'candidate_profile.aboutCandidate',
          'candidate_about',
          'candidate_about',
          'candidate_about.user = candidate_profile.user AND user_entity.id IS NOT NULL',
        );

      if (searchParams.sortBy) {
        if (searchParams.sortBy.includes('desiredSalary')) {
          queryBuilder
            .addSelect(
              "regexp_replace(regexp_replace(candidate_job_preference.desiredSalary, '[^0-9]+', '', 'g'), '^0*', '')",
              'numeric_salary',
            )
            .orderBy('numeric_salary', 'DESC');
        } else {
          queryBuilder.orderBy(
            `candidate_profile.${sortingKey}`,
            sortingType as 'ASC' | 'DESC',
          );
        }
      }

      if (
        searchParams.query ||
        searchParams.skills ||
        searchParams.salary ||
        searchParams.languages ||
        searchParams.location ||
        searchParams.jobTypes ||
        searchParams.categories
      ) {
        queryBuilder.where(
          new Brackets((qb) => {
            if (searchParams.query) {
              qb.andWhere(
                new Brackets((subQb) => {
                  subQb.orWhere('user_entity.firstName ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                  subQb.orWhere('user_entity.lastName ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                  subQb.orWhere('user_entity.email ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                }),
              );
            }
            if (searchParams.skills && searchParams.skills.length > 0) {
              qb.andWhere(
                'LOWER(candidate_about.skills::text) LIKE ANY(:skills)',
                {
                  skills: searchParams.skills.map(
                    (e) => `%${e.toLowerCase()}%`,
                  ),
                },
              );
            }
            if (searchParams.location) {
              qb.andWhere(
                new Brackets((subQb) => {
                  subQb.orWhere(
                    'candidate_profile.country ILIKE :country AND user_entity.id IS NOT NULL',
                    {
                      country: `%${searchParams.location}%`,
                    },
                  );
                  subQb.orWhere(
                    'candidate_profile.city ILIKE :city AND user_entity.id IS NOT NULL',
                    {
                      city: `%${searchParams.location}%`,
                    },
                  );
                }),
              );
            }
            if (searchParams.categories && searchParams.categories.length > 0) {
              qb.andWhere(
                'candidate_job_preference.categories && :categories',
                {
                  categories: searchParams.categories,
                },
              );
            }

            if (searchParams.jobTypes && searchParams.jobTypes.length > 0) {
              qb.andWhere('candidate_job_preference.jobTypes && :jobTypes', {
                jobTypes: searchParams.jobTypes,
              });
            }

            if (searchParams.languages && searchParams.languages.length > 0) {
              qb.andWhere('candidate_about.languages && :languages', {
                languages: searchParams.languages,
              });
            }
            if (searchParams.salary && searchParams.salary.length > 0) {
              qb.andWhere(
                'candidate_job_preference.desiredSalary IN(:...salary)',
                {
                  salary: searchParams.salary,
                },
              );
            }
          }),
        );
      }

      const [data, total] = await queryBuilder
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

  async candidateDetailForAdmin(candidateId: number, applicationId?: number) {
    try {
      const isCandidate = await this.candidateRepository.findOne({
        where: { id: candidateId },

        relations: ['user'],
      });
      if (isCandidate && isCandidate.user) {
        const candidateDetail = await this.userRepository.findOne({
          where: {
            id: isCandidate.user.id,
            applications: { id: applicationId },
          },
          relations: [
            'candidateProfile',
            'jobPreference',
            'aboutCandidate',
            'applications',
          ],
        });
        return { data: candidateDetail };
      }

      GqlNotFoundException(ERROR_MSG.CANDIDATE_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async removeCandidateService(candidateId: number) {
    try {
      const isCandidate = await this.candidateRepository.findOne({
        where: { id: candidateId },
        relations: ['user'],
      });
      if (isCandidate) {
        await this.userRepository.update(isCandidate.user.id, {
          deletedAt: new Date(),
        });
        return { message: SUCCESS_MSG.CANDIDATE_REMOVE };
      }
    } catch (error) {
      getError(error);
    }
  }

  async removeClientService(clientId: number) {
    try {
      const isClient = await this.employerRepository.findOne({
        where: { id: clientId },
        relations: ['user'],
      });
      const isProspectClient = await this.prospectRepository.findOne({
        where: { user: { id: isClient.user.id } },
        relations: ['user'],
      });
      if (isClient) {
        await this.employerRepository.update(clientId, {
          deletedAt: new Date(),
        });
        await this.userRepository.update(isClient.user.id, {
          deletedAt: new Date(),
        });
      }
      if (isProspectClient) {
        await this.prospectRepository.update(isProspectClient.id, {
          status: 3,
        });
        await this.prospectTimelineRepository.save({
          prospectClientId: isProspectClient.id,
          timelineDescription: TIMELINE_MSG.CLOSE_CLIENT,
        });
      }
      return { message: SUCCESS_MSG.CLIENT_REMOVE };
    } catch (error) {
      getError(error);
    }
  }

  async futureProspectsCvService(profileId: number) {
    try {
      const isProfile = await this.candidateRepository.findOne({
        where: { id: profileId },
        relations: ['user'],
      });
      if (isProfile) {
        const user = await this.userRepository.findOne({
          where: { id: isProfile?.user?.id },
          relations: ['aboutCandidate', 'candidateProfile'],
        });
        return {
          data: user,
        };
      }
      GqlNotFoundException(ERROR_MSG.CANDIDATE_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async UpdateSkillsService(updateSkillsDto: CandidateUpdateSkillsDTO) {
    try {
      const isCandidateUpdated = await this.aboutCandidateRepository.update(
        updateSkillsDto.id,
        { skills: updateSkillsDto.skills },
      );

      if (isCandidateUpdated?.affected > 0) {
        this.addSkillsService({ skills: updateSkillsDto.skills });
        return { message: SUCCESS_MSG.CANDIDATE_UPDATED };
      }
      GqlNotFoundException(ERROR_MSG.CANDIDATE_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }
  uploadFileInRootDir = async (file: FileUpload) => {
    const fileBuffer = await fileUpload(file);
    const dirPath = join(__dirname, '../../../public/files');

    writeFile(dirPath, file, fileBuffer);
  };

  async updateCandidateProfileService(
    userInfoArgs: UpdateUserBasicSignupDto,
    profileArgs: UpdateCandidateProfileDto,
    aboutArgs: UpdateAboutCandidateDto,
    jobPreferenceArgs: UpdateCandidateJobPreferenceDto,
    file: FileUpload,
    userId: number,
  ) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['candidateProfile', 'aboutCandidate', 'jobPreference'],
      });
      if (isUser) {
        file && this.uploadFileInRootDir(file);
        await this.userRepository.update(userId, userInfoArgs);
        await this.candidateRepository.update(
          isUser.candidateProfile.id,
          profileArgs,
        );
        await this.aboutCandidateRepository.update(isUser.aboutCandidate.id, {
          ...aboutArgs,
          cv: file && file.filename ? file.filename : null,
        });
        await this.candidateJobPreferenceRepository.update(
          isUser.jobPreference.id,
          jobPreferenceArgs,
        );

        return { message: SUCCESS_MSG.PROFILE_UPDATED };
      }
      throw GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
    } catch (err) {
      throw getError(err);
    }
  }

  async addNoteService({ addNotesDto, adminId }) {
    try {
      const isCandidate = await this.candidateRepository.findOne({
        where: { id: addNotesDto.id },
        relations: ['user'],
      });
      const isAdmin = await this.userRepository.findOne({
        where: { id: adminId },
      });
      if (isCandidate && isCandidate.user && isAdmin) {
        await this.candidateNoteRepository.save({
          description: addNotesDto.description,
          candidate: isCandidate,
          user: isAdmin,
        });
        return { message: SUCCESS_MSG.NOTES_ADD };
      }
      GqlNotFoundException(ERROR_MSG.SOMETHING_WRONG);
    } catch (error) {
      getError(error);
    }
  }
  async updateNoteService(updateNotesDto: UpdateNotesDTO) {
    try {
      const isNotes = await this.candidateNoteRepository.findOne({
        where: { id: updateNotesDto.notesId },
      });
      if (isNotes) {
        await this.candidateNoteRepository.update(isNotes.id, {
          description: updateNotesDto.description,
        });
        return { message: SUCCESS_MSG.NOTES_UPDATE };
      }
      GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async removeNotesService(notesId: number) {
    try {
      const isNotes = await this.candidateNoteRepository.findOne({
        where: { id: notesId },
      });
      if (isNotes) {
        await this.candidateNoteRepository.update(notesId, {
          deletedAt: new Date(),
        });
        return { message: SUCCESS_MSG.NOTES_REMOVE };
      }
      GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async adminNotesForCandidateService({ candidateId, adminId }) {
    try {
      const notes = await this.candidateNoteRepository.find({
        where: { candidate: { id: candidateId }, user: { id: adminId } },
      });
      if (notes) {
        return { data: notes };
      }
      GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }
  async getNotesByIdService(notesId: number) {
    try {
      const notes = await this.candidateNoteRepository.findOne({
        where: { id: notesId },
      });
      if (!notes) {
        GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
      }
      return { data: notes };
    } catch (error) {
      getError(error);
    }
  }
  async addNotesForEmployerService({ addNotesDto, adminId }) {
    try {
      const isEmployer = await this.employerRepository.findOne({
        where: { id: addNotesDto.id },
        relations: ['user'],
      });
      const isAdmin = await this.userRepository.findOne({
        where: { id: adminId },
      });
      if (!isEmployer && !isEmployer.user && !isAdmin) {
        GqlNotFoundException(ERROR_MSG.SOMETHING_WRONG);
      }
      await this.employerNotesRepository.save({
        employer: isEmployer,
        user: isAdmin,
        description: addNotesDto.description,
      });
      return { message: SUCCESS_MSG.NOTES_ADD };
    } catch (error) {
      getError(error);
    }
  }
  async updateEmployerNotesService(updateNotesDto: UpdateNotesDTO) {
    try {
      const isNotes = await this.employerNotesRepository.findOne({
        where: { id: updateNotesDto.notesId },
      });
      if (!isNotes) {
        GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
      }
      await this.employerNotesRepository.update(isNotes.id, {
        description: updateNotesDto.description,
      });
      return { message: SUCCESS_MSG.NOTES_UPDATE };
    } catch (error) {
      getError(error);
    }
  }
  async removeEmployerNotesService(notesId: number) {
    try {
      const isNotes = await this.employerNotesRepository.findOne({
        where: { id: notesId },
      });
      if (!isNotes) {
        GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
      }
      await this.employerNotesRepository.update(notesId, {
        deletedAt: new Date(),
      });
      return { message: SUCCESS_MSG.NOTES_REMOVE };
    } catch (error) {
      getError(error);
    }
  }
  async adminNotesForEmployerService({ employerId, adminId }) {
    try {
      const notes = await this.employerNotesRepository.find({
        where: { employer: { id: employerId }, user: { id: adminId } },
      });
      if (!notes) {
        GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
      }
      return { data: notes };
    } catch (error) {
      getError(error);
    }
  }
  async adminNotesByIdForEmployerService(notesId: number) {
    try {
      const notes = await this.employerNotesRepository.findOne({
        where: { id: notesId },
      });
      if (!notes) {
        GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
      }
      return { data: notes };
    } catch (error) {
      getError(error);
    }
  }
  async getSkillService(searchSkill: string) {
    try {
      const skills = await this.skillsRepository.find({
        where: { skill: ILike(`%${searchSkill}%`) },
      });
      if (skills) {
        return { data: skills };
      } else {
        return { data: [] };
      }
    } catch (error) {
      getError(error);
    }
  }
  async addSkillsService(skills: SkillDTO) {
    try {
      const existsSkills = await this.skillsRepository.find({
        where: skills.skills.map((skill) => ({ skill: ILike(`%${skill}%`) })),
      });

      const existingSkillSet = new Set(
        existsSkills.map((skill) => skill.skill.toLowerCase()),
      );

      const newSkills = skills.skills.filter(
        (skill) => !existingSkillSet.has(skill.toLowerCase()),
      );

      if (newSkills.length > 0) {
        const newSkillEntities = newSkills.map((skill) =>
          this.skillsRepository.create({ skill: skill }),
        );
        await this.skillsRepository.save(newSkillEntities);
      }
      return { message: SUCCESS_MSG.SKILLS_ADDED };
    } catch (error) {
      getError(error);
    }
  }
  async inviteCandidates(candidates: InviteCandidatesDTO) {
    try {
      const htmlContent = marked(
        candidates.inviteMessage.replace(/\{[^}]*\}/g, ''),
      );
      const sendInvitations = async () => {
        const details = await this.vacancyRepository.findOne({
          where: { id: candidates.id },
          relations: ['employer', 'campaigns'],
        });
        await Promise.all(
          candidates.candidates.map(async (email) => {
            try {
              const userDetails = await this.userRepository.findOne({
                where: { email: email },
              });
              if (userDetails) {
                await this.mailerService.sendMail({
                  to: email,
                  from: process.env.MAIL_FROM_USER,
                  subject: details.position,
                  template: 'inviteCandidates',
                  context: {
                    name: userDetails.firstName + userDetails.lastName,
                    vacancy: details.position,
                    id: candidates.id,
                    inviteMessage: htmlContent,
                  },
                });
              }
            } catch (error) {
              getError(error);
            }
          }),
        );
      };
      await sendInvitations();
      return { message: SUCCESS_MSG.INVITE_CANDIDATES };
    } catch (error) {
      getError(error);
    }
  }

  async pdfToMarkDownService(fileName: string) {
    try {
      if (fileName) {
        const url = getFileUrl(fileName);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const data = await pdfParse(buffer);
        const pdfText = data.text;
        function convertToMarkdown(cvText) {
          const lines = cvText.split('\n');
          let markdownContent = '';

          const unOrderedListSymbols = ['•', '➢', '○', '▪'];
          const symbolPattern = new RegExp(
            `^[${unOrderedListSymbols
              .map((symbol) => '\\' + symbol)
              .join('')}]`,
          );

          const strongContent = [
            'Date of Birth',
            'Postcode',
            'Address',
            'City',
            'Email',
            'E-mail',
            'Phone number',
            "Driver's license",
            'Location',
          ];
          const regexHeadingContent =
            /^\s*(Contact|Work Experience|(Work|Employment) History|(Key )*Skill|Professional Detail|Personal (Detail|Summary|Information|Profile)|Profile|Education|Reference|Achievement|Project|(Other )*Interest)s*\s*$/gi;
          const regexStrongContent = new RegExp(strongContent.join('|'), 'gi');

          lines.forEach((line) => {
            if (symbolPattern.test(line.trim())) {
              markdownContent += `- ${line.trim().substring(1)}\n`;
            } else if (regexHeadingContent.test(line)) {
              const heading = line.trim();
              markdownContent += `## ${heading}\n\n`;
            } else if (regexStrongContent.test(line.trim())) {
              const replacedText = line.replace(
                regexStrongContent,
                '**$&**\n\n',
              );
              markdownContent += replacedText;
            } else if (line.includes(':')) {
              markdownContent += `### ${line.trim()}\n`;
            } else {
              markdownContent += `${line}\n`;
            }
          });
          return markdownContent;
        }
        const markdownCV = convertToMarkdown(pdfText);
        return { pdfText: markdownCV };
      } else {
        return { pdfText: null };
      }
    } catch (error) {
      throw new Error('Failed to fetch PDF');
    }
  }

  async newProspectClientService(prospectData: NewProspectDto) {
    try {
      const clientDetails = await this.prospectRepository.save(prospectData);
      await this.prospectAddressRepository.save(prospectData.address);
      await this.prospectPeopleRepository.save(prospectData.people);
      await this.prospectTimelineRepository.save({
        prospectClientId: clientDetails.id,
        timelineDescription: TIMELINE_MSG.SET_PROSPECTS,
      });
      return { message: SUCCESS_MSG.PROSPECT_CLIENT_ADDED };
    } catch (error) {
      getError(error);
    }
  }

  async getProspectClientsService(searchParams: SearchProspectsClientsDto) {
    try {
      const { current, pageSize } = searchParams;
      const skip = (current - 1) * pageSize;
      const sortBy = searchParams.sortBy?.split(' ');
      const sortingType: string = sortBy[1];
      const sortingKey = sortBy[0];
      const queryBuilder = this.prospectRepository
        .createQueryBuilder('prospect_clients')
        .leftJoinAndMapMany(
          'prospect_clients.people',
          'prospect_people',
          'prospect_people',
          'prospect_clients.id=prospect_people.prospectClientId',
        )
        .leftJoinAndMapMany(
          'prospect_clients.address',
          'prospect_address',
          'prospect_address',
          'prospect_clients.id=prospect_address.prospectClientId',
        );

      if (searchParams.sortBy) {
        queryBuilder.orderBy(
          `prospect_clients.${sortingKey}`,
          sortingType as 'ASC' | 'DESC',
        );
      }
      if (searchParams.status) {
        queryBuilder.andWhere('prospect_clients.status = :status', {
          status: searchParams.status,
        });
      }
      if (searchParams.query) {
        queryBuilder.where(
          new Brackets((qb) => {
            if (searchParams.query) {
              qb.andWhere(
                new Brackets((subQb) => {
                  subQb.orWhere('prospect_clients.companyName ILIKE :query', {
                    query: `%${searchParams.query}%`,
                  });
                  subQb.orWhere(
                    'prospect_clients.personAssigned ILIKE :query',
                    {
                      query: `%${searchParams.query}%`,
                    },
                  );
                }),
              );
            }
          }),
        );
      }

      const [data, total] = await queryBuilder
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

  async prospectClientDetails(prospectClientId: number) {
    try {
      const isClient = await this.prospectRepository.findOne({
        where: { id: prospectClientId },
        relations: ['people', 'address', 'user'],
      });
      if (!isClient) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      return { data: isClient };
    } catch (error) {
      getError(error);
    }
  }

  async updateProspectClient(
    prospectClientId: number,
    clientData: UpdateProspectClientDTO,
  ) {
    try {
      const isClient = await this.prospectRepository.findOne({
        where: { id: prospectClientId },
        relations: ['user'],
      });
      if (!isClient) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      await this.prospectRepository.update(prospectClientId, clientData);
      const updated = await this.prospectRepository.findOne({
        where: {
          id: prospectClientId,
        },
      });
      const changedKeys: string[] = Object.keys(clientData).filter(
        (key) => isClient[key] !== updated[key],
      );
      const isDateChanged =
        moment(isClient.reminderDate).format('MM/DD/YYYY h:mm:ss') !==
        moment(updated.reminderDate).format('MM/DD/YYYY h:mm:ss');
      let newChangedKeys: string[] = changedKeys;
      if (!isDateChanged) {
        newChangedKeys = changedKeys.filter((item) => item !== 'reminderDate');
      }
      if (newChangedKeys.length > 0) {
        const timelineDescription = `${mapCamelKeysToPascalValues(
          newChangedKeys,
        ).join(', ')} Updated`;

        await this.prospectTimelineRepository.save({
          prospectClientId,
          timelineDescription,
        });
      }
      if (isClient.user) {
        const isEmployer = await this.employerRepository.findOne({
          where: { user: { id: isClient.user.id } },
        });
        await this.employerRepository.update(isEmployer.id, {
          companyName: clientData.companyName,
          description: clientData.description,
        });
      }

      return { message: SUCCESS_MSG.USER_UPDATED };
    } catch (error) {
      getError(error);
    }
  }

  async updateProspectPeople(
    prospectClientId: number,
    peopleId: number,
    peopleData: ProspectPeopleDTO,
  ) {
    try {
      const isClient = await this.prospectPeopleRepository.findOne({
        where: { id: peopleId, prospectClient: { id: prospectClientId } },
      });
      if (!isClient) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      await this.prospectPeopleRepository.update(peopleId, peopleData);
      const updated = await this.prospectPeopleRepository.findOne({
        where: { id: peopleId, prospectClient: { id: prospectClientId } },
      });
      const changedKeys: string[] = Object.keys(peopleData).filter(
        (key) => isClient[key] !== updated[key],
      );
      if (changedKeys.length > 0) {
        const timelineDescription = `${mapCamelKeysToPascalValues(
          changedKeys,
        ).join(', ')} Updated`;

        await this.prospectTimelineRepository.save({
          prospectClientId,
          timelineDescription,
        });
      }

      return { message: SUCCESS_MSG.USER_UPDATED };
    } catch (error) {
      getError(error);
    }
  }

  async updateProspectAddress(
    prospectClientId: number,
    addressId: number,
    addressData: ProspectAddressDTO,
  ) {
    try {
      const isClient = await this.prospectAddressRepository.findOne({
        where: { id: addressId },
      });
      if (!isClient) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      await this.prospectAddressRepository.update(addressId, addressData);
      const updated = await this.prospectAddressRepository.findOne({
        where: { id: addressId, prospectClient: { id: prospectClientId } },
      });
      const changedKeys: string[] = Object.keys(addressData).filter(
        (key) => isClient[key] !== updated[key],
      );
      if (changedKeys.length > 0) {
        const timelineDescription = `${mapCamelKeysToPascalValues(
          changedKeys,
        ).join(', ')} Updated`;

        await this.prospectTimelineRepository.save({
          prospectClientId,
          timelineDescription,
        });
      }

      return { message: SUCCESS_MSG.ADDRESS_UPDATED };
    } catch (error) {
      getError(error);
    }
  }

  async prospectTimeline(prospectClientId: number) {
    try {
      const timelineData = await this.prospectTimelineRepository.find({
        where: { prospectClientId },
        order: { createdAt: 'DESC' },
      });
      if (!timelineData) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      return { data: timelineData };
    } catch (error) {
      getError(error);
    }
  }

  async removeProspectPeopleService(peopleId: number) {
    try {
      const isPerson = await this.prospectPeopleRepository.findOne({
        where: { id: peopleId },
        relations: ['prospectClient'],
      });
      if (isPerson) {
        await this.prospectPeopleRepository.update(peopleId, {
          deletedAt: new Date(),
        });
        await this.prospectTimelineRepository.save({
          prospectClientId: isPerson.prospectClient.id,
          timelineDescription: 'Person Information Deleted',
        });
        return { message: SUCCESS_MSG.PROSPECT_PEOPLE_REMOVE };
      }
      GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async removeProspectAddressService(addressId: number) {
    try {
      const isPerson = await this.prospectAddressRepository.findOne({
        where: { id: addressId },
        relations: ['prospectClient'],
      });
      if (isPerson) {
        await this.prospectAddressRepository.update(addressId, {
          deletedAt: new Date(),
        });
        await this.prospectTimelineRepository.save({
          prospectClientId: isPerson.prospectClient.id,
          timelineDescription: 'Address Deleted',
        });
        return { message: SUCCESS_MSG.PROSPECT_ADDRESS_REMOVE };
      }
      GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async newProspectPeopleService(
    prospectClientId: number,
    peopleData: ProspectPeopleDTO,
  ) {
    try {
      await this.prospectPeopleRepository.save({
        ...peopleData,
        prospectClient: { id: prospectClientId },
      });
      await this.prospectTimelineRepository.save({
        prospectClientId,
        timelineDescription: TIMELINE_MSG.NEW_PERSON,
      });
      return { message: SUCCESS_MSG.PROSPECT_PEOPLE_ADD };
    } catch (error) {
      getError(error);
    }
  }

  async newProspectAddressService(
    prospectClientId: number,
    addressData: ProspectAddressDTO,
  ) {
    try {
      await this.prospectAddressRepository.save({
        ...addressData,
        prospectClient: { id: prospectClientId },
      });
      await this.prospectTimelineRepository.save({
        prospectClientId,
        timelineDescription: TIMELINE_MSG.NEW_ADDRESS,
      });
      return { message: SUCCESS_MSG.PROSPECT_ADDRESS_ADD };
    } catch (error) {
      getError(error);
    }
  }

  async convertToClient(
    prospectClientId: number,
    personId: number,
    addressId: number,
    clientData: EmployerProfileEditDto,
  ) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { email: clientData.email },
      });
      if (isUser) {
        GqlBadRequestErrorException(ERROR_MSG.ALREADY_REGISTER);
      }
      const newUser = await this.userRepository.save({
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        email: clientData.email,
        phoneNumber: clientData.phoneNumber,
        role: 2,
      });
      await this.employerRepository.save({
        ...clientData,
        user: newUser,
      });
      await this.prospectRepository.update(prospectClientId, {
        status: 2,
        user: newUser,
      });
      await this.prospectPeopleRepository.update(personId, {
        converted: true,
      });
      await this.prospectAddressRepository.update(addressId, {
        converted: true,
      });
      await this.prospectTimelineRepository.save({
        prospectClientId,
        timelineDescription: 'Converted to Client',
      });
      return { message: SUCCESS_MSG.CONVERT_TO_CLIENT };
    } catch (error) {
      getError(error);
    }
  }

  async closeClientService(prospectClientId: number, emails: CloseClientDTO) {
    try {
      const isClient = await this.prospectRepository.findOne({
        where: { id: prospectClientId },
      });
      if (!isClient) {
        GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      await this.prospectRepository.update(prospectClientId, { status: 3 });
      await Promise.all(
        emails.emails.map(async (email) => {
          try {
            const userDetails = await this.userRepository.findOne({
              where: { email: email },
              relations: ['employerUser'],
            });
            if (userDetails) {
              await this.employerRepository.update(
                userDetails.employerUser.id,
                {
                  deletedAt: new Date(),
                },
              );
            }
          } catch (error) {
            getError(error);
          }
        }),
      );
      await this.prospectTimelineRepository.save({
        prospectClientId,
        timelineDescription: TIMELINE_MSG.CLOSE_CLIENT,
      });
      return { message: SUCCESS_MSG.CLOSED_CLIENT };
    } catch (error) {
      getError(error);
    }
  }

  async updateConvertedClient(updateData: UpdateConvertedClientDTO) {
    try {
      const {
        userId,
        peopleId,
        addressId,
        firstName,
        lastName,
        email,
        phoneNumber,
        initialPeopleId,
        initialAddressId,
        prospectClientId,
        ...rest
      } = updateData;
      const isUser = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!isUser) {
        GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
      }
      await this.userRepository.update(userId, {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      const isEmployer = await this.employerRepository.findOne({
        where: { user: { id: userId } },
      });
      await this.employerRepository.update(isEmployer.id, {
        ...rest,
      });

      if (Number(initialPeopleId) !== Number(peopleId)) {
        await this.prospectPeopleRepository.update(initialPeopleId, {
          converted: null,
        });
      }
      await this.prospectPeopleRepository.update(peopleId, {
        converted: true,
      });

      if (Number(initialAddressId) !== Number(addressId)) {
        await this.prospectAddressRepository.update(initialAddressId, {
          converted: null,
        });
      }
      await this.prospectAddressRepository.update(addressId, {
        converted: true,
      });
      await this.prospectTimelineRepository.save({
        prospectClientId: prospectClientId,
        timelineDescription: 'Updated Contact Details',
      });
      return { message: SUCCESS_MSG.CONVERT_TO_CLIENT_UPDATE };
    } catch (error) {
      getError(error);
    }
  }
}
