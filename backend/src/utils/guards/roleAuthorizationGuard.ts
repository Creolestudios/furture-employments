import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../enum';
import { ERROR_MSG } from '../constants';

@Injectable()
export class RoleAuthorizationGuard implements CanActivate {
  public role: Role | Array<Role>;

  constructor(role: Role | Array<Role>) {
    this.role = role;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;
    const { role } = request.user;

    if (Array.isArray(this.role) && this.role.includes(role)) {
      return true;
    }

    if (role === this.role) {
      return true;
    }

    throw new UnauthorizedException(ERROR_MSG.INVALID_TOKEN);
  }
}
