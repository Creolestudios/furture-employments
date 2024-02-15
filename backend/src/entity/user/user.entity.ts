import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AboutCandidateEntity } from '../candidate/registration/about.entity';
import { CandidateProfileEntity } from '../candidate/registration/profile.entity';
import { EmployerEntity } from '../employerRegistration/employerRegistration.entity';
import { LoginType, Role } from '../../utils/enum';
import { VacancyEntity } from '../vacancy/vacancy.entity';
import { VacancyCampaignsEntity } from '../admin/campaign.entity';
import { ApplicationEntity } from '../candidate/application/application.entity';
import { CandidateJobPreferenceEntity } from '../candidate/registration/jobPreference.entity';
import { CandidateNoteEntity } from '../admin/candidateNote.entity';
import { ProspectClientsEntity } from '../prospectsClients/prospectClients.entity';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ length: 100 })
  firstName: string;

  @Field()
  @Column({ length: 100 })
  lastName: string;

  @Field()
  @Column({ length: 100 })
  email: string;

  @Field()
  @Column({ default: null, length: 255 })
  password: string;

  // token length issue
  @Field()
  @Column({ length: 255, default: null })
  token: string;

  //social token length issue
  @Field()
  @Column({ length: 255, default: null })
  socialToken: string;

  @Field({ nullable: true })
  @Column({ length: 20, default: null })
  phoneNumber: string;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: 1 })
  role: Role;

  @Field(() => LoginType)
  @Column({ type: 'enum', enum: LoginType, default: 1 })
  loginType: LoginType;

  @Field()
  @Column({ type: 'boolean', default: null })
  disableAdmin: boolean;

  @Field({ nullable: true })
  @Column({ default: null, type: 'text' })
  profileImage: string;

  @Field(() => Date)
  // REVIEW no need to add column decorator for CreateDateColumn, UpdateDateColumn, DeleteDateColumn
  //NOTE - resolved
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deletedAt: Date;

  @OneToOne(
    () => CandidateProfileEntity,
    (candidateProfile) => candidateProfile.user,
  )
  candidateProfile: CandidateProfileEntity;

  @OneToOne(() => AboutCandidateEntity, (aboutCandidate) => aboutCandidate.user)
  aboutCandidate: AboutCandidateEntity;

  @OneToOne(
    () => CandidateJobPreferenceEntity,
    (jobPreference) => jobPreference.user,
  )
  jobPreference: CandidateJobPreferenceEntity;

  @OneToOne(() => EmployerEntity, (employerUser) => employerUser.user)
  employerUser: EmployerEntity;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.user)
  vacancies: VacancyEntity;

  @OneToMany(
    () => VacancyCampaignsEntity,
    (vacancyCampaigns) => vacancyCampaigns.admin,
  )
  campaigns: VacancyCampaignsEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity;

  @OneToMany(() => CandidateNoteEntity, (note) => note.user)
  notes: CandidateNoteEntity;

  @OneToOne(() => ProspectClientsEntity, (client) => client.user)
  prospectClient: ProspectClientsEntity;
}
