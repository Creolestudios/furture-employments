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
import { EmployerEntity } from '../employerRegistration/employerRegistration.entity';

@ObjectType()
@Entity('employer_notes')
export class EmployerNotesEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => EmployerEntity)
  @ManyToOne(() => EmployerEntity, (employer) => employer.notes)
  @JoinColumn({ name: 'employerId' })
  employer: EmployerEntity;

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
