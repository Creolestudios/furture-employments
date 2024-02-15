import { Field, ObjectType } from '@nestjs/graphql';
import { CountryEntity } from '../../entity/lists/country.entity';
import { JobCatEntity } from '../../entity/lists/jobCat.entity';
import { JobTypeEntity } from '../../entity/lists/jobType.entity';
import { LanguageEntity } from '../../entity/lists/language.entity';


@ObjectType()
export class ListResponse {
  @Field(() => [CountryEntity])
  country: CountryEntity[];

  @Field(() => [LanguageEntity])
  language:LanguageEntity[]

  @Field(() => [JobCatEntity])
  JobCat:JobCatEntity[]

  @Field(() => [JobTypeEntity])
  JobType:JobTypeEntity[]
}