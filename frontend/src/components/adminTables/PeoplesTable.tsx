import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, Form, Table, Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import TableWrapper from '../../styles/table-wrapper';
import { ReactComponent as EditIcon } from '../../assets/images/pencil-alt-solid.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';
import {
  useNewProspectPeople,
  useRemoveProspectPeople,
  useUpdateProspectPeople,
} from '../../services/admin/adminService';
import {
  PROSPECT_CLIENT_DETAILS,
  PROSPECT_CLIENT_TIMELINE,
} from '../../graphql/queries/admin';
import Notification from '../common/Notification';
import ModalWrapper from '../common/modalWrapper';
import InputWrapper from '../common/formElements/inputWrapper';
import { validateEMail, validatePhoneNumber } from '../../utils';
import FORM_VALIDATION_MESSAGE from '../../constants/validationMessage';
import {
  IProspectPeople,
  ProspectPeopleDataType,
} from '../../interfaces/prospectClients';

const PeoplesTable: React.FC<IProspectPeople> = ({
  tableData,
  convertModal,
  setConvertPerson,
  setChangeDetails,
  initialPeopleId,
  changeDetails,
  deleted,
  setDeleted,
  convertPerson,
  status,
}) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState<any>(false);
  const [deleteModal, setDeleteModal] = useState<any>(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [details, setDetails] = useState<any>({});
  const [form] = Form.useForm();
  const { removePeople } = useRemoveProspectPeople();
  const { updateProspectPeople } = useUpdateProspectPeople();
  const { newProspectPerson } = useNewProspectPeople();

  const handleRemovePeople = async (peopleId: any) => {
    await removePeople({
      variables: { peopleId },
      refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.removeProspectPeople?.message,
        });
        sessionStorage.removeItem('deletePeople');
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };
  const columns: ColumnsType<ProspectPeopleDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, { firstName, lastName }) => (
        <p>{`${firstName} ${lastName}`}</p>
      ),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email address',
      key: 'email',
      dataIndex: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Mobile Number',
      key: 'mobileNumber',
      dataIndex: 'mobileNumber',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Extension No.',
      key: 'extension',
      dataIndex: 'extension',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Phone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      render: (text) => <p>{text}</p>,
    },

    {
      title: '',
      key: 'action',
      className: 'text-center',
      render: ({ id }, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Icon
            component={EditIcon}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setShowModal(true);
              setDetails(record);
            }}
          />
          <Icon
            component={DeleteIcon}
            size={25}
            style={{ cursor: 'pointer', color: 'red', fontSize: '19px' }}
            onClick={() => {
              setDetails(record);
              if (record.converted) {
                if (status === 3) {
                  setDeleteModal(true);
                  setDetails(id);
                } else if (tableData.length === 1) {
                  setDeleteModal(true);
                  setDetails(id);
                } else {
                  setChangeDetails('people');
                  sessionStorage.setItem('deletePeople', id);
                }
              } else {
                setDeleteModal(true);
                setDetails(id);
              }
            }}
          />
        </div>
      ),
    },
  ];

  const handleUpdatePeople = async (values: any) => {
    if (details.id) {
      await updateProspectPeople({
        variables: {
          peopleData: values,
          peopleId: details.id,
          prospectClientId: Number(id),
        },
        refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
      })
        .then((res) => {
          Notification({
            type: 'success',
            message: res?.data?.updateProspectPeople?.message,
          });
        })
        .catch((error) => {
          Notification({ type: 'error', message: error.message });
        });
    } else {
      await newProspectPerson({
        variables: {
          peopleData: values.lastName ? values : { ...values, lastName: '' },
          prospectClientId: Number(id),
        },
        refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
      })
        .then((res) => {
          Notification({
            type: 'success',
            message: res?.data?.newProspectPeople?.message,
          });
        })
        .catch((error) => {
          Notification({ type: 'error', message: error.message });
        });
    }
  };

  useEffect(() => {
    if (showModal) {
      form.setFieldsValue({
        firstName: details.firstName,
        lastName: details.lastName,
        jobTitle: details.jobTitle,
        email: details.email,
        mobileNumber: details.mobileNumber,
        phoneNumber: details.phoneNumber,
        extension: details.extension,
      });
    }
  }, [details]);

  // useEffect(() => {
  //   if (setConvertPerson) {
  //     const data = {
  //       personId: tableData[0].key,
  //       firstName: tableData[0].firstName,
  //       lastName: tableData[0].lastName,
  //       email: tableData[0].email,
  //       phoneNumber: `${tableData[0].extension}${tableData[0].phoneNumber}`,
  //     };
  //     setConvertPerson(data);
  //   }
  // }, [tableData]);

  useEffect(() => {
    if (!convertModal) {
      setDeleteModal(false);
    }
  }, [convertModal]);
  useEffect(() => {
    setDeleteId(sessionStorage.getItem('deletePeople'));
  }, [sessionStorage.getItem('deletePeople')]);

  useEffect(() => {
    const deleteData: any = tableData.filter(
      (item: any) => item.id === Number(deleteId),
    );
    const updated = sessionStorage.getItem('updated');
    if (deleteData.length > 0 && updated) {
      handleRemovePeople(deleteData[0].id);
    }
  }, [sessionStorage.getItem('updated'), deleteId]);

  return (
    <TableWrapper>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h2 className='sub-heading' style={{ marginBottom: '10px' }}>
          People
        </h2>
        {tableData && tableData.length < 5 && (
          <Tooltip title='Add New People'>
            <Avatar
              size='small'
              style={{
                backgroundColor: '#87d068',
                marginTop: '6px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowModal(true);
                form.resetFields();
              }}
            >
              <PlusOutlined />
            </Avatar>
          </Tooltip>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        // pagination={isPagination ? paginationConfig : isPagination}
        pagination={false}
        scroll={{ x: 500 }}
        className='client-table'
      />
      <ModalWrapper
        title={Object.keys(details).length > 0 ? 'Edit Details' : 'Add Person'}
        isOpen={showModal}
        onCancel={() => {
          setShowModal(false);
          setDetails({});
        }}
        onOk={() => setShowModal(false)}
        moduleClass='campaign-module prospect-address'
        footer={[
          <Form form={form} onFinish={handleUpdatePeople}>
            <Button
              key='link'
              type='primary'
              onClick={() => {
                setShowModal(false);
                setDetails({});
              }}
            >
              Cancel
            </Button>
            ,
            <Button
              style={{ backgroundColor: '#6cb33f', color: '#fff' }}
              htmlType='submit'
            >
              Save
            </Button>
          </Form>,
        ]}
      >
        <div>
          <Form
            form={form}
            onFinish={handleUpdatePeople}
            className='peoples-add'
          >
            <div className='row'>
              <InputWrapper
                name='firstName'
                label=''
                placeholder='First Name'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.FIRST_NAME,
                    required: true,
                  },
                ]}
              />
              <InputWrapper name='lastName' label='' placeholder='Last Name' />
            </div>
            <div className='row'>
              <InputWrapper
                name='jobTitle'
                label=''
                placeholder='Job Title'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.JOB_TITLE,
                    required: true,
                  },
                ]}
              />
              <InputWrapper
                name='email'
                label=''
                placeholder='Email'
                rules={[{ validator: validateEMail }]}
              />
            </div>
            <div className='row'>
              <InputWrapper
                name='mobileNumber'
                label=''
                placeholder='Mobile Number'
                rules={[{ validator: validatePhoneNumber }]}
              />
              <div className='sub-row ant-form-item'>
                <InputWrapper
                  name='extension'
                  label=''
                  placeholder='Extension'
                  rules={[
                    {
                      message: FORM_VALIDATION_MESSAGE.EXTENSION,
                      required: true,
                    },
                  ]}
                />
                <InputWrapper
                  name='phoneNumber'
                  label=''
                  placeholder='Phone Number'
                  rules={[{ validator: validatePhoneNumber }]}
                />
              </div>
            </div>
          </Form>
        </div>
      </ModalWrapper>
      {tableData && (
        <ModalWrapper
          title={tableData.length > 1 ? 'Delete Person' : ''}
          isOpen={deleteModal}
          onCancel={() => {
            setDeleteModal(false);
          }}
          onOk={() => setDeleteModal(false)}
          moduleClass='campaign-module delete-modal'
          footer={
            tableData.length > 1
              ? [
                <Form>
                  <Button
                    key='link'
                    type='primary'
                    onClick={() => {
                      setDeleteModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  ,
                  <Button
                    style={{ backgroundColor: '#73777a', color: '#fff' }}
                    htmlType='submit'
                    onClick={() => handleRemovePeople(details)}
                  >
                    Delete
                  </Button>
                </Form>,
              ]
              : null
          }
        >
          <div>
            {tableData.length > 1 ? (
              <Form>
                <p className='heading'>
                  Are you sure want to delete selected person details ?
                </p>
              </Form>
            ) : (
              <p style={{ display: 'flex', justifyContent: 'space-around' }}>
                At least one person is required!
              </p>
            )}
          </div>
        </ModalWrapper>
      )}
    </TableWrapper>
  );
};

export default PeoplesTable;
