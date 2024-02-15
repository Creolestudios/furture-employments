import React, { FC } from 'react';
import { Button, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import ApplicationStatusItem from './ApplicationStatusItem';
import APPLICATION from '../../../constants/components/applications';
import { APPLICATION_STATUS, USER_ROLE } from '../../../constants';
import { IApplicationStatusItem, IApplication } from '../../../interfaces';
import APP_ROUTES from '../../../constants/appRoutes';

import TableWrapper from '../../../styles/table-wrapper';
import StyledApplicationsWrapper from './index.styles';

interface IProps {
  isPagination?: boolean;
  isCandidate: boolean;
  data: IApplication[];
  paginationConfig?: TablePaginationConfig;
  role: number;
  isDashboard?: boolean;
}

const getColumns = (
  isCandidate: boolean,
  role: number,
  navigate: NavigateFunction,
  isDashboard?: boolean,
) => {
  const baseColumns: ColumnsType<IApplication> = [
    {
      title: isCandidate
        ? APPLICATION.COLUMN.JOB_TITLE.CANDIDATE_TITLE
        : APPLICATION.COLUMN.JOB_TITLE.ADMIN_TITLE,
      dataIndex: APPLICATION.COLUMN.JOB_TITLE.DATA_INDEX,
      key: APPLICATION.COLUMN.JOB_TITLE.DATA_INDEX,
      className: !isCandidate ? 'link' : '',
      render: !isCandidate
        ? (text: any, { vacancyId }: any) => (
          <Link to={`${APP_ROUTES.VACANCY_DETAILS}/${vacancyId}`}>
            {text}
          </Link>
        )
        : (text: any) => <p>{text}</p>,
    },
  ];
  const baseColumns2: ColumnsType<IApplication> = [
    {
      title: isCandidate
        ? APPLICATION.COLUMN.APPLIED_DATE.CANDIDATE_TITLE
        : APPLICATION.COLUMN.APPLIED_DATE.ADMIN_TITLE,
      dataIndex: APPLICATION.COLUMN.APPLIED_DATE.DATA_INDEX,
      className: 'text-center',
      key: APPLICATION.COLUMN.APPLIED_DATE.DATA_INDEX,
    },
  ];

  const otherColumn = {
    STATUS: {
      title: APPLICATION.COLUMN.STATUS.TITLE,
      dataIndex: APPLICATION.COLUMN.STATUS.DATA_INDEX,
      key: APPLICATION.COLUMN.STATUS.DATA_INDEX,
      className: 'text-center',
      render: (_: any, { status }: { status: number }) => {
        const applicationStatusItem = APPLICATION_STATUS.find(
          (item: IApplicationStatusItem) => item.status === status,
        );

        return (
          <ApplicationStatusItem
            name={applicationStatusItem?.name}
            content={applicationStatusItem?.desc}
            color={applicationStatusItem?.color}
          />
        );
      },
    },
    CANDIDATE_NAME: {
      title: APPLICATION.COLUMN.CANDIDATE_NAME.TITLE,
      dataIndex: APPLICATION.COLUMN.CANDIDATE_NAME.DATA_INDEX,
      key: APPLICATION.COLUMN.CANDIDATE_NAME.DATA_INDEX,
      className: 'link',
      render: (text: any, { candidateId }: any) => (
        <Link to={`${APP_ROUTES.CANDIDATES_DETAILS}/${candidateId}`}>
          {text}
        </Link>
      ),
    },
    CLIENT_NAME: {
      title: APPLICATION.COLUMN.CLIENT_NAME.TITLE,
      dataIndex: APPLICATION.COLUMN.CLIENT_NAME.DATA_INDEX,
      key: APPLICATION.COLUMN.CLIENT_NAME.DATA_INDEX,
      className: 'link',
      render: (text: any, { employerId }: any) => (
        <Link to={`${APP_ROUTES.CLIENT_DETAILS}/${employerId}`}>{text}</Link>
      ),
    },
  };
  const actionColumn = {
    title: APPLICATION.COLUMN.ACTION.TITLE,
    key: APPLICATION.COLUMN.ACTION.KEY,
    className: 'text-center',
    render: (record: IApplication) => (
      <Button
        className='details-btn'
        onClick={() => navigate(`${APP_ROUTES.APPLICATION_DETAILS}/${record.id}`)}
      >
        View Details
      </Button>
    ),
  };

  if (USER_ROLE.CANDIDATE === role) {
    return [...baseColumns, ...baseColumns2, otherColumn.STATUS, actionColumn];
  }
  if (USER_ROLE.ADMIN === role) {
    if (isDashboard) {
      return [
        otherColumn.CANDIDATE_NAME,
        ...baseColumns,
        otherColumn.CLIENT_NAME,
        ...baseColumns2,
        actionColumn,
      ];
    }
    return [
      otherColumn.CANDIDATE_NAME,
      ...baseColumns,
      otherColumn.CLIENT_NAME,
      ...baseColumns2,
      otherColumn.STATUS,
      actionColumn,
    ];
  }
  return [];
};

const ApplicationsWrapper: FC<IProps> = ({
  isPagination,
  isCandidate,
  data,
  paginationConfig,
  role,
  isDashboard,
}) => {
  const navigate = useNavigate();
  const handleRowKey = (record: IApplication) => record.id;

  return (
    <StyledApplicationsWrapper>
      <TableWrapper>
        <Table
          columns={getColumns(isCandidate, role, navigate, isDashboard)}
          dataSource={data}
          rowKey={handleRowKey}
          pagination={isPagination ? paginationConfig : isPagination}
          bordered
          scroll={{ x: 500 }}
        />
      </TableWrapper>
    </StyledApplicationsWrapper>
  );
};

ApplicationsWrapper.defaultProps = {
  isPagination: false,
  paginationConfig: {},
  isDashboard: false,
};

export default ApplicationsWrapper;
