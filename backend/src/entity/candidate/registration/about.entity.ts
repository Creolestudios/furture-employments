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
import { NoticePeriodType } from '../../../utils/enum';
import { ApplicationEntity } from '../application/application.entity';

@ObjectType()
@Entity('candidate_about')
export class AboutCandidateEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true, default: null })
  reasonForLeaving: string;

  @Field({ nullable: true })
  @Column({ length: 255, nullable: true, default: null })
  cv: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true, default: null })
  futureProspectsCv: string;

  @Field({ nullable: true })
  @Column({ length: 20, nullable: true, default: null })
  currentSalary: string;

  @Field(() => [String])
  @Column('text', { array: true })
  languages: string[];

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, default: null })
  noticePeriodTime: number;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  skills: string[];

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'enum',
    enum: NoticePeriodType,
    nullable: true,
    default: null,
  })
  noticePeriodType: NoticePeriodType;

  @Field(() => Boolean)
  @Column({ default: false })
  isCurrentlyEmployed: boolean;

  @Field(() => ApplicationEntity)
  @OneToOne(() => ApplicationEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  application: ApplicationEntity;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity, (user) => user.aboutCandidate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Field(() => Boolean)
  @Column({ default: false })
  hasWorkRight: boolean;

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
