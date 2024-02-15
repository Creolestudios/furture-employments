import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './web/user/user.module';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { config } from 'dotenv';
import { AuthModule } from './web/auth/auth.module';
import graphqlConfig from './config/graphql';
import databaseConfig from './config/database';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  ErrorInterCeptor,
  GraphqlExceptionFilter,
} from './utils/interceptor/error.interceptor';
import { EmployerModule } from './web/employer/employer.module';
import { VacancyModule } from './web/vacancy/vacancy.module';
import { CandidateModule } from './web/candidate/candidate.module';
import { AdminModule } from './web/admin/admin.module';

import { ApplicationModule } from './web/application/application.module';
import EmailConfig from './config/emailConfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import serveStaticConfig from './config/serveStaticConfig';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskScheduleService } from './shared/taskSchedule/taskSchedule.service';

config();

@Module({
  imports: [
    // serve static content
    ServeStaticModule.forRoot(serveStaticConfig),

    // graphql module
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),

    // database module
    TypeOrmModule.forRoot(databaseConfig),

    // email configuration
    EmailConfig,

    // modules
    UserModule,
    EmployerModule,
    AuthModule,
    VacancyModule,
    CandidateModule,
    AdminModule,
    ApplicationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ErrorInterCeptor },
    { provide: APP_FILTER, useClass: GraphqlExceptionFilter },
    TaskScheduleService,
  ],
})
export class AppModule {}
