import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import { PROSPECT_CLIENTS_STATUS } from '../../constants';

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

const ProspectClientsTable: React.FC<Iprops> = ({
  tableData,
  isPagination,
  paginationConfig,
}) => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      className: 'link',
      render: (text, { key }) => (
        <Link to={`${appRoutes.PROSPECT_CLIENT_DETAILS}/${key}`}>{text}</Link>
      ),
    },
    {
      title: 'Reminder',
      dataIndex: 'reminderDate',
      key: 'reminderDate',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Assign To',
      key: 'personAssigned',
      dataIndex: 'personAssigned',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <p>
          {PROSPECT_CLIENTS_STATUS.find(
            (status) => status.value === text,
          )?.label?.replace('Status: ', '')}
        </p>
      ),
    },
    {
      title: '',
      key: 'action',
      className: 'text-center',
      render: ({ key }) => (
        <Button
          className='details-btn'
          onClick={() => navigate(`${appRoutes.PROSPECT_CLIENT_DETAILS}/${key}`)}
        >
          View Details
        </Button>
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

export default ProspectClientsTable;
