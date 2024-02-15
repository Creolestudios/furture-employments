import {
  EmployerProfileEditDto,
  EmployerRegistrationDTO,
} from './../../dto/employerRegistration/employerRegistration.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MSG, SUCCESS_MSG } from '../../utils/constants';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { Role } from '../../utils/enum';
import { JwtService } from '@nestjs/jwt';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(EmployerEntity)
    private employerRepository: Repository<EmployerEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  //ANCHOR - Create new user service(basic signup)
  async employerRegisterService(
    employerRegistrationDTO: EmployerRegistrationDTO,
  ) {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: { id: employerRegistrationDTO.userId },
      });
      if (isUserExist) {
        const isRegistered = await this.employerRepository.findOne({
          where: { user: { id: employerRegistrationDTO.userId } },
        });
        if (isRegistered) {
          throw GqlBadRequestErrorException(ERROR_MSG.EMPLOYER_REGISTER);
        }
        await this.employerRepository.save({
          ...employerRegistrationDTO,
          user: isUserExist,
        });
        await this.userRepository.save({
          ...isUserExist,
          phoneNumber: employerRegistrationDTO.phoneNumber,
          role: Role.EMPLOYER,
        });
        // REVIEW remove unused await
        const token = await this.jwtService.sign(
          {
            id: employerRegistrationDTO.userId,
            email: isUserExist.email,
            role: Role.EMPLOYER,
          },
          { secret: process.env.JWT_SECRET },
        );
        return { message: SUCCESS_MSG.EMPLOYER_REGISTRATION, token: token };
      }
      throw GqlNotFoundException(ERROR_MSG.NOT_FOUND);
    } catch (error) {
      getError(error);
    }
  }

  async getEmployerService(userId: number) {
    try {
      const isUserExist = await this.employerRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });
      if (!isUserExist) {
        throw new GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      return { data: isUserExist };
    } catch (error) {
      getError(error);
    }
  }
  async getEmployerByIdService(employerId: number) {
    try {
      const isUserExist = await this.employerRepository.findOne({
        where: { id: employerId },
        relations: ['user'],
      });
      if (!isUserExist) {
        throw new GqlNotFoundException(ERROR_MSG.NOT_FOUND);
      }
      return { data: isUserExist };
    } catch (error) {
      getError(error);
    }
  }

  async getApplicationsByEmployerService(
    current: number,
    pageSize: number,
    userId: number,
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
        .leftJoinAndMapOne(
          'candidate_application.aboutCandidate',
          'candidate_about',
          'candidate_about',
          'candidate_about.userId=candidate_application.userId',
        )
        .where('vacancy_entity.userId = :userId', { userId })
        .andWhere('candidate_application.status <> :status', { status: 1 });

      const [data, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .orderBy('candidate_application.createdAt', 'DESC')
        .getManyAndCount();
      const totalPages = Math.ceil(total / pageSize);
      return { data: data, pageNo: current, totalPages: totalPages };
    } catch (error) {
      throw getError(error);
    }
  }

  async updateEmployerProfileService(
    profileData: EmployerProfileEditDto,
    userId: number,
  ) {
    try {
      const isUserExist = await this.employerRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!isUserExist) {
        throw new GqlBadRequestErrorException(ERROR_MSG.NOT_FOUND);
      }
      await this.employerRepository.save({ ...isUserExist, ...profileData });
      await this.userRepository.update(userId, {
        phoneNumber: profileData.phoneNumber,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
      });
      return { message: SUCCESS_MSG.USER_UPDATED };
    } catch (error) {
      getError(error);
    }
  }
}
