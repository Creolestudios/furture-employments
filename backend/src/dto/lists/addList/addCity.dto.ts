import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';


@InputType()
export class AddCityDTO{
    @Field()
    @IsString()
    @MaxLength(100)
    city: string

    @Field()
    @IsString()
    @MaxLength(100)
    country: string
}