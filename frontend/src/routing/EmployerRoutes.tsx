import React, { FC, Suspense } from 'react';
import {
  Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import ApplicationDetails from '../containers/employer/applications/Details';
import VacancyDetails from '../containers/employer/vacancies/Details';
import Loader from '../components/common/loader';
import APP_ROUTES from '../constants/appRoutes';
// All the admin routes imported here which can only accessible when admin logged in
const EmployerDashboard = React.lazy(
  () => import('../containers/employer/dashboard/Dashboard'),
);
const NewVacancy = React.lazy(
  () => import('../containers/employer/newVacancy/NewVacancy'),
);
const Vacancies = React.lazy(
  () => import('../containers/employer/vacancies/Vacancies'),
);
const Applications = React.lazy(
  () => import('../containers/employer/applications/Applications'),
);
const Profile = React.lazy(
  () => import('../containers/employer/profile/UpdateProfile'),
);
const CvDownload = React.lazy(
  () => import('../containers/admin/candidates/pdf/CvDownload'),
);
const PageNotFound = React.lazy(() => import('../containers/404'));

// Routes when user logged in is client.

const EmployerRoutes: FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={APP_ROUTES.DASHBOARD} element={<Outlet />}>
        <Route index element={<EmployerDashboard />} />
        <Route path='vacancies' element={<Vacancies />} />
        <Route path='vacancies'>
          <Route index path='submit' element={<NewVacancy />} />
          <Route index path='update/:id' element={<NewVacancy />} />
          <Route index path='details/:id' element={<VacancyDetails />} />
        </Route>
        <Route path='applications' element={<Applications />} />
        <Route path='applications'>
          <Route index path='details/:id' element={<ApplicationDetails />} />
          <Route path=':id/cv/:candidateId/:hide' element={<CvDownload />} />
        </Route>
        <Route path='profile' element={<Profile />} />
        <Route path={APP_ROUTES.NOT_FOUND} element={<PageNotFound />} />
      </Route>
      <Route
        path={APP_ROUTES.NOT_FOUND}
        element={<Navigate to={APP_ROUTES.DASHBOARD} />}
      />
    </Routes>
  </Suspense>
);

export default EmployerRoutes;
