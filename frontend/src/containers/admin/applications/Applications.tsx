import React, { FC, useEffect } from 'react';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import { useGetApplicationList } from '../../../services/applications/applicationsService';
import ApplicationsWrapper from '../../../components/candidate/applicationsWrapper';
import { PAGE_NO, PAGE_SIZE, USER_ROLE } from '../../../constants';
import usePagination from '../../../hooks/usePagination';

const Applications: FC = () => {
  const { pagination, paginationConfig, setTotal } = usePagination({
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
  });

  const { loading, applications, total } = useGetApplicationList(pagination);

  useEffect(() => {
    if (total) {
      setTotal(total);
    }
  }, [total]);

  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>Applications</h1>
        </div>
        {!loading && total > 0 ? (
          <ApplicationsWrapper
            data={applications}
            isCandidate={false}
            role={USER_ROLE.ADMIN}
            isPagination
            paginationConfig={paginationConfig}
          />
        ) : 'No Applications submitted by any candidates.'}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Applications;
