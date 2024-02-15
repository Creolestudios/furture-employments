import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ERROR_MSG } from '../constants';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(ERROR_MSG.NOT_LOGGED_IN);
    }
    try {
      const decode = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = decode;
      return true;
    } catch (error) {
      throw new UnauthorizedException(ERROR_MSG.INVALID_TOKEN);
    }
  }
}
