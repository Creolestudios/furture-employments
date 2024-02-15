import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class AddLanguageDTO {
    @Field()
    @IsString()
    @MaxLength(100)
    languages: string;
  
    @Field()
    @IsString()
    @MaxLength(100)
    code:string
}