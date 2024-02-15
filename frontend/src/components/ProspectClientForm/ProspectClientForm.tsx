import {
  Avatar, Button, Form, Input, Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Item from 'antd/es/list/Item';
import InputWrapper from '../common/formElements/inputWrapper';
import TextAreaField from '../common/formElements/TextAreaField';
import Notification from '../common/Notification';
import {
  useGetAdminList,
  useNewProspectClient,
} from '../../services/admin/adminService';
import { SEARCH_PROSPECT_CLIENT } from '../../graphql/queries/admin';
import SelectField from '../common/formElements/SelectField';
import FORM_VALIDATION_MESSAGE from '../../constants/validationMessage';
import { validateEMail, validatePhoneNumber } from '../../utils';

const People = ({ people, setPeople }: any) => {
  const newPerson = {
    key: Date.now(),
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    mobileNumber: '',
    extension: '',
    phoneNumber: '',
  };
  const addPerson = () => {
    setPeople([...people, newPerson]);
  };
  const handleDelete = (key: number) => {
    setPeople((prevSections: any) => prevSections.filter((section: any) => section.key !== key));
  };

  const handlePersonChange = (index: any, fieldName: any, value: any) => {
    const updatedPeople = [...people];
    updatedPeople[index][fieldName] = value;
    setPeople(updatedPeople);
  };

  return (
    <>
      <div className='add-row'>
        <h3 className='heading'>People</h3>
        {people.length < 3 && (
          <Tooltip title='Add New People'>
            <Avatar
              size='small'
              style={{
                cursor: 'pointer',
              }}
              onClick={addPerson}
            >
              <PlusOutlined />
            </Avatar>
          </Tooltip>
        )}
      </div>
      {people.map((person: any, index: any) => (
        <div key={person.key}>
          <h4 className='heading heading-sub'>
            Person
            {index + 1}
          </h4>
          <div>
            <div className='row'>
              <InputWrapper
                name={`people[${person.key}].firstName`}
                placeholder='First Name'
                label=''
                onChange={(e: any) => handlePersonChange(index, 'firstName', e.target.value)}
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.FIRST_NAME,
                    required: true,
                  },
                ]}
              />
              <InputWrapper
                name={`people[${person.key}].lastName`}
                placeholder='Last Name'
                onChange={(e: any) => handlePersonChange(index, 'lastName', e.target.value)}
                label=''
              />
            </div>
            <div className='row'>
              <InputWrapper
                name={`people[${person.key}].jobTitle`}
                placeholder='Job Title'
                onChange={(e: any) => handlePersonChange(index, 'jobTitle', e.target.value)}
                label=''
                rules={[
                  {
                    message: FORM_VALIDATION_MESSAGE.JOB_TITLE,
                    required: true,
                  },
                ]}
              />
              <InputWrapper
                name={`people[${person.key}].email`}
                placeholder='Email'
                onChange={(e: any) => handlePersonChange(index, 'email', e.target.value)}
                label=''
                rules={[{ validator: validateEMail }]}
              />
            </div>
            <div className='row client-form-contact'>
              <InputWrapper
                name={`people[${person.key}].mobileNumber`}
                placeholder='Mobile Number'
                onChange={(e: any) => handlePersonChange(index, 'mobileNumber', e.target.value)}
                label=''
                rules={[{ validator: validatePhoneNumber }]}
              />
              <div className='sub-row'>
                <InputWrapper
                  name={`people[${person.key}].extension`}
                  placeholder='Extension'
                  onChange={(e: any) => handlePersonChange(index, 'extension', e.target.value)}
                  label=''
                  rules={[
                    {
                      message: FORM_VALIDATION_MESSAGE.EXTENSION,
                      required: true,
                    },
                  ]}
                />
                <InputWrapper
                  name={`people[${person.key}].phoneNumber`}
                  placeholder='Phone Number'
                  onChange={(e: any) => handlePersonChange(index, 'phoneNumber', e.target.value)}
                  label=''
                  rules={[{ validator: validatePhoneNumber }]}
                />
              </div>
            </div>
            {people.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Tooltip title='Delete Person'>
                  <DeleteOutlined
                    style={{
                      cursor: 'pointer',
                      color: 'red',
                    }}
                    onClick={() => handleDelete(person.key)}
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
const Address = ({ address, setAddress }: any) => {
  const newAddress = {
    key: Date.now(),
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    country: '',
    postcode: '',
  };
  const addAddress = () => {
    setAddress([...address, newAddress]);
  };
  const handleDelete = (key: number) => {
    setAddress((prevSections: any) => prevSections.filter((section: any) => section.key !== key));
  };

  const handleAddressChange = (index: any, fieldName: any, value: any) => {
    const updatedPeople = [...address];
    updatedPeople[index][fieldName] = value;
    setAddress(updatedPeople);
  };
  return (
    <>
      <div className='add-row'>
        <h3 className='heading'>Details</h3>
        {address.length < 3 && (
          <Tooltip title='Add New Address'>
            <Avatar
              size='small'
              style={{
                cursor: 'pointer',
              }}
              onClick={addAddress}
            >
              <PlusOutlined />
            </Avatar>
          </Tooltip>
        )}
      </div>
      {address.map((item: any, index: any) => (
        <div key={item.key}>
          <h4 className='heading heading-sub'>
            Address
            {index + 1}
          </h4>
          <div />
          <div className='row'>
            <InputWrapper
              name={`address[${item.key}].addressLine1`}
              placeholder='Address Line 1'
              onChange={(e: any) => handleAddressChange(index, 'addressLine1', e.target.value)}
              label=''
              rules={[
                {
                  message: FORM_VALIDATION_MESSAGE.ADDRESS_1,
                  required: true,
                },
              ]}
            />
            <InputWrapper
              name={`address[${item.key}].addressLine2`}
              placeholder='Address Line 2'
              onChange={(e: any) => handleAddressChange(index, 'addressLine2', e.target.value)}
              label=''
            />
          </div>
          <div className='row'>
            <InputWrapper
              name={`address[${item.key}].city`}
              placeholder='City'
              onChange={(e: any) => handleAddressChange(index, 'city', e.target.value)}
              label=''
              rules={[
                {
                  message: FORM_VALIDATION_MESSAGE.TOWN,
                  required: true,
                },
              ]}
            />
            <InputWrapper
              name={`address[${item.key}].county`}
              placeholder='County'
              onChange={(e: any) => handleAddressChange(index, 'county', e.target.value)}
              label=''
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
              name={`address[${item.key}].country`}
              placeholder='Country'
              onChange={(e: any) => handleAddressChange(index, 'country', e.target.value)}
              label=''
              rules={[
                {
                  message: FORM_VALIDATION_MESSAGE.COUNTRY,
                  required: true,
                },
              ]}
            />
            <InputWrapper
              name={`address[${item.key}].postcode`}
              placeholder='Postcode'
              onChange={(e: any) => handleAddressChange(index, 'postcode', e.target.value)}
              label=''
              rules={[
                {
                  message: FORM_VALIDATION_MESSAGE.POSTCODE,
                  required: true,
                },
              ]}
            />
          </div>
          {address.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Tooltip title='Delete Address'>
                <DeleteOutlined
                  style={{
                    cursor: 'pointer',
                    color: 'red',
                  }}
                  onClick={() => handleDelete(item.key)}
                />
              </Tooltip>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
const ProspectClientForm = ({ newClientForm, setShowModal }: any) => {
  const { newProspectClient } = useNewProspectClient();
  const initialPeople = [
    {
      key: Date.now(),
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      mobileNumber: '',
      extension: '',
      phoneNumber: '',
    },
  ];
  const initialAddress = [
    {
      key: Date.now(),
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      country: '',
      postcode: '',
    },
  ];
  const [people, setPeople] = useState(initialPeople);
  const [address, setAddress] = useState(initialAddress);
  const [assignedToList, setAssignedToList] = useState<any>([]);
  const { adminList } = useGetAdminList({
    searchParams: {
      current: 1,
    },
  });

  const handleSubmit = async (values: any) => {
    const newPeople = people.map(({ key, ...rest }) => rest);
    const newAddress = address.map(({ key, ...rest }) => rest);
    const payload = {
      people: newPeople,
      address: newAddress,
      personAssigned: values.personAssigned,
      companyName: values.companyName,
      website: values.website,
      description: values.description ? values.description : '',
      notes: values.notes ? values.notes : '',
    };
    await newProspectClient({
      variables: {
        prospectData: payload,
      },
      refetchQueries: [SEARCH_PROSPECT_CLIENT],
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.newProspectClient?.message,
        });
        setPeople(initialPeople);
        setAddress(initialAddress);
        setShowModal(false);
      })
      .catch((error) => {
        Notification({ type: 'error', message: error.message });
      });
  };

  useEffect(() => {
    const list = adminList.map((item: any) => ({
      label: item.name,
      value: item.name,
    }));
    setAssignedToList(list);
  }, [adminList]);

  return (
    <Form
      form={newClientForm}
      onFinish={handleSubmit}
      // initialValues={{ description: '', notes: '' }}
    >
      <h3 className='heading'>Company Name</h3>
      <div className='row'>
        <InputWrapper
          name='companyName'
          label=''
          placeholder='Company Name'
          rules={[
            { message: FORM_VALIDATION_MESSAGE.COMPANY_NAME, required: true },
          ]}
        />
        <InputWrapper
          name='website'
          label=''
          placeholder='Website'
          rules={[{ message: FORM_VALIDATION_MESSAGE.WEBSITE, required: true }]}
        />
      </div>
      <hr />
      <People people={people} setPeople={setPeople} />
      <hr />
      <Address address={address} setAddress={setAddress} />
      <hr />
      <h3 className='heading'>Company Description</h3>
      <div className='row'>
        <TextAreaField
          name='description'
          label=''
          placeholder='Enter Company Description'
        />
      </div>
      <h3 className='heading'>Assign To</h3>
      <div className='row'>
        <SelectField
          name='personAssigned'
          options={assignedToList}
          placeholder='Select Person to assign'
          rules={[
            { message: FORM_VALIDATION_MESSAGE.ASSIGN_TO, required: true },
          ]}
        />
      </div>
      <h3 className='heading'>Notes</h3>
      <div className='row'>
        <TextAreaField name='notes' label='' placeholder='Enter Note' />
      </div>
      <hr />
      <div className='action'>
        <Button key='link' type='primary' onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: '#6cb33f', color: '#fff' }}
          htmlType='submit'
          type='primary'
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default ProspectClientForm;
