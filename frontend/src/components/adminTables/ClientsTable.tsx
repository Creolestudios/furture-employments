import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';

interface DataType {
  key: string;
  client_name: string;
  contact_name: string;
  email: string;
  registered_date: string;
  phone_number: string;
}

interface Iprops {
  tableData: DataType[];
  isPagination: boolean;
  paginationConfig: TablePaginationConfig;
}

const ClientsTable: React.FC<Iprops> = ({
  tableData,
  isPagination,
  paginationConfig,
}) => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Client Name',
      dataIndex: 'companyName',
      key: 'companyName',
      className: 'link',
      render: (text, { key }) => (
        <Link to={`${appRoutes.CLIENT_DETAILS}/${key}`}>{text}</Link>
      ),
    },
    {
      title: 'Contact Name',
      dataIndex: 'contactName',
      key: 'contactName',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Telephone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date Registered',
      dataIndex: 'createdAt',
      className: 'date text-center',
      key: 'createdAt',
    },
    {
      title: '',
      key: 'action',
      className: 'text-center',
      render: ({ key }) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button
            className='details-btn edit-btn'
            onClick={() => navigate(`${appRoutes.CLIENT_EDIT}/${key}`)}
          >
            Edit Client
          </Button>
          <Button
            className='details-btn'
            onClick={() => navigate(`${appRoutes.CLIENT_DETAILS}/${key}`)}
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={isPagination ? paginationConfig : isPagination}
        scroll={{ x: 500 }}
        className='client-table'
      />
    </TableWrapper>
  );
};

export default ClientsTable;
