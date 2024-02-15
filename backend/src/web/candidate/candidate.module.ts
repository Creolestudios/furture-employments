import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../entity/user/user.entity';
import { CandidateResolver } from './candidate.resolver';
import { CandidateService } from './candidate.service';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import { AboutCandidateEntity } from '../../entity/candidate/registration/about.entity';
import { CandidateJobPreferenceEntity } from '../../entity/candidate/registration/jobPreference.entity';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { VacancyEntity } from '../../entity/vacancy/vacancy.entity';
import { FileService } from '../file/file.service';
import { CandidateNoteEntity } from '../../entity/admin/candidateNote.entity';
import { CampaignExpirationMiddleware } from '../../utils/middlewares/campaignExpiration.middleware';
import { VacancyCampaignsEntity } from '../../entity/admin/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CandidateProfileEntity,
      UserEntity,
      CandidateJobPreferenceEntity,
      CandidateNoteEntity,
      AboutCandidateEntity,
      ApplicationEntity,
      VacancyEntity,
      VacancyCampaignsEntity,
    ]),
  ],
  providers: [CandidateResolver, CandidateService, JwtService, FileService],
})
export class CandidateModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CampaignExpirationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
