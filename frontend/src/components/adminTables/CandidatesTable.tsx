import React, { useEffect, useState } from 'react';
import {
  Button, Form, Table, Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useNavigate, useParams } from 'react-router-dom';

import TableWrapper from '../../styles/table-wrapper';
import appRoutes from '../../constants/appRoutes';
import { useInviteCandidates } from '../../services/admin/adminService';
import { getErrorResponse, getSuccessResponse } from '../../utils';
import CommonEditorField from '../common/formElements/CommonEditorField';

interface DataType {
  key: string;
  candidate_name: string;
  location: string;
  desired_salary: string;
  email: string;
  phone_number: string;
  postcode: string;
  registered_date: string;
  applied: boolean;
}

const CandidatesTable: React.FC<any> = ({
  data,
  paginationConfig,
  isPagination,
  invite,
}) => {
  const navigate = useNavigate();
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
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      className: 'link',
      render: (text, record) => (
        <Link
          to={`http://maps.google.co.uk/?q=${record.postcode}`}
          target='_blank'
        >
          <p>{text}</p>
        </Link>
      ),
    },
    {
      title: 'Desired Salary',
      dataIndex: 'desired_salary',
      key: 'desired_salary',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Tel.',
      key: 'phone_number',
      dataIndex: 'phone_number',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Registered',
      dataIndex: 'registered_date',
      className: 'date',
      key: 'registered_date',
    },
  ];
  const actionColumn: ColumnsType<DataType> = [
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <div
          className='details-btn link'
          onClick={() => navigate(`${appRoutes.CANDIDATES_EDIT}/${record.key}`)}
          onKeyDown={() => navigate(`${appRoutes.CANDIDATES_EDIT}/${record.key}`)}
          role='button'
          tabIndex={0}
        >
          Edit
        </div>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [form] = Form.useForm();
  const { inviteCandidates } = useInviteCandidates();
  const { id } = useParams();
  const onSelectChange = (newSelectedRowKeys: any, e: any) => {
    const emailArray = e.map((item: any) => item.email);
    setSelectedRowKeys(newSelectedRowKeys);
    setEmails(emailArray);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: DataType) => ({
      disabled: record.applied === true,
    }),
    renderCell(checked: any, record: any, index: any, node: any) {
      if (record.applied) {
        return <Tooltip title='Already applied'>{node}</Tooltip>;
      }
      return node;
    },
  };

  const handleInvite = () => {
    inviteCandidates({
      variables: {
        candidates: {
          candidates: emails,
          id: Number(id),
          inviteMessage: form.getFieldValue('inviteMsg'),
        },
      },
    })
      .then((res) => {
        getSuccessResponse(res?.data?.inviteCandidates?.message);
        setSelectedRowKeys([]);
      })
      .catch((error) => getErrorResponse(error?.message));
  };
  useEffect(() => {
    form.setFieldValue(
      'inviteMsg',
      'Please find below link to the new job that we find suitable for you. \n\n{replace this text to add any additional message to the candidates}',
    );
  }, []);

  return (
    <TableWrapper>
      <Table
        columns={invite ? columns : columns.concat(actionColumn)}
        dataSource={data}
        scroll={{ x: 1100 }}
        bordered
        pagination={isPagination ? paginationConfig : isPagination}
        rowSelection={invite && rowSelection}
      />
      {invite && selectedRowKeys.length !== 0 && (
        <>
          <Form form={form} className='inviteForm'>
            <CommonEditorField name='inviteMsg' height={200} />
          </Form>
          <div className='succes-btn'>
            <Button onClick={handleInvite}>Invite Candidates</Button>
            <span style={{ marginLeft: '20px' }}>
              Invite candidates to apply current vacancy
            </span>
          </div>
        </>
      )}
    </TableWrapper>
  );
};

export default CandidatesTable;
