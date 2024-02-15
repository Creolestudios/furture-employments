import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { API_TOKEN, USER_ROLE, USER_ROLE_KEY } from '../../constants';
import APP_ROUTES from '../../constants/appRoutes';

const PublicRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem(API_TOKEN);
  const ROLE = Number(sessionStorage.getItem(USER_ROLE_KEY));

  if (!isAuthenticated) {
    return children;
  }

  switch (ROLE) {
    case USER_ROLE.CANDIDATE_SIGN_UP:
      return <Navigate to={APP_ROUTES.CANDIDATE_SIGNUP} />;

    case USER_ROLE.ADMIN:
    case USER_ROLE.CANDIDATE:
    case USER_ROLE.EMPLOYER:
    case USER_ROLE.SUPER_ADMIN:
      return <Navigate to={APP_ROUTES.DASHBOARD} />;

    case USER_ROLE.EMPLOYER_SIGN_UP:
      return <Navigate to={APP_ROUTES.EMPLOYER_SIGNUP} />;

    default:
      return null;
  }
};

export default PublicRoute;
