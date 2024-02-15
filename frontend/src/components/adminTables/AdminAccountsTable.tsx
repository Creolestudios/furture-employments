import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';

interface DataType {
  key: string;
  name: string;
  email: string;
  roles: string;
}
// Show the list of all admins
const AdminAccountsTable: React.FC<any> = ({ data, paginationConfig }) => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Roles',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <p>{text}</p>,
    },
    {
      title: '',
      key: 'action',
      className: 'text-center',
      render: (admin) => (
        <Button
          className='details-btn'
          onClick={() => navigate(`${appRoutes.EDIT_ADMIN}/${admin.id}`)}
        >
          Edit Details
        </Button>
      ),
    },
  ];

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        pagination={paginationConfig ?? false}
        bordered
      />
    </TableWrapper>
  );
};

export default AdminAccountsTable;
