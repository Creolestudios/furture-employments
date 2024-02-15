import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';
import { VacancyResolver } from './vacancy.resolver';
import { VacancyService } from './vacancy.service';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { UserEntity } from '../../entity/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { VacancyCampaignsEntity } from '../../entity/admin/campaign.entity';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VacancyEntity,
      EmployerEntity,
      UserEntity,
      VacancyCampaignsEntity,
      ApplicationEntity,
    ]),
  ],
  providers: [VacancyResolver, VacancyService, JwtService],
  exports: [VacancyService],
})
export class VacancyModule {}
