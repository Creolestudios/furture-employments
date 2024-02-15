import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../../../utils/enum';
import { UserRegistrationResponse } from '../../../dto';

// REVIEW use common helper class
//NOTE - resolved: Add MessageResponse common helper class

@ObjectType()
export class CVDetailsResponse {
  @Field({ nullable: true })
  fileName: string;

  @Field()
  updatedAt: string;

  @Field(() => Int)
  id: number;
}

@ObjectType()
export class CandidateRegistrationResponse extends UserRegistrationResponse {
  @Field(() => Int)
  role: Role;
}

@ObjectType()
export class CVContentResponse {
  @Field()
  url: string;

  @Field()
  fileName: string;
}
