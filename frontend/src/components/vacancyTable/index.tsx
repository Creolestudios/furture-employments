import React, { useState, useEffect } from 'react';
import {
  Button, Popover, Table, Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { USER_ROLE, USER_ROLE_KEY, VACANCY_STATUS } from '../../constants';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import GetWindowDimensions from '../../utils/useWindowDimension';

interface DataType {
  key: string;
  position: string;
  applications: any;
  date_submitted: string;
  status: number[];
}

const VacancyTable = ({ vacancyListData, paginationConfig }: any) => {
  const navigate = useNavigate();
  const size = GetWindowDimensions();
  const path = useLocation();

  const [newData, setNewData] = useState<any>([]);

  const tagsRender = (tag: any) => {
    let color;
    if (typeof tag === 'number') {
      color = '#3a87ad';
    } else {
      color = '#999999';
    }
    return (
      <Tag color={color} key={tag}>
        <span style={{ fontWeight: 'bold' }}>
          {' '}
          {tag}
        </span>
      </Tag>
    );
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Applications',
      dataIndex: 'applications',
      key: 'applications',
      className: 'application-tag',
      render: (_, { applications }) => <>{tagsRender(applications)}</>,
    },
    {
      title: 'Status',
      key: 'status',
      className: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            const popOver: any = VACANCY_STATUS.filter(
              (item: any) => item.status === tag,
            );
            return (
              <Popover
                className='status-popover'
                placement={size.width > 425 ? 'left' : 'top'}
                title={popOver[0].name}
                content={popOver[0].desc}
              >
                <Tag color={popOver[0].color} key={tag}>
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    {popOver[0].name}
                  </span>
                </Tag>
              </Popover>
            );
          })}
        </>
      ),
    },
    {
      title: 'Date Submitted',
      dataIndex: 'date_submitted',
      key: 'date_submitted',
      className: 'date',
    },
    {
      title: '',
      key: 'action',
      render: (el: any) => (
        <Button
          className='details-btn'
          onClick={() => {
            navigate(`${appRoutes.VACANCY_DETAILS}/${el.id}`);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const array: any = [];
    if (vacancyListData?.employersAllVacancies?.data.length > 0) {
      vacancyListData?.employersAllVacancies?.data?.forEach((item: any) => {
        let applicationCount = 0;
        if (
          Number(sessionStorage.getItem(USER_ROLE_KEY)) === USER_ROLE.EMPLOYER
        ) {
          applicationCount = item.applications?.filter(
            (item: any) => item.status !== 1,
          ).length;
        }
        const value = {
          position: item.position,
          applications: applicationCount !== 0 ? applicationCount : 'N/A',
          status: [item.status],
          date_submitted: moment(item.createdAt).format('DD/MM/YYYY'),
          id: item.id,
        };
        array.push(value);
      });
    }
    const sortedData = array.sort((a: any, b: any) => {
      const dateA: any = new Date(
        a.date_submitted.split('/').reverse().join('-'),
      );
      const dateB: any = new Date(
        b.date_submitted.split('/').reverse().join('-'),
      );
      return dateB - dateA;
    });
    if (path.pathname === appRoutes.DASHBOARD) {
      setNewData(sortedData.splice(0, 5));
    } else {
      setNewData(sortedData);
    }
  }, [vacancyListData]);

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={newData}
        scroll={{ x: 500 }}
        bordered
        pagination={paginationConfig ?? false}
      />
    </TableWrapper>
  );
};

export default VacancyTable;
