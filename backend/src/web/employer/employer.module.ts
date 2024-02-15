import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerService } from './employer.service';
import { EmployerResolver } from './employer.resolver';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { UserEntity } from '../../entity/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployerEntity, UserEntity, ApplicationEntity]),
  ],
  providers: [EmployerResolver, EmployerService, JwtService],
})
export class EmployerModule {}
