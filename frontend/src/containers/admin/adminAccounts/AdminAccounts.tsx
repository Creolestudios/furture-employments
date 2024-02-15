import React, { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import UpdateCVWrapper from '../../../components/updateCV/index.styles';
import AdminAccountsTable from '../../../components/adminTables/AdminAccountsTable';
import appRoutes from '../../../constants/appRoutes';
import { useGetAdminList } from '../../../services/admin/adminService';
import usePagination from '../../../hooks/usePagination';
import { PAGE_SIZE_20 } from '../../../constants';

const AdminAccounts: FC = () => {
  const navigate = useNavigate();
  const { pagination, paginationConfig } = usePagination({
    pageSize: PAGE_SIZE_20,
  });
  const { adminList, loading } = useGetAdminList({
    searchParams: {
      current: pagination.current,
      pageSize: pagination.pageSize,
    },
  });

  return (
    <AppLayout>
      <FormPageWrapper>
        <UpdateCVWrapper>
          <div className='page-header'>
            <h1>Admin Accounts</h1>
          </div>
          <Button
            type='primary'
            htmlType='submit'
            style={{ backgroundColor: '#6cb33f', marginBottom: '20px' }}
            onClick={() => navigate(appRoutes.NEW_ADMIN)}
          >
            New Admin
          </Button>
          {!loading && adminList.length > 0 && (
            <AdminAccountsTable
              data={adminList}
              paginationConfig={paginationConfig}
            />
          )}
        </UpdateCVWrapper>
      </FormPageWrapper>
    </AppLayout>
  );
};

export default AdminAccounts;
