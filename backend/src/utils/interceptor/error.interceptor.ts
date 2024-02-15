import {
  CallHandler,
  Catch,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { GqlInternalServerErrorException } from '../errors/errors';
import { Observable, tap } from 'rxjs';

@Catch(GraphQLError)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: any) {
    if (exception.extensions.code === 'INTERNAL_SERVER_ERROR') {
      return GqlInternalServerErrorException();
    }
    return exception;
  }
}

@Injectable()
export class ErrorInterCeptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap({
        error: (error) => error.message,
      }),
    );
  }
}
