import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { API_TOKEN } from './constants';

const getToken = () => sessionStorage.getItem(API_TOKEN);
// Creating Apollo Client to query database
const createApolloClient = () => {
  const httpLink: any = createUploadLink({
    uri: process.env.REACT_APP_BASE_URI,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
    return {
      headers,
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
  return client;
};

export default createApolloClient;
