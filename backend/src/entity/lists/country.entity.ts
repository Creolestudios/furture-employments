import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


@ObjectType()
@Entity()
export class CountryEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Field()
  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Field(() => [CityEntity])
  @OneToMany(() => CityEntity, (city) => city.country)
  cities: CityEntity[];
}

@ObjectType()
@Entity()
export class CityEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  city: string;

  @ManyToOne(() => CountryEntity, (country) => country.cities)
  country: CountryEntity;
}
