import React, { lazy, FC, Suspense } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import APP_ROUTES from '../constants/appRoutes';
import PrivateRoute from '../components/auth/PrivateRoute';
import PublicRoute from '../components/auth/PublicRoute';
import Loader from '../components/common/loader';
import ResetPassword from '../containers/auth/resetPassword/ResetPassword';
import LinkedinLogin from '../containers/auth/linkedinLogin/LinkedinLogin';

const Home = lazy(() => import('../containers/Home/Home'));
const AuthorizationGuard = lazy(
  () => import('../containers/auth/AuthorizationGuard'),
);
const PageNotFound = lazy(() => import('../containers/404'));
const Signup = lazy(() => import('../containers/Signup/Signup'));

// Public routes when app loads
const Router: FC = () => (
  <BrowserRouter basename='/portal'>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path={APP_ROUTES.HOME}
          element={<Navigate to={APP_ROUTES.LOGIN} />}
        />
        <Route
          path={APP_ROUTES.LOGIN}
          element={(
            <PublicRoute>
              <Home />
            </PublicRoute>
          )}
        />
        <Route
          path={APP_ROUTES.CREATE_ACCOUNT}
          element={(
            <PublicRoute>
              <Signup />
            </PublicRoute>
          )}
        />

        <Route
          path={APP_ROUTES.RESET_PASSWORD}
          element={(
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          )}
        />
        <Route
          path={APP_ROUTES.LINKEDIN_CALLBACK}
          element={(
            <PublicRoute>
              <LinkedinLogin />
            </PublicRoute>
          )}
        />
        <Route
          path={'/*'}
          element={(
            <PrivateRoute>
              <AuthorizationGuard />
            </PrivateRoute>
          )}
        />
        <Route path={APP_ROUTES.NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
