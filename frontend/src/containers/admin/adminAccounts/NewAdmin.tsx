import React, { FC } from 'react';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import InputWrapper from '../../../components/common/formElements/inputWrapper';
import appRoutes from '../../../constants/appRoutes';
import { useAddAdmin } from '../../../services/admin/adminService';
import ADD_ADMIN_FORM from '../../../constants/components/addAdminForm';
import { getErrorResponse, getSuccessResponse } from '../../../utils';
import { ADD_ADMIN, USER_ROLE, USER_ROLE_KEY } from '../../../constants';

const AdminAccounts: FC = () => {
  const navigate = useNavigate();
  const { SubmitAdmin } = useAddAdmin();
  const userRole = sessionStorage.getItem(USER_ROLE_KEY);
  const confirmPasswordValidator = ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue(ADD_ADMIN_FORM.PASSWORD.NAME) === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(ADD_ADMIN_FORM.CONFIRM_PASSWORD.VALIDATOR_MESSAGE),
      );
    },
  });

  const handleSubmit = async (values: any) => {
    if (Number(userRole) === USER_ROLE.SUPER_ADMIN) {
      await SubmitAdmin({
        variables: { ...values },
      })
        .then((res) => {
          getSuccessResponse(res?.data?.addAdmin?.message);
          navigate(`${appRoutes.ADMINS_LIST}`);
        })
        .catch((error) => {
          getErrorResponse(error.message);
        });
    } else {
      getErrorResponse(ADD_ADMIN.MESSAGE);
    }
  };
  return (
    <AppLayout>
      <FormPageWrapper>
        <div className='page-header'>
          <h1>Create new admin</h1>
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
          onFinish={handleSubmit}
          wrapperCol={{ span: 16 }}
          className='super-admin-form'
        >
          <InputWrapper
            label={ADD_ADMIN_FORM.FIRST_NAME.LABEL}
            name={ADD_ADMIN_FORM.FIRST_NAME.NAME}
            rules={[
              {
                required: ADD_ADMIN_FORM.REQUIRED,
                message: ADD_ADMIN_FORM.FIRST_NAME.MESSAGE,
              },
            ]}
            labelCol={{ span: ADD_ADMIN_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: ADD_ADMIN_FORM.STYLE.WRAPPER_COL_SPAN }}
          />
          <InputWrapper
            label={ADD_ADMIN_FORM.SURNAME.LABEL}
            name={ADD_ADMIN_FORM.SURNAME.NAME}
            rules={[
              {
                required: ADD_ADMIN_FORM.REQUIRED,
                message: ADD_ADMIN_FORM.SURNAME.MESSAGE,
              },
            ]}
            labelCol={{ span: ADD_ADMIN_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: ADD_ADMIN_FORM.STYLE.WRAPPER_COL_SPAN }}
          />
          <InputWrapper
            label={ADD_ADMIN_FORM.EMAIL.LABEL}
            name={ADD_ADMIN_FORM.EMAIL.NAME}
            rules={[
              {
                required: ADD_ADMIN_FORM.REQUIRED,
                type: ADD_ADMIN_FORM.EMAIL.TYPE,
                message: ADD_ADMIN_FORM.EMAIL.MESSAGE,
              },
            ]}
            labelCol={{ span: ADD_ADMIN_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: ADD_ADMIN_FORM.STYLE.WRAPPER_COL_SPAN }}
          />
          <InputWrapper
            label={ADD_ADMIN_FORM.PASSWORD.LABEL}
            name={ADD_ADMIN_FORM.PASSWORD.NAME}
            rules={[
              {
                min: ADD_ADMIN_FORM.PASSWORD.MIN,
                required: ADD_ADMIN_FORM.REQUIRED,
                message: ADD_ADMIN_FORM.PASSWORD.MESSAGE,
              },
            ]}
            labelCol={{ span: ADD_ADMIN_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: ADD_ADMIN_FORM.STYLE.WRAPPER_COL_SPAN }}
            placeholder={ADD_ADMIN_FORM.PASSWORD.PLACEHOLDER}
            isPasswordType={ADD_ADMIN_FORM.PASSWORD.TYPE}
          />
          <InputWrapper
            label={ADD_ADMIN_FORM.CONFIRM_PASSWORD.LABEL}
            name={ADD_ADMIN_FORM.CONFIRM_PASSWORD.NAME}
            rules={[
              {
                min: ADD_ADMIN_FORM.PASSWORD.MIN,
                required: ADD_ADMIN_FORM.REQUIRED,
                message: ADD_ADMIN_FORM.PASSWORD.MESSAGE,
              },
              confirmPasswordValidator,
            ]}
            labelCol={{ span: ADD_ADMIN_FORM.STYLE.LABEL_COL_SPAN }}
            wrapperCol={{ span: ADD_ADMIN_FORM.STYLE.WRAPPER_COL_SPAN }}
            dependencies={[ADD_ADMIN_FORM.PASSWORD.NAME]}
            isPasswordType={ADD_ADMIN_FORM.CONFIRM_PASSWORD.TYPE}
          />
          <hr />
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              type='primary'
              htmlType='submit'
              style={{ backgroundColor: '#6cb33f' }}
            >
              Save new admin
            </Button>
          </Form.Item>
        </Form>
      </FormPageWrapper>
    </AppLayout>
  );
};

export default AdminAccounts;
