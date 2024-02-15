import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GqlForbiddenException } from '../../utils/errors/errors';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  handleRequest(error, user) {
    if (!user) {
      throw GqlForbiddenException();
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
