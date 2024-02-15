import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity()
export class ProspectClientsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  companyName: string;

  @Field()
  @Column({ length: 100 })
  website: string;

  @Field(() => [ProspectAddress])
  @OneToMany(() => ProspectAddress, (people) => people.prospectClient, {
    cascade: true,
  })
  address: ProspectAddress[];

  @Field(() => [ProspectPeople])
  @OneToMany(() => ProspectPeople, (people) => people.prospectClient, {
    cascade: true,
  })
  people: ProspectPeople[];

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field()
  @Column({ length: 255 })
  personAssigned: string;

  @Field(() => UserEntity, { nullable: true })
  @OneToOne(() => UserEntity, (user) => user.prospectClient, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @Field()
  @Column({ type: 'text' })
  notes: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  reminderNote: string;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'text', nullable: true, array: true })
  additionalEmails: string[];

  @Field({ nullable: true, defaultValue: 'email' })
  @Column({ type: 'text', nullable: true, default: 'email' })
  reminderType: string;

  @Field(() => Date)
  @Column()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  reminderDate: Date;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ nullable: true, default: 1 })
  status: number;

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
}

@ObjectType()
@Entity()
export class ProspectAddress {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ length: 255 })
  addressLine1: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  addressLine2: string;

  @Field({ nullable: true })
  @Column({ length: 50 })
  city: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  county: string;

  @Field({ nullable: true })
  @Column({ length: 20 })
  postcode: string;

  @Field({ nullable: true })
  @Column({ length: 20 })
  country: string;

  @Field({ nullable: true })
  @Column({ default: null })
  converted: boolean;

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

  @ManyToOne(() => ProspectClientsEntity, (client) => client.address)
  @JoinColumn({ name: 'prospectClientId' })
  prospectClient: ProspectClientsEntity;
}

@ObjectType()
@Entity()
export class ProspectPeople {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ length: 255 })
  firstName: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  lastName: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  jobTitle: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  email: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  mobileNumber: string;

  @Field({ nullable: true, defaultValue: '+44' })
  @Column({ length: 255, nullable: true })
  extension: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({ default: null })
  converted: boolean;

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

  @ManyToOne(() => ProspectClientsEntity, (client) => client.people)
  @JoinColumn({ name: 'prospectClientId' })
  prospectClient: ProspectClientsEntity;
}
