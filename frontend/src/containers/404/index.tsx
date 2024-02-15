import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout';
import APP_ROUTES from '../../constants/appRoutes';

import StyledPageNotFound from './index.styles';

const PageNotFound: FC = () => (
  <AppLayout>
    <StyledPageNotFound>
      <div className='error'>
        <h1>404</h1>
        <h4>Page Not Found</h4>
      </div>
      <div className='content'>
        <p className='title'>
          We&apos;ve looked everywhere but can&apos;t find that!
        </p>
        <p>
          We can&apos;t find the page you were looking for. Please check the
          address in your browser and try again.
        </p>
        <Link to={APP_ROUTES.HOME}>Take me to the home page</Link>
      </div>
    </StyledPageNotFound>
  </AppLayout>
);

export default PageNotFound;
