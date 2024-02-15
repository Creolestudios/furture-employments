import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { Relocation } from '../../../utils/enum';

@ObjectType()
@Entity('candidate_job_preference')
export class CandidateJobPreferenceEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [String])
  @Column('text', { array: true })
  jobTypes: string[];

  @Field()
  @Column({ length: 20 })
  desiredSalary: string;

  @Field(() => [String])
  @Column('text', { array: true })
  categories: string[];

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  canAdminApply: boolean;

  @Field(() => Int)
  @Column({ type: 'enum', enum: Relocation })
  relocation: Relocation;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity, (user) => user.jobPreference, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
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
