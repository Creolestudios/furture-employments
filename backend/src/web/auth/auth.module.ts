import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../entity/user/user.entity';
import { LinkedInStrategy } from './linkedin.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { config } from 'dotenv';
import { JwtMiddleware } from '../../utils/middlewares/jwt.middleware';

config();

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthResolver, AuthService, LinkedInStrategy],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
