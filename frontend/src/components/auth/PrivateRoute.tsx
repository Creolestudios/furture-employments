import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { API_TOKEN } from '../../constants';
import APP_ROUTES from '../../constants/appRoutes';

const PrivateRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem(API_TOKEN);
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={APP_ROUTES.LOGIN} />;
};

export default PrivateRoute;
