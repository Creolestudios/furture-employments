import React from 'react';
import {
  Button, Popover, Table, Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLocation, useNavigate } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import GetWindowDimensions from '../../utils/useWindowDimension';
import { getApplicationStatus } from '../../utils/getApplicationStatus';
// import { IApplication } from '../../interfaces';

interface DataType {
  key: string;
  candidate_name: string;
  position: string;
  recieved_date: string;
  tags: string[];
  status: number;

  // data: IApplication[];
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

const ApplicationsListTable = ({ newData }: any) => {
  const navigate = useNavigate();
  const path = useLocation();
  const size = GetWindowDimensions();
  // const [newData, setNewData] = useState<any>([]);
  const columns: ColumnsType<DataType> = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
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
      dataIndex: 'createdAt',
      className: 'date',
      key: 'createdAt',
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
  // useEffect(() => {
  //   if (path.pathname === appRoutes.DASHBOARD) {
  //     setNewData(applications.splice(0, 5));
  //   } else {
  //     setNewData(applications);
  //   }
  // }, [applications]);
  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={newData}
        // pagination={paginationConfig ?? false}
        bordered
        scroll={{ x: 500 }}
      />
    </TableWrapper>
  );
};

export default ApplicationsListTable;
