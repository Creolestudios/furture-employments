import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ERROR_MSG } from '../../../utils/constants';
import { Relocation } from '../../../utils/enum';

@InputType()
export class CandidateJobPreferenceDto {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  jobTypes: string[];

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  desiredSalary: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  categories: string[];

  @Field(() => Int)
  @IsEnum(Relocation, { message: ERROR_MSG.RELOCATION })
  @IsNotEmpty()
  relocation: Relocation;

  @Field()
  @IsBoolean()
  canAdminApply: boolean;
}

@InputType()
export class UpdateCandidateJobPreferenceDto extends PartialType(
  CandidateJobPreferenceDto,
) {}
