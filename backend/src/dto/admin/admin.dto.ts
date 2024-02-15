import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserResponse } from '../user/userRegister.dto';

@InputType()
export class DisableAdminDto {
  @Field(() => Int)
  userId: number;

  @Field()
  @IsBoolean()
  disableAdmin: boolean;
}

@InputType()
export class UpdateAdminDto {
  @Field(() => Int)
  userId: number;

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
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}

@ObjectType()
export class AllAdminListDto {
  @Field(() => [UserResponse])
  data: UserResponse[];

  @Field({ nullable: true })
  total: number;
}

@ObjectType()
export class PdfToMarkdownTextResponse {
  @Field({ nullable: true })
  pdfText: string;
}
