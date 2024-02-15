import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class AddJobCatDTO {
    @Field()
    @IsString()
    @MaxLength(100)
    jobCategory: string;
}