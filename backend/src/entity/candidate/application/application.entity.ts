import { Field, Int, ObjectType } from '@nestjs/graphql';
// REVIEW Dinesh use relative path
// Review comment resolved
import { ApplicationStatus } from '../../../utils/enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { VacancyEntity } from '../../vacancy/vacancy.entity';
import { AboutCandidateEntity } from '../registration/about.entity';

@ObjectType()
@Entity('candidate_application')
export class ApplicationEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.UNAPPROVED,
  })
  status: ApplicationStatus;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true, default: null })
  reason: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true, default: null })
  approveReason: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true, default: null })
  approvedBy: string;

  @Field(() => AboutCandidateEntity)
  @OneToOne(() => AboutCandidateEntity, (candidate) => candidate.application, {
    onDelete: 'CASCADE',
  })
  aboutCandidate: AboutCandidateEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Field(() => VacancyEntity)
  @ManyToOne(() => VacancyEntity, (vacancy) => vacancy.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vacancyId' })
  vacancy: VacancyEntity;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date;
}
