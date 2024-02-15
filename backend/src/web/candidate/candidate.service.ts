import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { UserEntity } from '../../entity/user/user.entity';
import { Repository } from 'typeorm';
import { DATE_FORMAT, ERROR_MSG, SUCCESS_MSG } from '../../utils/constants';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { AboutCandidateEntity } from '../../entity/candidate/registration/about.entity';
import { CandidateJobPreferenceEntity } from '../../entity/candidate/registration/jobPreference.entity';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import {
  AboutCandidateDTO,
  UpdateAboutCandidateDto,
} from '../../dto/candidate/registration/about.dto';
import {
  CandidateJobPreferenceDto,
  UpdateCandidateJobPreferenceDto,
} from '../../dto/candidate/registration/job-preference.dto';
import {
  CandidateProfileDTO,
  UpdateCandidateProfileDto,
} from '../../dto/candidate/registration/profile.dto';
import { CandidateUser } from '../../dto/candidate/registration/user.dto';
import { fileUpload, writeFile } from '../../utils/upload';
import { join } from 'path';
import { UpdateUserBasicSignupDto } from '../../dto/user/updateUser.dto';
import { Role } from '../../utils/enum';
import { JwtService } from '@nestjs/jwt';
import { convertDateInGivenFormat } from '../../utils';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';
import { CandidateNoteEntity } from '../../entity/admin/candidateNote.entity';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CandidateProfileEntity)
    private candidateProfileRepository: Repository<CandidateProfileEntity>,
    @InjectRepository(AboutCandidateEntity)
    private aboutCandidateRepository: Repository<AboutCandidateEntity>,
    @InjectRepository(CandidateJobPreferenceEntity)
    private candidateJobPreferenceRepository: Repository<CandidateJobPreferenceEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepository: Repository<VacancyEntity>,

    @InjectRepository(CandidateNoteEntity)
    private candidateNoteRepository: Repository<CandidateNoteEntity>,
  ) {}

  uploadFileInRootDir = async (file: FileUpload) => {
    const fileBuffer = await fileUpload(file);
    const dirPath = join(__dirname, '../../../public/files');

    writeFile(dirPath, file, fileBuffer);
  };

  getUserArgs = (email: string, userArgs: any) => {
    const { email: _email, ..._userArgs } = userArgs;

    return email === _email ? _userArgs : userArgs;
  };

  //ANCHOR - Create new user service(basic signup)
  async candidateRegisterService(
    userArgs: CandidateUser,
    profileArgs: CandidateProfileDTO,
    aboutArgs: AboutCandidateDTO,
    jobPreferenceArgs: CandidateJobPreferenceDto,
    file: FileUpload,
    userId: number,
  ) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (isUser) {
        file && this.uploadFileInRootDir(file);

        await this.userRepository.update(userId, {
          ...this.getUserArgs(isUser.email, userArgs),
          role: Role.CANDIDATE,
        });
        await this.candidateProfileRepository.save({
          ...profileArgs,
          user: isUser,
        });
        await this.aboutCandidateRepository.save({
          ...aboutArgs,
          user: isUser,
          cv: file && file.filename ? file.filename : null,
        });
        await this.candidateJobPreferenceRepository.save({
          ...jobPreferenceArgs,
          user: isUser,
        });

        // REVIEW remove unused await
        //NOTE - resolved
        const token = this.jwtService.sign(
          {
            id: userId,
            email: userArgs.email,
            role: Role.CANDIDATE,
          },
          { secret: process.env.JWT_SECRET },
        );

        return {
          message: SUCCESS_MSG.REGISTER_CANDIDATE,
          role: Role.CANDIDATE,
          token: token,
        };
      }
      throw GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
    } catch (err) {
      throw getError(err);
    }
  }

  async updateCandidateProfileService(
    userInfoArgs: UpdateUserBasicSignupDto,
    profileArgs: UpdateCandidateProfileDto,
    aboutArgs: UpdateAboutCandidateDto,
    userId: number,
  ) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['candidateProfile', 'aboutCandidate'],
      });
      if (isUser) {
        await this.userRepository.update(userId, userInfoArgs);
        await this.candidateProfileRepository.update(
          isUser.candidateProfile.id,
          profileArgs,
        );
        await this.aboutCandidateRepository.update(
          isUser.aboutCandidate.id,
          aboutArgs,
        );

        return { message: SUCCESS_MSG.PROFILE_UPDATED };
      }
      throw GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
    } catch (err) {
      throw getError(err);
    }
  }

  async updateCV(userId: number, file: FileUpload) {
    try {
      const isCandidateExist = await this.aboutCandidateRepository.findOne({
        where: { user: { id: userId } },
      });

      if (!isCandidateExist) {
        throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      this.uploadFileInRootDir(file);

      await this.aboutCandidateRepository.save({
        ...isCandidateExist,
        cv: file.filename,
      });

      return { message: SUCCESS_MSG.PROFILE_UPDATED };
    } catch (err) {
      throw getError(err);
    }
  }

  async updateJobPreferences(
    jobPreferenceId: number,
    jobPreferenceArgs: UpdateCandidateJobPreferenceDto,
  ) {
    try {
      const isCandidateJobPreferenceExist =
        await this.candidateJobPreferenceRepository.findOne({
          where: { id: jobPreferenceId },
        });
      if (!isCandidateJobPreferenceExist) {
        throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      await this.candidateJobPreferenceRepository.update(
        jobPreferenceId,
        jobPreferenceArgs,
      );
      return { message: SUCCESS_MSG.PREFERENCES_UPDATED };
    } catch (err) {
      throw getError(err);
    }
  }

  async candidateApplicationDetailsService(application_id: any) {
    try {
      const isCandidateExist = await this.aboutCandidateRepository.findOne({
        where: { user: application_id },
      });
      if (!isCandidateExist) {
        throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      const { cv, updatedAt } = isCandidateExist;
      return { fileName: cv, updatedAt: updatedAt };
    } catch (err) {
      throw getError(err);
    }
  }

  async findCandidateProfile(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['candidateProfile', 'aboutCandidate'],
      });

      if (!user) {
        GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
      }
      return user;
    } catch (err) {
      throw getError(err);
    }
  }

  async findJobPreference(userId: number) {
    try {
      const jobPreference = this.candidateJobPreferenceRepository.findOne({
        where: { user: { id: userId } },
      });

      if (!jobPreference) {
        GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
      }

      return jobPreference;
    } catch (err) {
      throw getError(err);
    }
  }

  async findCVDetails(userId: number) {
    try {
      const isAboutCandidate = await this.aboutCandidateRepository.findOne({
        where: { user: { id: userId } },
      });

      if (!isAboutCandidate) {
        throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      const { cv, updatedAt } = isAboutCandidate;

      return {
        fileName: cv,
        updatedAt: convertDateInGivenFormat(updatedAt, DATE_FORMAT.DD_MM_YYYY),
        id: userId,
      };
    } catch (err) {
      throw getError(err);
    }
  }

  async createApplication(userId: number, vacancyId: number) {
    try {
      const isApplication = await this.applicationRepository.findOne({
        where: { user: { id: userId }, vacancy: { id: vacancyId } },
      });

      if (isApplication) {
        throw GqlBadRequestErrorException(ERROR_MSG.APPLICATION);
      }

      const newApplication = this.applicationRepository.create({
        user: { id: userId },
        vacancy: { id: vacancyId },
      });
      const vacancyApplication =
        await this.applicationRepository.save(newApplication);
      if (vacancyApplication) {
        const vacancy = await this.vacancyRepository.findOne({
          where: { id: vacancyId },
        });
        const count = vacancy.applicationCount + 1;
        await this.vacancyRepository.update(vacancyId, {
          applicationCount: count,
        });
      }
      return {
        message: SUCCESS_MSG.APPLICATION_CREATED,
        id: vacancyApplication.id,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async updateCandidateFutureProspectsCvService(
    aboutId: number,
    futureProspectsCv: string,
  ) {
    try {
      const isApplicationUpdated = await this.aboutCandidateRepository.update(
        aboutId,
        {
          futureProspectsCv,
        },
      );
      if (isApplicationUpdated.affected > 0) {
        return { message: SUCCESS_MSG.PROFILE_UPDATED };
      }
      GqlBadRequestErrorException(ERROR_MSG.APPLICATION_NOT_FOUND);
    } catch (err) {
      throw getError(err);
    }
  }
  async candidateNoteService(candidateId: number) {
    try {
      const isNotes = await this.candidateNoteRepository.find({
        where: { candidate: { id: candidateId } },
      });

      if (isNotes) {
        return { data: isNotes };
      }
      GqlNotFoundException(ERROR_MSG.NOTES_NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }
}
