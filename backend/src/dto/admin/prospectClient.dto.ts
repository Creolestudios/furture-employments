import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ProspectClientsEntity } from 'src/entity/prospectsClients/prospectClients.entity';
import { ProspectTimelineEntity } from 'src/entity/prospectsClients/timeline.entity';
import { EmployerRegistrationDTO } from '../employerRegistration/employerRegistration.dto';

@InputType()
export class NewProspectDto {
  @Field()
  companyName: string;

  @Field()
  website: string;

  @Field(() => [ProspectAddressDTO])
  address: ProspectAddressDTO[];

  @Field(() => [ProspectPeopleDTO])
  people: ProspectPeopleDTO[];

  @Field()
  description: string;

  @Field()
  personAssigned: string;

  @Field()
  notes: string;
}

@InputType()
export class ProspectAddressDTO {
  @Field()
  addressLine1: string;

  @Field()
  addressLine2: string;

  @Field()
  city: string;

  @Field()
  county: string;

  @Field()
  postcode: string;

  @Field()
  country: string;
}

@InputType()
export class ProspectPeopleDTO {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  jobTitle: string;

  @Field()
  email: string;

  @Field()
  mobileNumber: string;

  @Field()
  phoneNumber: string;

  @Field()
  extension: string;
}

@ObjectType()
export class ProspectClientsResponse {
  @Field(() => [ProspectClientsEntity])
  data: ProspectClientsEntity[];

  @Field(() => Int)
  current: number;

  @Field(() => Int)
  total: number;
}

@InputType()
export class SearchProspectsClientsDto {
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  query: string;

  @Field(() => Int)
  current: number;

  @Field(() => Int)
  pageSize: number;

  @Field()
  sortBy: string;

  @Field({ nullable: true })
  status: number;
}

@ObjectType()
export class ProspectClientDetailsResponse {
  @Field(() => ProspectClientsEntity)
  data: ProspectClientsEntity;
}

@InputType()
export class UpdateProspectClientDTO extends PartialType(NewProspectDto) {
  @Field(() => Int)
  @IsOptional()
  status: number;

  @Field({ nullable: true })
  @IsOptional()
  reminderNote: string;

  @Field({ nullable: true })
  @IsOptional()
  reminderType: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  additionalEmails: string[];

  @Field(() => Date)
  @IsOptional()
  reminderDate: Date;

  @Field()
  @IsOptional()
  notes: string;
}

@ObjectType()
export class ProspectTimelineResponse {
  @Field(() => [ProspectTimelineEntity])
  data: [ProspectTimelineEntity];
}

@InputType()
export class CloseClientDTO {
  @Field(() => [String])
  @IsOptional()
  emails: string[];
}

@InputType()
export class UpdateConvertedClientDTO extends PartialType(
  EmployerRegistrationDTO,
) {
  @Field()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @Field()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @Field()
  @IsString()
  @MaxLength(100)
  email: string;

  @Field(() => Int)
  peopleId: number;

  @Field(() => Int)
  addressId: number;

  @Field(() => Int)
  initialPeopleId: number;

  @Field(() => Int)
  initialAddressId: number;

  @Field(() => Int)
  prospectClientId: number;
}
