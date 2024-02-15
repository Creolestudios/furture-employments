import { ApolloDriver } from '@nestjs/apollo';

interface GraphQLConfig {
  autoSchemaFile: string;
  formatError?: (error: any) => any;
  formatResponse?: (response: any) => any;
  debug: boolean;
  introspection: boolean;
  playground: boolean;
  driver: any;
  csrfPrevention: boolean;
  definitions?: { path: string };
  context: any;
}

const graphqlConfig: GraphQLConfig = {
  autoSchemaFile: '../utils/schema.graphql',
  context: ({ req, res }) => ({ req, res }),
  definitions: { path: '../utils/graphql-interface.ts' },
  formatError: (error) => {
    const graphQLFormattedError = {
      message:
        error.extensions?.exception?.response?.message ||
        error.extensions?.originalError?.message ||
        error.message,
      code: error.extensions?.code || 'SERVER_ERROR',
      name: error.extensions?.exception?.name || error.name,
    };
    return graphQLFormattedError;
  },
  formatResponse: (res) => {
    if (res.errors && res.errors.length > 0) {
      return {
        errors: res.errors,
      };
    } else {
      return res;
    }
  },
  debug: true,
  playground: true,
  introspection: true,
  csrfPrevention: false,
  driver: ApolloDriver,
};
export default graphqlConfig;
