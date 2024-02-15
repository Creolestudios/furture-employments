import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import Router from './routing/Router';
import createApolloClient from './createClient';
import GlobalProvider from './context/global';

import Global from './styles/globalStyles';
import './assets/styles/font/font.css';

const App: FC = () => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Global />
        <Router />
      </GlobalProvider>
    </ApolloProvider>
  );
};

export default App;
