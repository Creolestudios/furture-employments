import { Field, InputType, PartialType } from '@nestjs/graphql';
import { UserBasicSignupDTO } from './userRegister.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserBasicSignupDto extends PartialType(UserBasicSignupDTO) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;
}
