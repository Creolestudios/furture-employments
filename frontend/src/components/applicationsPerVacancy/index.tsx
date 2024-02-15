import React, { useEffect, useState } from 'react';
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
  key: string;
  candidate_name: string;
  position: string;
  applied_date: string;
  tags: string[];
}

const ApplicationsPerVacancy = ({
  applicationData,
  payload,
  setPayload,
  totalPages,
}: any) => {
  const navigate = useNavigate();
  const size = GetWindowDimensions();
  const [pagination, setPagination] = useState<any>({
    current: payload.pageNo,
    pageSize: payload.pageSize,
    total: totalPages,
  });
  const handlePageChange = (pagination: any) => {
    setPayload({ ...payload, current: pagination.current });
  };
  useEffect(() => {
    if (totalPages === 0) {
      setPagination(false);
    } else if (totalPages) {
      setPagination({
        ...pagination,
        current: payload.pageNo,
        total: totalPages,
      });
    }
  }, [totalPages]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Applicant Name',
      dataIndex: 'candidate_name',
      key: 'candidate_name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date Applied',
      dataIndex: 'applied_date',
      className: 'date',
      key: 'applied_date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      className: 'status',
      render: (_, { status }: any) => {
        const popOver: any = getApplicationStatus(status);
        return (
          <Popover
            className='status-popover'
            placement={size.width > 425 ? 'left' : 'top'}
            title={popOver?.name}
            content={popOver?.desc}
          >
            <Tag color={popOver?.color}>
              <span style={{ fontWeight: 'bold' }}>
                {' '}
                {popOver?.name}
              </span>
            </Tag>
          </Popover>
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: (element) => (
        <Button
          className='details-btn'
          onClick={() => navigate(
            `${appRoutes.APPLICATION_DETAILS}/${element.applicationId}`,
          )}
        >
          View Details
        </Button>
      ),
    },
  ];
  return (
    <TableWrapper>
      <h4>New Applications</h4>
      <Table
        columns={columns}
        dataSource={applicationData}
        pagination={pagination}
        scroll={{ x: 500 }}
        onChange={handlePageChange}
        bordered
      />
    </TableWrapper>
  );
};

export default ApplicationsPerVacancy;
