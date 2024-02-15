import React, { FC, useEffect } from 'react';
import AppLayout from '../../../components/layout';
import ApplicationsWrapper from '../../../components/candidate/applicationsWrapper';
import usePagination from '../../../hooks/usePagination';
import { useGetCandidateApplications } from '../../../services/applications/applicationsService';
import { IGetApplicationsQuery } from '../../../interfaces';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';
import { USER_ROLE } from '../../../constants';
import cmsRoutes from '../../../constants/cmsRoutes';

const Applications: FC = () => {
  const { pagination, paginationConfig, setTotal } = usePagination({
    pageSize: 10,
  });
  const {
    applications, total, loading, error,
  }: IGetApplicationsQuery = useGetCandidateApplications(pagination);

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error.message });
    }
    setTotal(total);
  }, [error, total, setTotal]);

  return (
    <AppLayout>
      <h1 className='page-heading'>Job Applications</h1>
      {loading && <Loader />}

      {!loading && applications && applications.length > 0 ? (
        <ApplicationsWrapper
          isPagination
          isCandidate
          data={applications}
          paginationConfig={paginationConfig}
          role={USER_ROLE.CANDIDATE}
        />
      ) : (
        <div style={{ display: 'flex' }}>
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
      )}
    </AppLayout>
  );
};

export default Applications;
