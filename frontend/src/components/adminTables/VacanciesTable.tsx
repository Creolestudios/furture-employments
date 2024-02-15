import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import TableWrapper from '../../styles/table-wrapper';
import { tagsRender } from '../tag';
import appRoutes from '../../constants/appRoutes';
import { filterVacancyStatus } from '../../utils/filterStatus';
import StatusTagWithPopover from '../vacancyStatus/VacancyStatus';
import { getApplicationCount } from '../../utils';

interface DataType {
  key: string;
  client_name: string;
  position: string;
  applications: string;
  submitted_date: string;
  tags: string[];
}

const VacanciesTable: React.FC<any> = ({ data }) => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Client Name',
      dataIndex: 'client_name',
      key: 'client_name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date Submitted',
      dataIndex: 'submitted_date',
      className: 'date',
      key: 'submitted_date',
    },
    {
      title: 'Applications',
      key: 'applications',
      dataIndex: 'applications',
      render: (text) => <p>{tagsRender(text)}</p>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      className: 'status',
      render: (_, { tags }) => tags?.map((tag) => <StatusTagWithPopover tag={tag} />),
    },
    {
      title: '',
      key: 'action',
      render: ({ key }) => (
        <Button
          className='details-btn'
          onClick={() => navigate(`${appRoutes.VACANCY_DETAILS}/${key}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const newData: DataType[] = data?.employersAllVacancies?.data?.map(
    (item: any) => ({
      key: item.id,
      client_name: item.employer.companyName,
      position: item.position,
      applications: getApplicationCount(item.applicationCount),
      submitted_date: moment(item.createdAt).format('DD/MM/YYYY'),
      tags: [filterVacancyStatus(item.status)],
    }),
  );
  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={newData}
        scroll={{ x: 500 }}
        bordered
      />
    </TableWrapper>
  );
};

export default VacanciesTable;
