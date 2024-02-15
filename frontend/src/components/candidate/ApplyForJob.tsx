import React, { useState, useEffect, FC } from 'react';
import { Button, Popover, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import { useCreateApplication } from '../../services/admin/adminService';
import Notification from '../common/Notification';
import { CANDIDATE_APPLICATIONS } from '../../graphql/queries/applicationQueries';
import ModalWrapper from '../common/modalWrapper';
import { Colors } from '../../styles/variable';
interface DataType {
  key: string;
  position: string;
  applications: any;
  date_submitted: string;
  status: string;
}

const ApplyForJob: FC<any> = ({ applyData, userId, paginationConfig }) => {
  const navigate = useNavigate();
  const { createApplication } = useCreateApplication();
  const [confirmModal, setConfirmModal] = useState<any>(false);
  const [applyId, setApplyId] = useState<any>();

  const tagsRender = (tag: any) => {
    let color;
    if (tag === 'Applied') {
      color = '#3a87ad';
    } else {
      color = '#999999';
    }
    return (
      <Tag color={color} key={tag}>
        <span style={{ fontWeight: 'bold' }}> {tag}</span>
      </Tag>
    );
  };
  const handleApply = async (id: any) => {
    await createApplication({
      variables: { vacancyId: id, userId },
      refetchQueries: [CANDIDATE_APPLICATIONS],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.createApplication?.message,
        });
        navigate(
          `${appRoutes.APPLICATION_DETAILS}/${res?.data?.createApplication?.id}`
        );
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      className: 'link',
      render: (text: any, { id }: any) => (
        <Link to={`${appRoutes.VACANCY_DETAILS}/${id}`}>{text}</Link>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      className: 'status',
      dataIndex: 'status',
      render: (_, { status }) => tagsRender(status),
    },
    {
      title: '',
      key: 'action',
      render: (_, { status, key }) =>
        status !== 'Applied' && (
          <Button
            className='success-btn'
            onClick={() => {
              setConfirmModal(true);
              setApplyId(key);
            }}
          >
            Apply
          </Button>
        ),
    },
  ];

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={applyData}
        scroll={{ x: 500 }}
        bordered
        pagination={false}
        className='apply-table'
      />
      <ModalWrapper
        title='Apply To Job'
        isOpen={confirmModal}
        onCancel={() => setConfirmModal(false)}
        onOk={() => setConfirmModal(false)}
        moduleClass='campaign-module'
        footer={[
          <Button
            key='link'
            type='primary'
            onClick={() => {
              setConfirmModal(false);
            }}
            style={{ backgroundColor: Colors.PANTONE_BLUE_STRONG }}
            className='cancel-btn'
          >
            Cancel
          </Button>,
          <Button
            key='link'
            type='primary'
            onClick={() => handleApply(applyId)}
            style={{ backgroundColor: '#6cb33f' }}
            className='footer-action'
          >
            Apply
          </Button>,
        ]}
      >
        <div>
          Are you sure to apply for current vacancy on the behalf of candidate ?
        </div>
      </ModalWrapper>
    </TableWrapper>
  );
};

export default ApplyForJob;
