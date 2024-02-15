import { Field, Int, ObjectType } from '@nestjs/graphql';
import { VacancyStatus } from '../../utils/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployerEntity } from '../employerRegistration/employerRegistration.entity';
import { UserEntity } from '../user/user.entity';
import { VacancyCampaignsEntity } from '../admin/campaign.entity';
import { ApplicationEntity } from '../candidate/application/application.entity';

@ObjectType()
@Entity()
export class VacancyEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => EmployerEntity)
  @ManyToOne(() => EmployerEntity, (employer) => employer.vacancies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employer: EmployerEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.vacancies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Field(() => ApplicationEntity)
  @OneToMany(() => ApplicationEntity, (application) => application.vacancy, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  applications: ApplicationEntity;

  @Field(() => Int)
  @Column({ default: 0 })
  applicationCount: number;

  @Field()
  @Column({ type: 'float' })
  weeklyHours: number;

  @Field()
  @Column({ type: 'text', default: null })
  description: string;

  @Field()
  @Column({ type: 'text', default: null })
  workLocation: string;

  @Field()
  @Column()
  salary: string;

  @Field(() => [String])
  @Column('text', { array: true })
  type: string[];

  @Field()
  @Column({ length: 100 })
  position: string;

  @Field()
  @Column({ length: 100 })
  category: string;

  @Field()
  @Column({ default: false })
  hideSalary: boolean;

  @Field(() => VacancyStatus)
  @Column({ type: 'enum', enum: VacancyStatus, default: 1 })
  status: VacancyStatus;

  @Field()
  @Column({ nullable: true })
  fileName: string;

  @Field()
  @Column({ nullable: true })
  additionalFileName: string;

  @Field()
  @Column({ nullable: true })
  closeReason: string;

  @OneToMany(
    () => VacancyCampaignsEntity,
    (vacancyCampaigns) => vacancyCampaigns.vacancy,
  )
  campaigns: VacancyCampaignsEntity[];

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
