import React from 'react';
import AppLayout from '../../../components/layout';
import ApplicationsTable from '../../../components/applicationsTable';
import FormPageWrapper from '../../../styles/formContainer';
import usePagination from '../../../hooks/usePagination';
import { useApplicationsPerEmployer } from '../../../services/vacancies/vacancyService';
import Loader from '../../../components/common/loader';

const Applications = () => {
  const { pagination, paginationConfig } = usePagination({
    pageSize: 10,
  });
  const { applications, loading } = useApplicationsPerEmployer(pagination);
  return (
    <AppLayout>
      <FormPageWrapper>
        <h1>Applications</h1>
        {!loading && applications.length !== 0 ? (
          <ApplicationsTable
            applications={applications}
            paginationConfig={paginationConfig}
          />
        ) : (
          <div>No applications have been submitted.</div>
        )}
        {loading && <Loader />}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Applications;
