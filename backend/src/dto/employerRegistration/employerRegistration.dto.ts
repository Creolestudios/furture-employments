import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class EmployerRegistrationDTO {
  // REVIEW define return type Int
  @Field()
  userId: number;

  @Field()
  @IsString()
  companyName: string;

  @Field()
  @IsString()
  phoneNumber: string;

  @Field()
  @IsString()
  addressLine1: string;

  @Field()
  @IsString()
  addressLine2: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  county: string;

  @Field()
  @IsString()
  postcode: string;

  @Field()
  @IsString()
  country: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  businessNature: string;

  @Field()
  @IsString()
  registrationNo: string;

  @Field()
  @IsString()
  vatNo: string;
}

// REVIEW use helper class
//NOTE - resolved: referred to UserRegistrationResponse

@InputType()
export class EmployerProfileEditDto extends PartialType(
  EmployerRegistrationDTO,
) {
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
  @MaxLength(100)
  email: string;
}
