import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ERROR_MSG } from '../../utils/constants';
import { CampaignsStatus } from '../../utils/enum';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';
import { UserEntity } from '../../entity/user/user.entity';
import { MessageResponse } from '../index';

@InputType()
export class CampaignsDTO {
  @Field()
  @IsString()
  @MaxLength(100)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  slug: string | undefined;

  @Field()
  @IsString()
  description: string;

  @Field(() => [String], { nullable: true, defaultValue: null })
  keyword: string[];

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field()
  @IsString()
  summary: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  featured: boolean;

  @Field(() => Int, { defaultValue: 1 })
  @IsEnum(CampaignsStatus, { message: ERROR_MSG.CAMPAIGN_STATUS })
  @IsOptional()
  status: CampaignsStatus;
}

@InputType()
export class UpdateCampaignDTO extends PartialType(CampaignsDTO) {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class CampaignResponse extends MessageResponse {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class VacancyDetailsResponse {
  // REVIEW add return type Int
  //NOTE - added return type to id
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  summary: string;

  @Field(() => [String])
  keyword: string[];

  @Field()
  featured: boolean;

  @Field(() => Int, { nullable: true })
  status: CampaignsStatus;

  @Field(() => VacancyEntity)
  vacancy: VacancyEntity;

  @Field(() => UserEntity)
  admin: UserEntity;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;
}

@ObjectType()
export class VacancyCampaignsResponse {
  @Field(() => [VacancyDetailsResponse])
  data: VacancyDetailsResponse[];
}
