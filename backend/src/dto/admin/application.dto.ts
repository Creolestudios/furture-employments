import { Field, ObjectType } from '@nestjs/graphql';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { UserEntity } from '../../entity/user/user.entity';

@ObjectType()
export class AllVacanciesApplications {
  @Field(() => ApplicationEntity)
  application: ApplicationEntity;

  @Field(() => UserEntity)
  user: UserEntity;
}

@ObjectType()
export class ApplicationsListResponse {
  @Field(() => [ApplicationEntity])
  applications: ApplicationEntity[];

  @Field({ nullable: true })
  total: number;
}
@ObjectType()
export class ApplicationsByVacancyResponse {
  @Field(() => [ApplicationEntity])
  applications: ApplicationEntity[];

  @Field()
  total: number;

  @Field()
  pageNo: number;
}
