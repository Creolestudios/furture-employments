import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import {
  ForgetPasswordDTO,
  ResetPasswordDTO,
  SignInDTO,
} from '../../dto/auth/auth.dto';
import { UserEntity } from '../../entity/user/user.entity';
import { EMAIL_MSG, ERROR_MSG, SUCCESS_MSG } from '../../utils/constants';
import {
  GqlBadRequestErrorException,
  GqlNotFoundException,
  getError,
} from '../../utils/errors/errors';
import { tokenGenerator } from '../../utils/helper';
import { LinkedInStrategy } from './linkedin.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private readonly linkedInStrategy: LinkedInStrategy,
  ) {}

  async generateJWTToken(user) {
    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(jwtPayload);
  }

  async signInService(signInDto: SignInDTO) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { email: signInDto.email },
      });
      if (!isUser) {
        GqlBadRequestErrorException(ERROR_MSG.NOT_REGISTERED_EMAIL);
      }
      if (isUser.deletedAt) {
        GqlBadRequestErrorException(ERROR_MSG.USER_DELETED);
      }

      const matchPassword = await bcrypt.compare(
        signInDto.password,
        isUser.password,
      );

      if (!matchPassword) {
        GqlBadRequestErrorException(ERROR_MSG.INVALID_EMAIL_OR_PASSWORD);
      }

      const token = await this.generateJWTToken(isUser);
      return {
        id: isUser.id,
        token: token,
        role: isUser.role,
      };
    } catch (error) {
      getError(error);
    }
  }

  async findUser(signInDtO: any) {
    try {
      if (signInDtO) {
        return await this.userRepository.findOne({
          where: { email: signInDtO.email },
        });
      }
      return await this.userRepository.findOne({
        where: { email: signInDtO.email },
      });
    } catch (error) {
      getError(error);
    }
  }
  // forget password
  async forgetPasswordService(forgetPasswordDto: ForgetPasswordDTO) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { email: forgetPasswordDto.email },
      });
      if (!isUser) {
        GqlNotFoundException(ERROR_MSG.NOT_REGISTERED_EMAIL);
      }

      const resetToken = tokenGenerator();

      // update reset password token
      await this.userRepository.update(isUser.id, { token: resetToken });

      //send mail
      this.mailerService.sendMail({
        to: isUser.email,
        from: process.env.MAIL_FROM_USER,
        subject: EMAIL_MSG.FORGET_EMAIL_SUBJECT,
        template: 'forgetPassword',
        context: {
          name: isUser.firstName + ' ' + isUser.lastName,
          link:
            'http://' +
            process.env.FRONTEND_HOST +
            `/reset-password?token=${resetToken}`,
        },
      });

      return { message: EMAIL_MSG.EMAIL_SEND_SUCCESS };
    } catch (error) {
      getError(error);
    }
  }

  // reset password
  async resetPasswordService(resetPasswordDto: ResetPasswordDTO) {
    try {
      const isUser = await this.userRepository.findOne({
        where: { token: resetPasswordDto.token },
      });
      if (!isUser) {
        GqlBadRequestErrorException(ERROR_MSG.INVALID_TOKEN);
      }
      if (
        isUser.token &&
        moment() >
          moment(isUser.updatedAt).add(
            process.env.RESET_PASSWORD_EXPIRY,
            'minutes',
          )
      ) {
        GqlBadRequestErrorException(ERROR_MSG.EXPIRED_TOKEN);
      }

      // hash password
      const hashPassword = await bcrypt.hash(resetPasswordDto.password, 10);

      // update password in user
      await this.userRepository.update(isUser.id, {
        password: hashPassword,
      });

      return { message: SUCCESS_MSG.RESET_PASSWORD_SUCCESS };
    } catch (error) {
      getError(error);
    }
  }

  async loginLinkedin(code: string, role: number) {
    try {
      const user = await this.linkedInStrategy.handleCallback(code);

      if (user.hasOwnProperty('status')) {
        GqlBadRequestErrorException(ERROR_MSG.SOME_ERROR);
      } else {
        const isUser = await this.userRepository.findOne({
          where: { email: user?.email },
        });

        if (isUser) {
          if (
            isUser.role === role ||
            (role === 6 && isUser.role === 2) ||
            (role === 5 && isUser.role === 1)
          ) {
            await this.userRepository.update(isUser.id, {
              firstName: user.given_name,
              lastName: user.family_name,
              email: user.email,
              role: role,
              loginType: 2,
              profileImage: user.picture,
            });

            const token = await this.generateJWTToken(isUser);
            return {
              id: isUser.id,
              token: token,
              role: isUser.role,
            };
          } else {
            GqlBadRequestErrorException(ERROR_MSG.EMAIL_WITH_DIFFERENT_ROLE);
          }
        } else {
          const newUser: UserEntity = await this.userRepository.save({
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            role: role,
            loginType: 2,
            profileImage: user.picture,
          });

          const token = await this.generateJWTToken(newUser);
          return {
            id: newUser.id,
            token: token,
            role: newUser.role,
          };
        }
      }
    } catch (error) {
      getError(error);
    }
  }

  // REVIEW check spelling
  //NOTE - resolved
  async generateAuthUrl(role: number): Promise<string> {
    try {
      const state = Math.random().toString(36).substring(7);
      const authUrl = await this.linkedInStrategy.generateAuthUrl(
        JSON.stringify({ state, role: role }),
      );
      return authUrl;
    } catch (error) {
      getError(error);
    }
  }
}
