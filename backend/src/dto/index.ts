import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field()
  message: string;
}

@ObjectType()
export class UserRegistrationResponse extends MessageResponse {
  @Field()
  token: string;
}

@ObjectType()
export class CreateApplicationResponse extends MessageResponse {
  @Field()
  id: number;
}