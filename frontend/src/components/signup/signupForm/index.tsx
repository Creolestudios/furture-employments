import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import InputWrapper from '../../common/formElements/inputWrapper';
import ButtonWrapper from '../../common/formElements/buttonWrapper';
import SIGN_UP_FORM from '../../../constants/components/signupForm';
import { validateMessage } from '../../../utils';

import StyledSignupForm from './index.styles';
import { SIGNUP_USER } from '../../../graphql/mutations/auth';
import {
  API_TOKEN,
  LOGIN_TYPE,
  USER_ROLE,
  USER_ROLE_KEY,
} from '../../../constants';
import appRoutes from '../../../constants/appRoutes';
import Notification from '../../common/Notification';

const SignupForm: FC = () => {
  const [role, setRole] = useState<number | null>(null);
  const [signupForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const emailInput = document.querySelector('input');
    const passwordInput = document.querySelector('input[type="password"]');
    if (emailInput) {
      emailInput.setAttribute('autocomplete', 'new-email');
    }

    if (passwordInput) {
      passwordInput.setAttribute('autocomplete', 'new-password');
    }
  }, []);

  const confirmPasswordValidator = ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue(SIGN_UP_FORM.PASSWORD.NAME) === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(SIGN_UP_FORM.CONFIRM_PASSWORD.VALIDATOR_MESSAGE),
      );
    },
  });

  // signup form submmission
  const [submitForm] = useMutation(SIGNUP_USER);

  const handleSubmit = (values: any) => {
    if (role !== null) {
      submitForm({
        variables: { ...values, role, loginType: LOGIN_TYPE.DEFAULT },
      })
        .then((res) => {
          sessionStorage.setItem(API_TOKEN, res?.data?.createUser?.token);
          sessionStorage.setItem(USER_ROLE_KEY, JSON.stringify(role));
          if (role === USER_ROLE.CANDIDATE_SIGN_UP) {
            navigate(appRoutes.CANDIDATE_SIGNUP);
          }
          if (role === USER_ROLE.EMPLOYER_SIGN_UP) {
            navigate(appRoutes.EMPLOYER_SIGNUP);
          }
        })
        .catch((error) => Notification({ type: 'error', message: error.message }));
    }
    return null;
  };

  return (
    <StyledSignupForm
      name={SIGN_UP_FORM.FORM_NAME}
      onFinish={handleSubmit}
      form={signupForm}
      validateMessages={validateMessage()}
    >
      <InputWrapper
        label={SIGN_UP_FORM.FIRST_NAME.LABEL}
        name={SIGN_UP_FORM.FIRST_NAME.NAME}
        rules={[{ required: SIGN_UP_FORM.REQUIRED }]}
        labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
        wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
      />
      <InputWrapper
        label={SIGN_UP_FORM.SURNAME.LABEL}
        name={SIGN_UP_FORM.SURNAME.NAME}
        rules={[{ required: SIGN_UP_FORM.REQUIRED }]}
        labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
        wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
      />
      <InputWrapper
        label={SIGN_UP_FORM.EMAIL.LABEL}
        name={SIGN_UP_FORM.EMAIL.NAME}
        rules={[
          { required: SIGN_UP_FORM.REQUIRED, type: SIGN_UP_FORM.EMAIL.TYPE },
        ]}
        labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
        wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
      />
      <InputWrapper
        label={SIGN_UP_FORM.PASSWORD.LABEL}
        name={SIGN_UP_FORM.PASSWORD.NAME}
        rules={[
          { required: SIGN_UP_FORM.REQUIRED, min: SIGN_UP_FORM.PASSWORD.MIN },
        ]}
        labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
        wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
        placeholder={SIGN_UP_FORM.PASSWORD.PLACEHOLDER}
        isPasswordType={SIGN_UP_FORM.PASSWORD.TYPE}
      />
      <InputWrapper
        label={SIGN_UP_FORM.CONFIRM_PASSWORD.LABEL}
        name={SIGN_UP_FORM.CONFIRM_PASSWORD.NAME}
        rules={[{ required: SIGN_UP_FORM.REQUIRED }, confirmPasswordValidator]}
        labelCol={{ span: SIGN_UP_FORM.STYLE.LABEL_COL_SPAN }}
        wrapperCol={{ span: SIGN_UP_FORM.STYLE.WRAPPER_COL_SPAN }}
        dependencies={[SIGN_UP_FORM.PASSWORD.NAME]}
        isPasswordType={SIGN_UP_FORM.CONFIRM_PASSWORD.TYPE}
      />
      <div
        className='signup-form-footer'
        style={{ flexDirection: 'row-reverse' }}
      >
        <ButtonWrapper
          className='app-btn candidate-btn'
          htmlType='submit'
          onClick={() => setRole(USER_ROLE.CANDIDATE_SIGN_UP)}
        >
          {SIGN_UP_FORM.CANDIDATE_TITLE}
        </ButtonWrapper>
        <ButtonWrapper
          className='app-btn employer-btn'
          htmlType='submit'
          onClick={() => setRole(USER_ROLE.EMPLOYER_SIGN_UP)}
        >
          {SIGN_UP_FORM.EMPLOYER_TITLE}
        </ButtonWrapper>
      </div>
    </StyledSignupForm>
  );
};

export default SignupForm;
