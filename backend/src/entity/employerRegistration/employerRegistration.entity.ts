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
import { UserEntity } from '../user/user.entity';
import { VacancyEntity } from '../vacancy/vacancy.entity';
import { EmployerNotesEntity } from '../admin/employerNote.entity';

@ObjectType()
@Entity()
export class EmployerEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity, (user) => user.employerUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Field()
  @Column({ length: 100 })
  companyName: string;

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
  @Column({ length: 20 })
  country: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  businessNature: string;

  @Field()
  @Column({ length: 50 })
  registrationNo: string;

  @Field()
  @Column({ length: 50 })
  vatNo: string;

  @Field(() => Date)
  @Column()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @Column()
  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deletedAt: Date;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.employer)
  vacancies: VacancyEntity[];
  @OneToMany(() => EmployerNotesEntity, (note) => note.employer)
  notes: EmployerNotesEntity[];
}

@ObjectType()
export class EmployerResponse {
  @Field(() => EmployerEntity)
  data: EmployerEntity;

  @Field()
  token: string;
}
