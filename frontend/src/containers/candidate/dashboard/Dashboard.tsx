import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import ApplicationsWrapper from '../../../components/candidate/applicationsWrapper';
import APP_ROUTES from '../../../constants/appRoutes';
import { useGetCandidateApplications } from '../../../services/applications/applicationsService';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';
import { PAGINATION, USER_ROLE } from '../../../constants';

import StyledDashboard from './dashboard.styles';

const Dashboard: FC = () => {
  const { applications, loading, error } = useGetCandidateApplications({
    current: PAGINATION.CURRENT,
    pageSize: PAGINATION.PAGE_SIZE,
  });

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error.message });
    }
  }, [error]);

  return (
    <AppLayout>
      <StyledDashboard>
        <h1 className='page-heading'>My Dashboard</h1>
        {loading && <Loader />}

        {!loading && applications && applications.length > 0 && (
          <div>
            <h2 className='page-sub-heading'>Recent Applications</h2>
            <ApplicationsWrapper
              isCandidate
              data={applications}
              role={USER_ROLE.CANDIDATE}
            />
          </div>
        )}

        {applications && applications.length > 0 && (
          <NavLink
            to={APP_ROUTES.APPLICATIONS}
            className='view-all-applications'
          >
            View all Applications
          </NavLink>
        )}
      </StyledDashboard>
    </AppLayout>
  );
};

export default Dashboard;
