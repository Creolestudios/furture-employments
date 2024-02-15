import React, { useEffect, useState } from 'react';
import {
  Button, Popover, Table, Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLocation, useNavigate } from 'react-router-dom';
import { APPLICATION_STATUS } from '../../constants';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import GetWindowDimensions from '../../utils/useWindowDimension';

interface DataType {
  key: string;
  candidate_name: string;
  position: string;
  recieved_date: string;
  tags: string[];
}

// const data: DataType[] = [
//   {
//     key: '1',
//     candidate_name: 'Farm Manager - Poultry Breeder Farm',
//     position: 'Test5',
//     recieved_date: '10/05/2023',
//     tags: ['Unapproved'],
//   },
// ];

const ApplicationsTable = ({ applications, paginationConfig }: any) => {
  const navigate = useNavigate();
  const path = useLocation();
  const size = GetWindowDimensions();
  const [newData, setNewData] = useState<any>([]);
  const columns: ColumnsType<DataType> = [
    {
      title: 'Candidate Name',
      dataIndex: 'candidate_name',
      key: 'candidate_name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date Recieved',
      dataIndex: 'received_date',
      className: 'date',
      key: 'received_date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      className: 'status',
      render: (_, { status }: any) => status?.map((tag: any) => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        const popOver: any = APPLICATION_STATUS.filter(
          (item: any) => item.status === tag,
        );
        if (tag === 1) {
          color = '#f89406';
        }
        if (tag === 2) {
          color = '#999999';
        }
        if (tag === 4) {
          color = '#468847';
        }
        if (tag === 5) {
          color = '#333333';
        }
        return (
          <Popover
            className='status-popover'
            placement={size.width > 425 ? 'left' : 'top'}
            title={popOver[0].name}
            content={popOver[0].desc}
          >
            <Tag color={popOver[0]?.color} key={tag}>
              <span style={{ fontWeight: 'bold' }}>
                {' '}
                {popOver[0].name}
              </span>
            </Tag>
          </Popover>
        );
      }),
    },
    {
      title: '',
      key: 'action',
      render: (element: any) => (
        <Button
          className='details-btn'
          onClick={() => navigate(`${appRoutes.APPLICATION_DETAILS}/${element.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];
  useEffect(() => {
    if (path.pathname === appRoutes.DASHBOARD) {
      setNewData(applications.splice(0, 5));
    } else {
      setNewData(applications);
    }
  }, [applications]);

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={newData}
        pagination={paginationConfig ?? false}
        bordered
        scroll={{ x: 500 }}
      />
    </TableWrapper>
  );
};

export default ApplicationsTable;
