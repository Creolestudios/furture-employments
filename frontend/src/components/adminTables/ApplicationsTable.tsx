import React from 'react';
import {
  Button, Popover, Table, Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import { getApplicationStatus } from '../../utils/getApplicationStatus';
import GetWindowDimensions from '../../utils/useWindowDimension';

interface DataType {
  key: number;
  client_name: string;
  candidate_name: string;
  position: string;
  recieved_date: string;
  phone_number: string;
  status: number;
}

const ApplicationsTable: React.FC<any> = ({ data }) => {
  const navigate = useNavigate();
  const size = GetWindowDimensions();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Candidate Name',
      dataIndex: 'candidate_name',
      key: 'candidate_name',
      className: 'link',
      render: (text, record) => (
        <div
          className='vacancy-link'
          onClick={() => navigate(`${appRoutes.CANDIDATES_DETAILS}/${record.key}`)}
          onKeyDown={() => navigate(`${appRoutes.CANDIDATES_DETAILS}/${record.key}`)}
          role='button'
          tabIndex={0}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Position',
      key: 'position',
      dataIndex: 'position',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Client',
      dataIndex: 'client_name',
      key: 'client_name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Telephone Number',
      key: 'phone_number',
      dataIndex: 'phone_number',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date Recieved',
      dataIndex: 'recieved_date',
      className: 'date',
      key: 'recieved_date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      className: 'status',
      render: (_, { status }) => {
        const popOver: any = getApplicationStatus(status);
        return (
          <Popover
            className='status-popover'
            placement={size.width > 425 ? 'left' : 'top'}
            title={popOver.name}
            content={popOver.desc}
          >
            <Tag color={popOver.color}>
              <span style={{ fontWeight: 'bold' }}>
                {' '}
                {popOver.name}
              </span>
            </Tag>
          </Popover>
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, { key }) => (
        <Button
          className='details-btn'
          onClick={() => navigate(`${appRoutes.APPLICATION_DETAILS}/${key}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <TableWrapper>
      <Table columns={columns} dataSource={data} scroll={{ x: 500 }} bordered />
    </TableWrapper>
  );
};

export default ApplicationsTable;
