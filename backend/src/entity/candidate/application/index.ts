import { Field, ObjectType, Int } from '@nestjs/graphql';
import { UserEntity } from '../../../entity/user/user.entity';
import { VacancyEntity } from '../../../entity/vacancy/vacancy.entity';
import { ApplicationStatus } from '../../../utils/enum';
import { CandidateProfileEntity } from '../registration/profile.entity';
import { AboutCandidateEntity } from '../registration/about.entity';

@ObjectType()
export class ApplicationResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  status: ApplicationStatus;

  @Field()
  createdAt: Date;

  @Field(() => VacancyEntity)
  vacancy: VacancyEntity;
  @Field({ nullable: true })
  futureProspects: string;

  @Field({ nullable: true })
  approveReason: string;

  @Field({ nullable: true })
  approvedBy: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => CandidateProfileEntity)
  profile: CandidateProfileEntity;

  @Field(() => AboutCandidateEntity, { nullable: true })
  about: AboutCandidateEntity;
}

@ObjectType()
export class GetApplicationsResponse {
  @Field(() => [ApplicationResponse])
  applications: ApplicationResponse[];

  @Field(() => Int)
  total: number;
}
