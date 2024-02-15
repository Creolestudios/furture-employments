import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { CheckOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import TextAreaField from '../common/formElements/TextAreaField';
import InputWrapper from '../common/formElements/inputWrapper';
import FormPageWrapper from '../../styles/formContainer';
import FORM_VALIDATION_MESSAGE from '../../constants/validationMessage';
import appRoutes from '../../constants/appRoutes';
import CheckboxField from '../common/formElements/CheckboxField';
import { employerDetailsQuery } from '../../graphql/queries/employer';
import { USER_NAME } from '../../graphql/queries/users/UserQueries';
import {
  employerRegistrationMutation,
  updateEmployerProfileMutation,
} from '../../graphql/mutations/employer';
import Notification from '../common/Notification';
import { API_TOKEN, USER_ROLE, USER_ROLE_KEY } from '../../constants';
import InputNumberField from '../common/formElements/InputNumberField';
import Loader from '../common/loader';

const CustomTitle = () => (
  <span>
    I agree to the Future Employments{' '}
    <Link to='www.google.com' target='_blank' style={{ color: '#6cb33f' }}>
      Terms of Business
    </Link>
  </span>
);
const ProfileForm = ({ clientData }: any) => {
  const path = useLocation();
  const navigate = useNavigate();
  const [profileForm] = Form.useForm();
  const [userDetails, setUserDetails] = useState<any>({});
  const [agree, setAgree] = useState(false);
  const { data: userData } = useQuery(USER_NAME);
  const [submitForm] = useMutation(employerRegistrationMutation);
  const [submitEditForm] = useMutation(updateEmployerProfileMutation);

  const user = userDetails;
  function UpdateProfile() {
    const {
      loading: employerLoading,
      error: employerError,
      data: employerData,
    } = useQuery(employerDetailsQuery, {
      variables: { userId: user?.id },
    });
    return { employerLoading, employerError, employerData };
  }
  const employer = path.pathname !== appRoutes.EMPLOYER_SIGNUP
    && UpdateProfile().employerData?.getEmployerDetails.data;
  const onFinish = (e: any) => {
    const payload = {
      firstName: e.first_name,
      lastName: e.surname,
      email: e.email,
      companyName: e.companyName,
      phoneNumber: String(e.phoneNumber),
      addressLine1: e.addressLine1,
      addressLine2: e.addressLine2,
      county: e.county,
      city: e.city,
      postcode: e.postcode,
      country: e.country,
      description: e.description,
      registrationNo: e.registrationNo,
      vatNo: e.vatNo,
    };
    if (path.pathname === appRoutes.EMPLOYER_SIGNUP) {
      const updateProfile = () => {
        submitForm({
          variables: {
            ...payload,
            userId: Number(user?.id),
            addressLine2: e.addressLine2 ? e.addressLine2 : '',
            description: e.description ? e.description : '',
            businessNature: e.businessNature ? e.businessNature : '',
            registrationNo: e.registrationNo ? e.registrationNo : '',
            vatNo: e.vatNo ? e.vatNo : '',
          },
          refetchQueries: [
            { query: employerDetailsQuery, variables: { userId: user?.id } },
          ],
        })
          .then((res) => {
            Notification({
              type: 'success',
              message: res.data.employerRegistration.message,
            });
            sessionStorage.setItem(USER_ROLE_KEY, String(USER_ROLE.EMPLOYER));
            sessionStorage.setItem(
              API_TOKEN,
              res.data.employerRegistration.token,
            );
            window.location.assign(appRoutes.PORTAL_DASHBOARD);
          })
          .catch((error) => {
            Notification({ type: 'error', message: error.message });
          });
      };

      updateProfile();
    }
    if (
      path.pathname === appRoutes.USER_PROFILE
      || path.pathname === `${appRoutes.CLIENT_EDIT}/${clientData?.id}`
    ) {
      const updateProfile = () => {
        submitEditForm({
          variables: {
            ...payload,
            userId: Number(user?.id),
            description: e.description ? e.description : '',
            businessNature: e.businessNature ? e.businessNature : '',
          },
          refetchQueries: [
            { query: employerDetailsQuery, variables: { userId: user?.id } },
          ],
        })
          .then((res) => {
            Notification({
              type: 'success',
              message: res.data.updateEmployerProfile.message,
            });
            if (
              path.pathname === `${appRoutes.CLIENT_EDIT}/${clientData?.id}`
            ) {
              navigate(`${appRoutes.CLIENT_DETAILS}/${clientData?.id}`);
            }
          })
          .catch((error) => {
            Notification({ type: 'error', message: error.message });
          });
      };

      updateProfile();
    }
  };
  useEffect(() => {
    if (clientData) {
      setUserDetails(clientData?.user);
    } else {
      setUserDetails(userData?.getUserDetails);
    }
  }, [userData, clientData]);
  useEffect(() => {
    if (clientData) {
      profileForm.setFieldsValue(clientData);
      profileForm.setFieldsValue({
        first_name: clientData?.user?.firstName,
        surname: clientData?.user?.lastName,
        email: clientData?.user?.email,
        phoneNumber: clientData?.user?.phoneNumber,
      });
    } else {
      profileForm.setFieldsValue(employer);
      profileForm.setFieldsValue({
        first_name: user?.firstName,
        surname: user?.lastName,
        email: user?.email,
        phoneNumber: Number(employer?.user?.phoneNumber),
      });
    }
  }, [employer, user, clientData]);
  return (
    <FormPageWrapper>
      <div>
        <h2 className='sub-heading'>
          About
          {clientData ? 'Client' : 'you'}
        </h2>
        <hr />
      </div>
      <Form
        name='basic'
        form={profileForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 850 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
        className='profile-form'
        requiredMark={false}
      >
        <InputWrapper
          label='First name'
          name='first_name'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.FIRST_NAME,
              required: true,
            },
          ]}
        />
        <InputWrapper
          label='Surname'
          name='surname'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.SURNAME,
              required: true,
            },
          ]}
        />
        <InputWrapper
          label='Email Address'
          name='email'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.EMAIL,
              required: true,
            },
          ]}
        />
        <InputNumberField
          className='phoneNumber'
          label='Phone Number'
          name='phoneNumber'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.PHONE_NUMBER,
              required: true,
            },
          ]}
        />
        <div>
          <h2 className='sub-heading'>
            About
            {!clientData && 'your'}
            {' '}
            company
          </h2>
          <hr />
        </div>
        <InputWrapper
          label='Company Name'
          name='companyName'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.COMPANY_NAME,
              required: true,
            },
          ]}
        />
        <InputWrapper
          label='Address Line 1'
          name='addressLine1'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.ADDRESS_1,
              required: true,
            },
          ]}
        />
        <InputWrapper label='Address Line 2' name='addressLine2' />
        <InputWrapper
          label='Town/City'
          name='city'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.TOWN,
              required: true,
            },
          ]}
        />
        <InputWrapper
          label='County'
          name='county'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.COUNTY,
              required: true,
            },
          ]}
        />
        <InputWrapper
          label='Postcode'
          name='postcode'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.POSTCODE,
              required: true,
            },
          ]}
        />
        <InputWrapper
          label='Country'
          name='country'
          rules={[
            {
              message: FORM_VALIDATION_MESSAGE.COUNTRY,
              required: true,
            },
          ]}
          // isDisabled
        />
        <TextAreaField
          label='Company Description'
          name='description'
          rows={5}
        />
        <TextAreaField
          label='Nature of Business'
          name='businessNature'
          rows={5}
        />
        <InputWrapper label='Registration No' name='registrationNo' />
        <InputWrapper
          label='VAT Number'
          name='vatNo'
          placeholder='e.g. GB123456789'
        />
        <hr />
        {path.pathname !== appRoutes.EMPLOYER_SIGNUP ? (
          <Form.Item wrapperCol={{ offset: 1 }}>
            <Button
              type='primary'
              htmlType='submit'
              icon={<CheckOutlined />}
              style={{ backgroundColor: '#6cb33f' }}
            >
              Save Changes
            </Button>
          </Form.Item>
        ) : (
          <div>
            <CheckboxField
              title={<CustomTitle />}
              name='agree'
              onChange={() => setAgree(!agree)}
            />
            <Form.Item wrapperCol={{ offset: 1 }}>
              <Button
                type='primary'
                htmlType='submit'
                style={{ backgroundColor: '#6cb33f' }}
                disabled={!agree}
              >
                Continue
                <DoubleRightOutlined />
              </Button>
            </Form.Item>
          </div>
        )}
      </Form>
    </FormPageWrapper>
  );
};

export default ProfileForm;
