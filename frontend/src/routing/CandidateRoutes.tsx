import React, {
  FC, Suspense, useEffect, useState,
} from 'react';
import {
  Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import Loader from '../components/common/loader';
import APP_ROUTES from '../constants/appRoutes';
import ModalWrapper from '../components/common/modalWrapper';
import cmsRoutes from '../constants/cmsRoutes';
import { PAGINATION } from '../constants';
import { useGetCandidateApplications } from '../services/applications/applicationsService';

// All the candidate routes imported here which can only accessible when candidate logged in
const CandidaterDashboard = React.lazy(
  () => import('../containers/candidate/dashboard/Dashboard'),
);
const Applications = React.lazy(
  () => import('../containers/candidate/applications/Applications'),
);
const Profile = React.lazy(
  () => import('../containers/candidate/profile/Profile'),
);
const CV = React.lazy(() => import('../containers/candidate/cv/Cv'));
const JobPreferences = React.lazy(
  () => import('../containers/candidate/jobPreferences/JobPreferences'),
);
const PageNotFound = React.lazy(() => import('../containers/404'));
const ApplicationDetails = React.lazy(
  () => import('../containers/candidate/applicationDetails/ApplicationDetails'),
);

// Routes when user logged in is candidate.
const CandidateRoutes: FC = () => {
  const [modalOpen, setModalOpen] = useState<any>(false);
  const { applications } = useGetCandidateApplications({
    current: PAGINATION.CURRENT,
    pageSize: PAGINATION.PAGE_SIZE,
  });

  useEffect(() => {
    if (applications && applications.length === 0) {
      setModalOpen(true);
    }
  }, [applications]);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={APP_ROUTES.DASHBOARD} element={<Outlet />}>
          <Route index element={<CandidaterDashboard />} />
          <Route path={APP_ROUTES.APPLICATIONS} element={<Outlet />}>
            <Route index element={<Applications />} />
            <Route
              path={`${APP_ROUTES.DETAILS}/:applicationId`}
              element={<ApplicationDetails />}
            />
          </Route>
          <Route path={APP_ROUTES.PROFILE} element={<Outlet />}>
            <Route index element={<Profile />} />
            <Route path={APP_ROUTES.CV} element={<CV />} />
            <Route path={APP_ROUTES.PREFERENCES} element={<JobPreferences />} />
          </Route>
          <Route path={APP_ROUTES.NOT_FOUND} element={<PageNotFound />} />
        </Route>
        <Route
          path={APP_ROUTES.NOT_FOUND}
          element={<Navigate to={APP_ROUTES.DASHBOARD} />}
        />
      </Routes>
      <ModalWrapper
        title=''
        isOpen={modalOpen}
        onCancel={() => false}
        onOk={() => false}
        moduleClass='campaign-module apply-modal'
        // style={{ top: 10 }}
        closable={false}
      >
        <div className='apply-link'>
          You&apos;ve not applied for any jobs yet. Why not look for one&nbsp;
          <div
            onClick={() => {
              window.location.href = cmsRoutes.ALL_JOBS;
            }}
            onKeyDown={() => {
              window.location.href = cmsRoutes.ALL_JOBS;
            }}
            style={{ color: '#6cb33f', cursor: 'pointer' }}
            tabIndex={0}
            role='button'
          >
            here
          </div>
        </div>
      </ModalWrapper>
    </Suspense>
  );
};

export default CandidateRoutes;
