import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import VacancyTable from '../../../components/vacancyTable';
import FormPageWrapper from '../../../styles/formContainer';
import { USER_NAME } from '../../../graphql/queries/users/UserQueries';
import { vacancyListQuery } from '../../../graphql/queries/employer';
import usePagination from '../../../hooks/usePagination';
import Loader from '../../../components/common/loader';
import appRoutes from '../../../constants/appRoutes';

const Vacancies: FC = () => {
  const { data: userData } = useQuery(USER_NAME);
  const navigate = useNavigate();
  const { pagination, paginationConfig } = usePagination({
    pageSize: 10,
  });
  const user = userData?.getUserDetails;
  const { data: vacancyListData, loading } = useQuery(vacancyListQuery, {
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
        <h1>Vacancies</h1>
        {!loading
        && vacancyListData?.employersAllVacancies?.data.length !== 0 ? (
          <VacancyTable
            userData={userData}
            vacancyListData={vacancyListData}
            paginationConfig={paginationConfig}
          />
          ) : (
            <div className='no-data-msg'>
              You&apos;ve not submitted any vacancies yet.&nbsp;
              <div
                onClick={() => navigate(appRoutes.SUBMIT_VACANCY)}
                onKeyDown={() => navigate(appRoutes.SUBMIT_VACANCY)}
                style={{ color: '#6cb33f', cursor: 'pointer' }}
                tabIndex={0}
                role='button'
              >
                Click here
              </div>
            &nbsp; to submit one.
            </div>
          )}
        {loading && <Loader />}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Vacancies;
