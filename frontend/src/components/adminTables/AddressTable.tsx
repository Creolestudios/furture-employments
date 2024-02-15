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
import Notification from '../common/Notification';
import {
  useNewProspectAddress,
  useRemoveProspectAddress,
  useUpdateProspectAddress,
} from '../../services/admin/adminService';
import {
  PROSPECT_CLIENT_DETAILS,
  PROSPECT_CLIENT_TIMELINE,
} from '../../graphql/queries/admin';
import ModalWrapper from '../common/modalWrapper';
import InputWrapper from '../common/formElements/inputWrapper';
import FORM_VALIDATION_MESSAGE from '../../constants/validationMessage';
import {
  IProspectAddress,
  ProspectAddressDataType,
} from '../../interfaces/prospectClients';

// Address of prospect client table.
const AddressTable: React.FC<IProspectAddress> = ({
  tableData,
  convertModal,
  setConvertAddress,
  setChangeDetails,
  convertAddress,
}) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState<any>(false);
  const [deleteModal, setDeleteModal] = useState<any>(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [details, setDetails] = useState<any>({});
  const [form] = Form.useForm();
  const { removeAddress } = useRemoveProspectAddress();
  const { updateProspectAddress } = useUpdateProspectAddress();
  const { newProspectAddress } = useNewProspectAddress();
  const handleRemoveAddress = async (addressId: any) => {
    await removeAddress({
      variables: { addressId },
      refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.removeProspectAddress?.message,
        });
        sessionStorage.removeItem('deleteAddress');
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };
  const columns: ColumnsType<ProspectAddressDataType> = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => <p>{`Address  ${index + 1}`}</p>,
    },
    {
      title: '',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (
        text,
        {
          addressLine1, addressLine2, city, county, country, postcode,
        },
      ) => (
        <p>
          {`${addressLine1} ${addressLine2} ${city} ${county} ${country} ${postcode}`}
        </p>
      ),
    },

    {
      title: '',
      key: 'action',
      className: 'text-center address-actions',
      render: ({ id }, record) => (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
                if (tableData.length === 1) {
                  setDeleteModal(true);
                  setDetails(id);
                } else {
                  setChangeDetails('address');
                  sessionStorage.setItem('deleteAddress', id);
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

  const handleUpdateAddress = async (values: any) => {
    if (details.id) {
      await updateProspectAddress({
        variables: {
          addressData: values,
          addressId: details.id,
          prospectClientId: Number(id),
        },
        refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
      })
        .then((res) => {
          Notification({
            type: 'success',
            message: res?.data?.updateProspectAddress?.message,
          });
        })
        .catch((error) => {
          Notification({ type: 'error', message: error.message });
        });
    } else {
      await newProspectAddress({
        variables: {
          addressData: values.addressLine2
            ? values
            : { ...values, addressLine2: '' },
          prospectClientId: Number(id),
        },
        refetchQueries: [PROSPECT_CLIENT_DETAILS, PROSPECT_CLIENT_TIMELINE],
      })
        .then((res) => {
          Notification({
            type: 'success',
            message: res?.data?.newProspectAddress?.message,
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
        addressLine1: details.addressLine1,
        addressLine2: details.addressLine2,
        city: details.city,
        country: details.country,
        county: details.county,
        postcode: details.postcode,
      });
    }
  }, [details, form]);

  // useEffect(() => {
  //   if (setConvertAddress) {
  //     const data = {
  //       addressId: tableData[0].key,
  //       addressLine1: tableData[0].addressLine1,
  //       addressLine2: tableData[0].addressLine2,
  //       city: tableData[0].city,
  //       county: tableData[0].county,
  //       country: tableData[0].country,
  //       postcode: tableData[0].postcode,
  //     };
  //     setConvertAddress(data);
  //   }
  // }, [tableData]);

  useEffect(() => {
    if (!convertModal) {
      setDeleteModal(false);
    }
  }, [convertModal]);
  useEffect(() => {
    setDeleteId(sessionStorage.getItem('deleteAddress'));
  }, [sessionStorage.getItem('deleteAddress')]);

  useEffect(() => {
    const deleteData: any = tableData.filter(
      (item: any) => item.id === Number(deleteId),
    );
    const updated = sessionStorage.getItem('updated');
    if (deleteData.length > 0 && updated) {
      handleRemoveAddress(deleteData[0].id);
    }
  }, [sessionStorage.getItem('updated'), deleteId]);

  return (
    <TableWrapper>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h2 className='sub-heading' style={{ marginBottom: '10px' }}>
          Details
        </h2>
        {tableData && tableData.length < 5 && (
          <Tooltip title='Add New Address'>
            <Avatar
              size='small'
              style={{
                backgroundColor: '#87d068',
                marginTop: '6px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowModal(true);
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
        className='address-table'
        showHeader={false}
      />
      <ModalWrapper
        title={Object.keys(details).length > 0 ? 'Edit Details' : 'Add Address'}
        isOpen={showModal}
        onCancel={() => {
          setShowModal(false);
          setDetails({});
        }}
        onOk={() => setShowModal(false)}
        moduleClass='campaign-module prospect-address'
        footer={[
          <Form form={form} onFinish={handleUpdateAddress}>
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
          <Form form={form} onFinish={handleUpdateAddress}>
            <div className='row'>
              <InputWrapper
                name='addressLine1'
                label=''
                placeholder='Address Line 1'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.ADDRESS_1,
                    required: true,
                  },
                ]}
              />
              <InputWrapper
                name='addressLine2'
                label=''
                placeholder='Address Line 2'
              />
            </div>
            <div className='row'>
              <InputWrapper
                name='city'
                label=''
                placeholder='City'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.TOWN,
                    required: true,
                  },
                ]}
              />
              <InputWrapper
                name='county'
                label=''
                placeholder='County'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.COUNTY,
                    required: true,
                  },
                ]}
              />
            </div>
            <div className='row'>
              <InputWrapper
                name='country'
                label=''
                placeholder='Country'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.COUNTRY,
                    required: true,
                  },
                ]}
              />
              <InputWrapper
                name='postcode'
                label=''
                placeholder='Postcode'
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.POSTCODE,
                    required: true,
                  },
                ]}
              />
            </div>
          </Form>
        </div>
      </ModalWrapper>
      {tableData && (
        <ModalWrapper
          title={tableData.length > 1 ? 'Delete Address' : ''}
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
                    onClick={() => handleRemoveAddress(details)}
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
                  Are you sure want to delete selected address details ?
                </p>
              </Form>
            ) : (
              <p style={{ display: 'flex', justifyContent: 'space-around' }}>
                At least one address is required!
              </p>
            )}
          </div>
        </ModalWrapper>
      )}
    </TableWrapper>
  );
};

export default AddressTable;
