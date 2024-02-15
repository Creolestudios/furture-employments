import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class AddJobTypeDTO {
    @Field()
    @IsString()
    @MaxLength(100)
    jobType: string;
}