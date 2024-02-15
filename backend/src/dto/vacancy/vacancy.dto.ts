import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { UserEntity } from '../../entity/user/user.entity';
import { VacancyStatus } from '../../utils/enum';
import { VacancyCampaignsEntity } from '../../entity/admin/campaign.entity';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';

@InputType()
export class VacancyDTO {
  @Field()
  @IsNumber()
  weeklyHours: number;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  workLocation: string;

  @Field()
  @IsString()
  salary: string;

  @Field(() => [String])
  type: string[];

  @Field()
  @IsString()
  @MaxLength(100)
  position: string;

  @Field()
  @IsString()
  @MaxLength(100)
  category: string;

  @Field()
  @IsBoolean()
  hideSalary: boolean;
}

@InputType()
export class VacancyEditDto extends PartialType(VacancyDTO) {}

@ObjectType()
export class BasicVacancyDetails {
  @Field(() => Int)
  id: number;

  @Field(() => EmployerEntity)
  employer: EmployerEntity;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  weeklyHours: number;

  @Field()
  description: string;

  @Field({ nullable: true })
  workLocation: string;

  @Field()
  salary: string;

  @Field(() => [String])
  type: string[];

  @Field()
  position: string;

  @Field()
  category: string;

  @Field()
  hideSalary: boolean;

  @Field(() => Int)
  status: VacancyStatus;

  @Field()
  fileName: string;

  @Field({ nullable: true })
  additionalFileName: string;

  @Field({ nullable: true })
  closeReason: string;

  @Field(() => [ApplicationEntity])
  applications: ApplicationEntity[];

  @Field()
  applicationCount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deletedAt: Date;
}
@ObjectType()
export class VacanciesDetailResponse extends BasicVacancyDetails {
  @Field(() => [VacancyCampaignsEntity])
  campaigns: VacancyCampaignsEntity[];
}

@ObjectType()
export class ActiveVacanciesDetailResponse extends BasicVacancyDetails {
  @Field(() => VacancyCampaignsEntity)
  campaigns: VacancyCampaignsEntity;
}

@ObjectType()
export class AllVacanciesResponse {
  @Field(() => [VacanciesDetailResponse])
  data: [VacanciesDetailResponse];

  @Field({ nullable: true })
  total: number;
}

@ObjectType()
export class AllActiveVacanciesResponse {
  @Field(() => [ActiveVacanciesDetailResponse])
  data: [ActiveVacanciesDetailResponse];

  @Field({ nullable: true })
  total: number;
}
@ObjectType()
export class AllLatestOpenVacanciesResponse {
  @Field(() => [VacanciesDetailResponse])
  data: [VacanciesDetailResponse];
}
@ObjectType()
export class FileResponse {
  @Field()
  filename: string;
}

@InputType()
export class SearchVacancyDto {
  @Field({ nullable: true })
  query: string;

  @Field(() => Int)
  current: number;

  @Field(() => Int)
  pageSize: number;
}

@ObjectType()
export class ApplicationPerVacancy {
  @Field(() => [ApplicationEntity])
  data: [ApplicationEntity];

  @Field(() => Int)
  pageNo: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
export class VacanciesAwaitingApprovalResponse {
  @Field(() => [VacancyEntity])
  data: VacancyEntity[];

  @Field({ nullable: true })
  total: number;
}

@ObjectType()
export class NewVacancyResponse {
  @Field()
  message: string;

  @Field()
  vacancyId: number;
}

@InputType()
export class SearchActiveVacanciesDTO {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  query: string;

  @Field({ nullable: true })
  @IsOptional()
  jobType: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  salaryFrom: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  salaryTo: string;
}

@ObjectType()
export class VacanciesDetailResponseAll {
  @Field(() => Int)
  id: number;

  @Field()
  weeklyHours: number;

  @Field()
  description: string;

  @Field()
  salary: string;

  @Field(() => [String])
  type: string[];

  @Field()
  position: string;

  @Field()
  category: string;

  @Field()
  hideSalary: boolean;

  @Field(() => Int)
  status: VacancyStatus;

  @Field()
  fileName: string;

  @Field({ nullable: true })
  closeReason: string;

  @Field(() => Int)
  applicationCount: number;

  @Field(() => VacancyCampaignsEntity)
  campaigns: VacancyCampaignsEntity;
}

@ObjectType()
export class allVacanciesResponse {
  @Field(() => [VacanciesDetailResponseAll])
  data: VacanciesDetailResponseAll[];

  @Field({ nullable: true })
  total: number;
}

@ObjectType()
export class AppliedOrNot {
  @Field({ nullable: true })
  applied_by_user: boolean;
}
