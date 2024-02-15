import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from '../../../utils/enum';

@InputType()
export class CandidateUser {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(100)
  email: string;

  @Field()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(20)
  phoneNumber: string;

  @Field(() => Int, { nullable: true })
  role: Role;
}
