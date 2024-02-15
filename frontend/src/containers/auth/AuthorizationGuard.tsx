import React, { FC } from 'react';
import { USER_ROLE, USER_ROLE_KEY } from '../../constants';

import EmployerRoutes from '../../routing/EmployerRoutes';
import CandidateRoutes from '../../routing/CandidateRoutes';
import AdminRoutes from '../../routing/AdminRoutes';
import CandidateSignupRoutes, {
  EmployerSignupRoutes,
} from '../../routing/SignupRoutes';

const AuthorizationGuard: FC = () => {
  const ROLE: number | null = Number(sessionStorage.getItem(USER_ROLE_KEY));

  switch (ROLE) {
    case USER_ROLE.EMPLOYER:
      return <EmployerRoutes />;

    case USER_ROLE.CANDIDATE:
      return <CandidateRoutes />;

    case USER_ROLE.ADMIN:
      return <AdminRoutes />;
    case USER_ROLE.SUPER_ADMIN:
      return <AdminRoutes />;
    case USER_ROLE.CANDIDATE_SIGN_UP:
      return <CandidateSignupRoutes />;

    case USER_ROLE.EMPLOYER_SIGN_UP:
      return <EmployerSignupRoutes />;

    default:
      return null;
  }
};

export default AuthorizationGuard;
