import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user/user.entity';
import {  LanguageEntity} from '../../entity/lists/language.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { SignUpResolver } from './sign-up/sign-up.resolver';
import { CountryEntity } from '../../entity/lists/country.entity';
import { JobTypeEntity } from '../../entity/lists/jobType.entity';
import { JobCatEntity } from '../../entity/lists/jobCat.entity';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([UserEntity,CountryEntity,LanguageEntity,JobTypeEntity,JobCatEntity]),
  ],
  providers: [UserResolver, UserService, SignUpResolver],
})
export class UserModule {}
