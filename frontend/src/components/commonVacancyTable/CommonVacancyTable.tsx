import React, { FC } from 'react';
import { Button, Table, TablePaginationConfig } from 'antd';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import TableWrapper from '../../styles/table-wrapper';
import COMMON_VACANCY from '../../constants/components/commonVacancy';
import { USER_ROLE } from '../../constants';
import appRoutes from '../../constants/appRoutes';
import StatusTagWithPopover from '../vacancyStatus/VacancyStatus';
import { filterVacancyStatus } from '../../utils/filterStatus';
import { tagsRender } from '../tag';

interface IProps {
  isPagination?: boolean;
  data: any;
  paginationConfig?: TablePaginationConfig;
  role: number;
  isDashboard?: boolean;
  className?: string;
}
const getColumns = (
  role: number,
  navigate: NavigateFunction,
  isDashboard?: boolean,
) => {
  const baseColumns: ColumnsType<any> = [
    {
      title: COMMON_VACANCY.POSITION.TITLE,
      dataIndex: COMMON_VACANCY.POSITION.DATA_INDEX,
      key: COMMON_VACANCY.POSITION.DATA_INDEX,
      className: 'link',
      render: (text: any, { id }: any) => (
        <Link to={`${appRoutes.VACANCY_DETAILS}/${id}`}>{text}</Link>
      ),
    },
    {
      title: COMMON_VACANCY.DATE_SUBMITTED.TITLE,
      dataIndex: COMMON_VACANCY.DATE_SUBMITTED.DATA_INDEX,
      key: COMMON_VACANCY.DATE_SUBMITTED.DATA_INDEX,
      className: 'text-center',
    },
  ];

  const OTHER_COLUMN = {
    CANDIDATE_NAME: {
      title: COMMON_VACANCY.CANDIDATE_NAME.TITLE,
      dataIndex: COMMON_VACANCY.CANDIDATE_NAME.DATA_INDEX,
      key: COMMON_VACANCY.CANDIDATE_NAME.DATA_INDEX,
    },
    CLIENT_NAME: {
      title: COMMON_VACANCY.CLIENT_NAME.TITLE,
      dataIndex: COMMON_VACANCY.CLIENT_NAME.DATA_INDEX,
      key: COMMON_VACANCY.CLIENT_NAME.DATA_INDEX,
      className: 'link',
      render: (text: any, { employerId }: any) => (
        <Link to={`${appRoutes.CLIENT_DETAILS}/${employerId}`}>{text}</Link>
      ),
    },
    APPLICATIONS: {
      title: COMMON_VACANCY.APPLICATIONS.TITLE,
      dataIndex: COMMON_VACANCY.APPLICATIONS.DATA_INDEX,
      key: COMMON_VACANCY.APPLICATIONS.DATA_INDEX,
      render: (applications: any) => <>{tagsRender(applications)}</>,
      className: 'text-center',
    },
    STATUS: {
      title: COMMON_VACANCY.STATUS.TITLE,
      dataIndex: COMMON_VACANCY.STATUS.DATA_INDEX,
      key: COMMON_VACANCY.STATUS.DATA_INDEX,
      className: 'text-center',
      render: (record: any) => (
        <StatusTagWithPopover tag={filterVacancyStatus(record)} />
      ),
    },
  };

  const actionColumn = {
    title: COMMON_VACANCY.ACTION.TITLE,
    key: COMMON_VACANCY.ACTION.KEY,
    className: 'text-center',
    render: (record: any) => (
      <Button
        className='details-btn'
        onClick={() => navigate(`${appRoutes.VACANCY_DETAILS}/${record.id}`)}
      >
        View Details
      </Button>
    ),
  };

  if (USER_ROLE.ADMIN === role) {
    if (isDashboard) {
      return [OTHER_COLUMN.CLIENT_NAME, ...baseColumns, actionColumn];
    }
    return [
      OTHER_COLUMN.CLIENT_NAME,
      ...baseColumns,
      OTHER_COLUMN.APPLICATIONS,
      OTHER_COLUMN.STATUS,
      actionColumn,
    ];
  }
  return [];
};

const CommonVacancyTable: FC<IProps> = ({
  isPagination,
  data,
  isDashboard,
  paginationConfig,
  role,
  className,
}) => {
  const navigate = useNavigate();
  const handleRowKey = (record: any) => record.id;

  return (
    <TableWrapper className={className}>
      <Table
        columns={getColumns(role, navigate, isDashboard)}
        dataSource={data}
        rowKey={handleRowKey}
        pagination={isPagination ? paginationConfig : isPagination}
        bordered
        scroll={{ x: 500 }}
      />
    </TableWrapper>
  );
};

CommonVacancyTable.defaultProps = {
  isPagination: false,
  paginationConfig: {},
  isDashboard: false,
  className: '',
};

export default CommonVacancyTable;
