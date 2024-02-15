import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetApplicationListAdminside } from '../../../services/applications/applicationsService';
import { PAGE_NO, PAGE_SIZE, USER_ROLE } from '../../../constants';
import usePagination from '../../../hooks/usePagination';
import ApplicationsListTable from '../../../components/applicationListTable.tsx';
import ApplicationDetailWrapper from '../../../components/applicationDetails/ApplicationDetail.styles';
import { useCandidateDetailForAdmin } from '../../../services/admin/adminService';

const ApplicationsList: FC = () => {
  const { id } = useParams();
  const { pagination, paginationConfig, setTotal } = usePagination({
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
  });
  // const [userId, setUserId] = useState<number | undefined>(dataId);

  // useEffect(() => {
  //   // When dataId changes, update userId
  //   setUserId(dataId);
  // }, [dataId]);

  const { data } = useCandidateDetailForAdmin(Number(id));
  const userId = data?.id;
  const { loading, applications, total } = useGetApplicationListAdminside({
    current: pagination.current,
    pageSize: pagination.pageSize,
    userId,
  });

  useEffect(() => {
    if (total) {
      setTotal(total);
    }
  }, [total]);

  return (
    <ApplicationDetailWrapper>
      <div>
        <h1>Applications</h1>
      </div>
      {!loading && (
        <ApplicationsListTable
          newData={applications}
          role={USER_ROLE.ADMIN}
          isPagination
          paginationConfig={paginationConfig}
        />
      )}
    </ApplicationDetailWrapper>
  );
};

export default ApplicationsList;
