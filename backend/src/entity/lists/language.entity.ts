import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class LanguageEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({type:'varchar' ,length: 100})
  languages: string;

  @Field()
  @Column({type:'varchar' ,length: 100})
  code : string;
}


