import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from '../../entity/candidate/application/application.entity';
import { CandidateProfileEntity } from '../../entity/candidate/registration/profile.entity';
import { UserEntity } from 'src/entity/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationEntity,
      CandidateProfileEntity,
      UserEntity,
    ]),
  ],
  providers: [ApplicationResolver, ApplicationService],
})
export class ApplicationModule {}
