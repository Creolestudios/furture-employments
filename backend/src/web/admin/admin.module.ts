import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../../entity/user/user.entity';
import { EmployerEntity } from '../../entity/employerRegistration/employerRegistration.entity';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { AboutCandidateEntity } from '../../entity/candidate/registration/about.entity';
import { CandidateJobPreferenceEntity } from '../../entity/candidate/registration/jobPreference.entity';
import { CandidateNoteEntity } from '../../entity/admin/candidateNote.entity';
import { EmployerNotesEntity } from '../../entity/admin/employerNote.entity';
import { CityEntity, CountryEntity } from '../../entity/lists/country.entity';
import { LanguageEntity } from '../../entity/lists/language.entity';
import { JobCatEntity } from '../../entity/lists/jobCat.entity';
import { JobTypeEntity } from '../../entity/lists/jobType.entity';
import { SkillsEntity } from '../../entity/admin/skills.entity';
import { VacancyEntity } from 'src/entity/vacancy/vacancy.entity';
import {
  ProspectAddress,
  ProspectClientsEntity,
  ProspectPeople,
} from 'src/entity/prospectsClients/prospectClients.entity';
import { ProspectTimelineEntity } from 'src/entity/prospectsClients/timeline.entity';
@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([
      UserEntity,
      EmployerEntity,
      CandidateProfileEntity,
      ApplicationEntity,
      AboutCandidateEntity,
      CandidateJobPreferenceEntity,
      CandidateNoteEntity,
      EmployerNotesEntity,
      CountryEntity,
      CityEntity,
      LanguageEntity,
      JobCatEntity,
      JobTypeEntity,
      SkillsEntity,
      VacancyEntity,
      ProspectClientsEntity,
      ProspectAddress,
      ProspectPeople,
      ProspectTimelineEntity,
    ]),
  ],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
