import React, { FC, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../components/common/loader';
import APP_ROUTES from '../constants/appRoutes';

const CandidateSignup = React.lazy(
  () => import('../containers/Signup/CandidateSignup'),
);
const EmployerSignup = React.lazy(
  () => import('../containers/Signup/Employer'),
);
// Public Routes for signup as candidate or client

const CandidateSignupRoutes: FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={APP_ROUTES.CANDIDATE_SIGNUP} element={<CandidateSignup />} />
      <Route
        path={APP_ROUTES.NOT_FOUND}
        element={<Navigate to={APP_ROUTES.CANDIDATE_SIGNUP} />}
      />
    </Routes>
  </Suspense>
);

export default CandidateSignupRoutes;

export const EmployerSignupRoutes: FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={APP_ROUTES.EMPLOYER_SIGNUP} element={<EmployerSignup />} />
      <Route
        path={APP_ROUTES.NOT_FOUND}
        element={<Navigate to={APP_ROUTES.EMPLOYER_SIGNUP} />}
      />
    </Routes>
  </Suspense>
);
