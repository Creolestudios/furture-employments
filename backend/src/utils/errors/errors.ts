import { GraphQLError } from 'graphql';
import { ERROR_MSG } from '../constants';

export function GqlInternalServerErrorException(message?: string) {
  throw new GraphQLError(message, {
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
  });
}

export function GqlBadRequestErrorException(message?: string) {
  throw new GraphQLError(message, { extensions: { code: 'BAD_REQUEST' } });
}

// REVIEW naming convention
//NOTE - resolved
export function GqlNotFoundException(message?: string) {
  throw new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND_EXCEPTION' },
  });
}

export function GqlForbiddenException(message?: string) {
  throw new GraphQLError(message || ERROR_MSG.NOT_LOGGED_IN, {
    extensions: { code: 'FORBIDDEN' },
  });
}

export const getError = (error) => {
  throw new GraphQLError(error.message || '', {
    extensions: {
      code: error?.extensions?.code || 'INTERNAL_SERVER_ERROR',
    },
  });
};
