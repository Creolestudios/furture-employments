import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CandidateProfileEntity } from '../candidate/registration/profile.entity';

@ObjectType()
@Entity('candidate_note')
export class CandidateNoteEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => CandidateProfileEntity)
  @ManyToOne(() => CandidateProfileEntity, (candidate) => candidate.notes)
  @JoinColumn({ name: 'candidateId' })
  candidate: CandidateProfileEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.notes)
  @JoinColumn({ name: 'adminId' })
  user: UserEntity;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deletedAt: Date;
}
