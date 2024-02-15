import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ERROR_MSG } from '../../../utils/constants';
import { NoticePeriodType } from '../../../utils/enum';

@InputType()
export class AboutCandidateDTO {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  languages: string[];

  @Field()
  @IsBoolean()
  isCurrentlyEmployed: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reasonForLeaving: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ groups: ['isCurrentlyEmployed'] })
  @MaxLength(20)
  currentSalary: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsEnum(NoticePeriodType, { message: ERROR_MSG.NOTICE_PERIOD_NOT_EXCEPT })
  @IsNotEmpty({ groups: ['isCurrentlyEmployed'] })
  noticePeriodType: NoticePeriodType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ groups: ['isCurrentlyEmployed'] })
  noticePeriodTime: number;

  @Field(() => Boolean)
  @IsBoolean()
  hasWorkRight: boolean;
}

@InputType()
export class UpdateAboutCandidateDto extends PartialType(AboutCandidateDTO) {}
