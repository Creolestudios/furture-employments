import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class JobCatEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Field()
  @Column({type:'varchar' ,length: 100})
  JobCategory: string;
  
}