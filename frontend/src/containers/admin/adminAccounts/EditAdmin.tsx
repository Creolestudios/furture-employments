import React, { FC, useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import InputWrapper from '../../../components/common/formElements/inputWrapper';
import SIGN_UP_FORM from '../../../constants/components/signupForm';
import appRoutes from '../../../constants/appRoutes';
import {
  useDisableAdmin,
  useEditAdmin,
  useGetAdminDetails,
  useRemoveSuperAdmin,
} from '../../../services/admin/adminService';
import { IEditAdmin } from '../../../interfaces/adminForm';
import { getErrorResponse, getSuccessResponse } from '../../../utils';
import { USER_ID_KEY } from '../../../constants';
import candidateService from '../../../services/candidate/candidateService';

const EditAdmin: FC = () => {
  const { data: user } = candidateService.useGetUserDetail();
  const { id: userId, email } = user?.getUserDetails || {};
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { removeSuperAdmin } = useRemoveSuperAdmin();
  const { disableAdmin, error } = useDisableAdmin();
  const { editAdmin } = useEditAdmin();
  const { data } = useGetAdminDetails(Number(id));
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      setDisabled(data?.disableAdmin);
    }
  }, [data]);

  const editAdminDetails = (values: IEditAdmin) => {
    if (id) {
      editAdmin({
        variables: {
          updateAdmin: {
            userId: Number(id),
            ...values,
          },
        },
      })
        .then((res) => {
          getSuccessResponse(res?.data?.updateAdmin?.message);
          navigate(appRoutes.ADMINS_LIST);
        })
        .catch((error) => getErrorResponse(error?.message));
    }
  };

  const disableAdminBySuperAdmin = () => {
    if (id) {
      disableAdmin({
        variables: {
          disableAdminDto: { userId: Number(id), disableAdmin: true },
        },
      })
        .then((res) => {
          getSuccessResponse(res?.data?.disableAdmin?.message);
          navigate(appRoutes.ADMINS_LIST);
        })
        .catch((error) => getErrorResponse(error?.message));
    }
  };

  const removeSuperAdminBySuperAdmin = () => {
    if (id) {
      removeSuperAdmin({
        variables: {
          userId: Number(id),
        },
      })
        .then((res) => {
          getSuccessResponse(res?.data?.removeSuperAdmin?.message);
          if (Number(userId) === Number(id)) {
            sessionStorage.clear();
            navigate('/');
          }
        })
        .catch((error) => getErrorResponse(error?.message));
    }
  };

  return (
    <AppLayout>
      <FormPageWrapper>
        <div className='page-header'>
          <h1>
            Admin Account:
            {email}
          </h1>
          <div
            className='vacancy-link'
            onClick={() => navigate(appRoutes.ADMINS_LIST)}
            onKeyDown={() => navigate(appRoutes.ADMINS_LIST)}
            role='button'
            tabIndex={0}
          >
            Back to account list
          </div>
        </div>
        <Form
          name='upload_cv'
          style={{ maxWidth: 650 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={editAdminDetails}
        >
          <InputWrapper
            label={SIGN_UP_FORM.FIRST_NAME.LABEL}
            name={SIGN_UP_FORM.FIRST_NAME.NAME}
            labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
            isDisabled={disabled}
          />
          <InputWrapper
            label={SIGN_UP_FORM.SURNAME.LABEL}
            name={SIGN_UP_FORM.SURNAME.NAME}
            labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
            isDisabled={disabled}
          />
          <InputWrapper
            label={SIGN_UP_FORM.EMAIL.LABEL}
            name={SIGN_UP_FORM.EMAIL.NAME}
            rules={[
              {
                type: SIGN_UP_FORM.EMAIL.TYPE,
              },
            ]}
            labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
            isDisabled={disabled}
          />
          <hr />
          {!disabled && (
            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
              <Button
                type='primary'
                htmlType='submit'
                style={{ backgroundColor: '#6cb33f' }}
              >
                Save admin
              </Button>

              <Button
                type='primary'
                htmlType='button'
                onClick={disableAdminBySuperAdmin}
                style={{ backgroundColor: '#d41e24', marginLeft: '15px' }}
              >
                Disable
              </Button>
            </Form.Item>
          )}
        </Form>
        <div className='page-header'>
          <h1>Roles</h1>
          <p>{data?.role}</p>
        </div>
        <hr />
        {!disabled && (
          <Button
            type='primary'
            htmlType='submit'
            style={{ backgroundColor: '#d41e24' }}
            onClick={removeSuperAdminBySuperAdmin}
          >
            Remove Super Admin
          </Button>
        )}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default EditAdmin;
