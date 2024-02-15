import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserBasicSignupDTO } from '../../dto/user/userRegister.dto';
import { UserEntity } from '../../entity/user/user.entity';
import { CountryEntity } from '../../entity/lists/country.entity';
import { JobTypeEntity } from '../../entity/lists/jobType.entity';
import { JobCatEntity } from '../../entity/lists/jobCat.entity';
import { LanguageEntity } from '../../entity/lists/language.entity';
import { ERROR_MSG, SUCCESS_MSG } from '../../utils/constants';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { config } from 'dotenv';

config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(CountryEntity)
    private CountryRepository: Repository<CountryEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    @InjectRepository(JobTypeEntity)
    private jobTypeRepository: Repository<JobTypeEntity>,
    @InjectRepository(JobCatEntity)
    private jobCatRepository: Repository<JobCatEntity>,
    private jwtService: JwtService,
  ) {}

  async generateJWTToken(user) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(jwtPayload);
  }

  //ANCHOR - Create new user service(basic signup)
  async createUserService(userRegisterDto: UserBasicSignupDTO) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { email: userRegisterDto.email },
      });
      if (isUser && !isUser.deletedAt) {
        GqlBadRequestErrorException(ERROR_MSG.ALREADY_REGISTER);
      }

      const hashPassword = await bcrypt.hash(userRegisterDto.password, 10);

      const newUser = await this.userRepository.save({
        ...userRegisterDto,
        password: hashPassword,
      });

      const token = await this.generateJWTToken(newUser);

      return {
        message: SUCCESS_MSG.USER_CREATED,
        token: token,
      };
    } catch (error) {
      getError(error);
    }
  }

  async getUserDetailService(userId: number) {
    try {
      // REVIEW need to use notFoundException
      return (
        (await this.userRepository.findOne({
          where: { id: userId },
        })) ?? GqlNotFoundException(ERROR_MSG.NOT_FOUND)
      );
    } catch (error) {
      getError(error);
    }
  }
  async getListView() {
    try {
      const country = await this.CountryRepository.find({
        relations: ['cities'],
      });
      const language = await this.languageRepository.find();
      const JobType = await this.jobTypeRepository.find();
      const jobCat = await this.jobCatRepository.find();
      return { country, language, jobCat, JobType };
    } catch (error) {
      getError(error);
    }
  }
}
