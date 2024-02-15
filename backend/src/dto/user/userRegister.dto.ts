import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERROR_MSG } from '../../utils/constants';
import { LoginType, Role } from '../../utils/enum';
import { IsMatchingProperty } from '../../utils/helper';

@InputType()
export class UserBasicSignupDTO {
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

  // REVIEW Ankit use enum in field decorator
  //NOTE - we are implemented in FE as int
  @Field(() => Int)
  @IsEnum(Role, { message: ERROR_MSG.USER_ROLE_NOT_EXCEPT })
  role: Role;

  @Field(() => Int)
  loginType: LoginType;
}

// REVIEW use helper class
//NOTE - resolved: Add common helper class with name UserRegistrationResponse

@ObjectType()
export class UserResponse {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field(() => Int)
  role: number;

  @Field({ nullable: true })
  profileImage: string;

  @Field({ nullable: true })
  disableAdmin: string;
}
