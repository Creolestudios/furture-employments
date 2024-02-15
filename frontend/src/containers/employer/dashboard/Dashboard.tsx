import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AppLayout from '../../../components/layout';
import ApplicationsTable from '../../../components/applicationsTable';
import VacancyTable from '../../../components/vacancyTable';
import FormPageWrapper from '../../../styles/formContainer';
import appRoutes from '../../../constants/appRoutes';
import usePagination from '../../../hooks/usePagination';
import { useApplicationsPerEmployer } from '../../../services/vacancies/vacancyService';
import { vacancyListQuery } from '../../../graphql/queries/employer';
import { USER_NAME } from '../../../graphql/queries/users/UserQueries';
import Loader from '../../../components/common/loader';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { data: userData } = useQuery(USER_NAME);
  const { pagination } = usePagination({
    pageSize: 5,
  });
  const user = userData?.getUserDetails;
  const { applications, loading } = useApplicationsPerEmployer(pagination);
  const { data: vacancyListData, loading: vacancyLoading } = useQuery(vacancyListQuery, {
    variables: {
      userId: user?.id,
      searchParams: {
        query: '',
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    },
  });
  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>My Dashboard</h1>
        </div>
        {loading && <Loader />}
        {!loading && applications.length !== 0 && (
          <div>
            <h2 className='sub-heading'>New Applications</h2>
            <ApplicationsTable applications={applications} />
            <div
              className='view-all'
              onClick={() => navigate(appRoutes.USER_APPLICATIONS)}
              onKeyDown={() => navigate(appRoutes.USER_APPLICATIONS)}
              role='button'
              tabIndex={0}
            >
              View all applications
            </div>
          </div>
        )}
        {!vacancyLoading
          && vacancyListData?.employersAllVacancies?.data.length !== 0 && (
            <div>
              <h2 className='sub-heading'>Latest Vacancies</h2>
              <VacancyTable
                userData={userData}
                vacancyListData={vacancyListData}
              />
              <div
                className='view-all'
                onClick={() => navigate(appRoutes.VACANCIES)}
                onKeyDown={() => navigate(appRoutes.VACANCIES)}
                role='button'
                tabIndex={0}
              >
                View all vacancies
              </div>
            </div>
        )}
        {!loading
          && applications.length === 0
          && !vacancyLoading
          && vacancyListData?.employersAllVacancies?.data.length === 0 && (
            <div className='no-data-msg'>
              You&apos;ve not submitted any vacancies yet to get any application.&nbsp;
              <div
                onClick={() => navigate(appRoutes.SUBMIT_VACANCY)}
                onKeyDown={() => navigate(appRoutes.SUBMIT_VACANCY)}
                style={{ color: '#6cb33f', cursor: 'pointer' }}
                tabIndex={0}
                role='button'
              >
                Click here
              </div>
              <span>&nbsp; to submit one.</span>
            </div>
        )}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Dashboard;
