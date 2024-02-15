import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import { IsOptional, MaxLength } from 'class-validator';
import { CandidateJobPreferenceEntity } from '../../entity/candidate/registration/jobPreference.entity';
import { AboutCandidateEntity } from '../../entity/candidate/registration/about.entity';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';

@InputType()
export class SearchCandidateDto {
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  query: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  location: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  languages: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  jobTypes: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  categories: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  skills: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  salary: string[];

  @Field(() => Int)
  current: number;

  @Field(() => Int)
  pageSize: number;

  @Field()
  sortBy: string;
}

@ObjectType()
export class CandidateListResponse {
  @Field(() => [CandidateProfileEntity])
  data: CandidateProfileEntity[];

  // REVIEW use return type Int
  //NOTE - return type added
  @Field(() => Int)
  current: number;

  // REVIEW use return type Int
  //NOTE - return type added
  @Field(() => Int)
  total: number;
}

@ObjectType()
export class CandidateDetail {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field(() => CandidateJobPreferenceEntity)
  jobPreference: CandidateJobPreferenceEntity;

  @Field(() => AboutCandidateEntity)
  aboutCandidate: AboutCandidateEntity;

  @Field(() => CandidateProfileEntity)
  candidateProfile: CandidateProfileEntity;

  @Field(() => ApplicationEntity, { nullable: true })
  application: ApplicationEntity;

  @Field(() => [ApplicationEntity], { nullable: true })
  applications: ApplicationEntity[];

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class CandidateDetailForAdminResponse {
  @Field(() => CandidateDetail)
  data: CandidateDetail;
}

@ObjectType()
export class CandidateFutureProspectCv {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => AboutCandidateEntity)
  aboutCandidate: ApplicationEntity;

  @Field(() => CandidateProfileEntity)
  candidateProfile: CandidateProfileEntity;
}
@ObjectType()
export class CandidateFutureProspectCvDetails {
  @Field(() => CandidateFutureProspectCv)
  data: CandidateFutureProspectCv;
}

@InputType()
export class CandidateUpdateSkillsDTO {
  @Field(() => Int)
  id: number;

  @Field(() => [String])
  skills: string[];
}

@InputType()
export class InviteCandidatesDTO {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  inviteMessage: string;

  @Field(() => [String])
  candidates: string[];
}
