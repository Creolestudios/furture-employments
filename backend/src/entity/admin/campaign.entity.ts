import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CampaignsStatus } from '../../utils/enum';
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
import { VacancyEntity } from '../vacancy/vacancy.entity';

@ObjectType()
@Entity('vacancy_campaigns')
export class VacancyCampaignsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ type: 'text' })
  slug: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Field()
  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Field()
  @Column({ type: 'text' })
  summary: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  keyword: string[];

  @Field()
  @Column({ default: false })
  featured: boolean;

  @Field(() => CampaignsStatus)
  @Column({ type: 'enum', enum: CampaignsStatus, default: 1 })
  status: CampaignsStatus;

  @ManyToOne(() => VacancyEntity, (vacancy) => vacancy.campaigns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  vacancy: VacancyEntity;

  @ManyToOne(() => UserEntity, (user) => user.campaigns, {
    onDelete: 'CASCADE',
  })
  admin: UserEntity;

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
