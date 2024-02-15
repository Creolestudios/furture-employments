import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';

@InputType()
export class SearchClientDto {
  @Field({ nullable: true })
  // REVIEW use appropriate naming convention
  //NOTE - q to query rename
  query: string;

  // REVIEW define return type Int
  //NOTE - return type added
  @Field(() => Int)
  current: number;

  // REVIEW define return type Int
  //NOTE - return type added
  @Field(() => Int)
  pageSize: number;
}

@ObjectType()
export class EmployerListResponse {
  @Field(() => [EmployerEntity])
  data: EmployerEntity[];

  // REVIEW define return type Int
  //NOTE - return type added
  @Field(() => Int)
  current: number;

  // REVIEW define return type Int
  //NOTE - return type added
  @Field(() => Int)
  total: number;
}
