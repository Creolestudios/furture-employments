import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class AddCountryDTO {
    @Field()
    @IsString()
    @MaxLength(100)
    country: string;
  
    @Field()
    @IsString()
    @MaxLength(100)
    code:string
}