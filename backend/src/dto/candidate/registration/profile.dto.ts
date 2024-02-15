import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CandidateProfileDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  addressLine1: string;

  @Field()
  @IsString()
  @MaxLength(255)
  addressLine2: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  county: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  postcode: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  country: string;
}

@InputType()
export class UpdateCandidateProfileDto extends PartialType(
  CandidateProfileDTO,
) {}
