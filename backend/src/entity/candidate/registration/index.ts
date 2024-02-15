import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CandidateProfileEntity } from './profile.entity';
import { AboutCandidateEntity } from './about.entity';
import { CandidateJobPreferenceEntity } from './jobPreference.entity';
import { Role } from '../../../utils/enum';

@ObjectType()
export class CandidateRegistration {
  @Field(() => CandidateProfileEntity)
  candidateProfile: CandidateProfileEntity;

  @Field(() => AboutCandidateEntity)
  aboutCandidate: AboutCandidateEntity;

  @Field(() => CandidateJobPreferenceEntity)
  candidateJobPreference: CandidateJobPreferenceEntity;
}

@ObjectType()
export class CandidateProfile {
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

  @Field(() => Int)
  role: Role;

  @Field(() => CandidateProfileEntity)
  candidateProfile: CandidateProfileEntity;

  @Field(() => AboutCandidateEntity)
  aboutCandidate: AboutCandidateEntity;
}
