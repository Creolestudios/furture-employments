import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ERROR_MSG } from '../../utils/constants';
import { IsMatchingProperty } from '../../utils/helper';

// SignIn dto and response

@InputType()
export class SignInDTO {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}

@ObjectType()
export class SignInResponse {
  // REVIEW remove nullable true from below field
  //NOTE - Removed nullable from id and token
  @Field()
  id: string;

  @Field()
  token: string;

  @Field(() => Int)
  role: number;
}

// Forget password dto and response

@InputType()
export class ForgetPasswordDTO {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}

// REVIEW create common helper class for response and follow DRY Principle
//NOTE - resolved: referred MessageResponse

//Reset password dto and response

@InputType()
export class ResetPasswordDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  token: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @IsMatchingProperty('password', { message: ERROR_MSG.PASSWORD_DO_NOT_MATCH })
  confirmPassword: string;
}
