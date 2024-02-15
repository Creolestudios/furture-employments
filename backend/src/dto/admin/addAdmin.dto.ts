import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERROR_MSG } from '../../utils/constants';
import { IsMatchingProperty } from '../../utils/helper';

@InputType()
export class AddAdminDTO {
  @Field()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @Field()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @Field()
  @IsString()
  @MinLength(6)
  @IsMatchingProperty('password', { message: ERROR_MSG.PASSWORD_DO_NOT_MATCH })
  @MaxLength(255)
  confirmPassword: string;
}
