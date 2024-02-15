import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { CandidateJobPreferenceEntity } from './jobPreference.entity';
import { AboutCandidateEntity } from './about.entity';
import { CandidateNoteEntity } from '../../../entity/admin/candidateNote.entity';

@ObjectType()
@Entity('candidate_profile')
export class CandidateProfileEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  addressLine1: string;

  @Field()
  @Column({ length: 255 })
  addressLine2: string;

  @Field()
  @Column({ length: 50 })
  city: string;

  @Field()
  @Column({ length: 100 })
  county: string;

  @Field()
  @Column({ length: 20 })
  postcode: string;

  @Field()
  @Column({ length: 50 })
  country: string;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity, (user) => user.candidateProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Field(() => CandidateJobPreferenceEntity)
  @OneToOne(() => CandidateJobPreferenceEntity, (candidate) => candidate.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  jobPreference: CandidateJobPreferenceEntity;

  @Field()
  @OneToOne(() => AboutCandidateEntity, (about) => about.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  aboutCandidate: AboutCandidateEntity;

  @OneToMany(() => CandidateNoteEntity, (note) => note.candidate)
  notes: CandidateNoteEntity[];

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
