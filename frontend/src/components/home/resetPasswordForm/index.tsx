import React, { FC } from 'react';
import { Form, FormInstance } from 'antd';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputWrapper from '../../common/formElements/inputWrapper';
import ButtonWrapper from '../../common/formElements/buttonWrapper';
import { validateMessage } from '../../../utils';
import RESET_PASSWORD_FORM from '../../../constants/components/resetPasswordForm';
import { RESET_PASSWORD } from '../../../graphql/mutations/auth';
import Notification from '../../common/Notification';
import appRoutes from '../../../constants/appRoutes';

const ResetPasswordForm: FC = () => {
  const [form] = Form.useForm() as [FormInstance];
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get('token');

  const confirmPasswordValidator = ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (
        !value
        || getFieldValue(RESET_PASSWORD_FORM.PASSWORD.NAME) === value
      ) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(RESET_PASSWORD_FORM.CONFIRM_PASSWORD.VALIDATOR_MESSAGE),
      );
    },
  });

  const [submitResetPassword] = useMutation(RESET_PASSWORD);
  const submitForm = (values: any) => {
    submitResetPassword({
      variables: { ...values, token },
    })
      .then((res) => {
        Notification({
          type: 'success',
          message: res?.data?.resetPassword?.message,
        });
        navigate(appRoutes.HOME);
      })
      .catch((error) => Notification({ type: 'error', message: error.message }));
    return null;
  };

  return (
    <Form
      name={RESET_PASSWORD_FORM.NAME}
      form={form}
      onFinish={submitForm}
      validateMessages={validateMessage()}
      className='reset-password-form-wrapper'
    >
      <div className='reset-password-form-container'>
        <InputWrapper
          label={RESET_PASSWORD_FORM.PASSWORD.LABEL}
          name={RESET_PASSWORD_FORM.PASSWORD.NAME}
          rules={[
            {
              required: RESET_PASSWORD_FORM.REQUIRED,
              min: RESET_PASSWORD_FORM.PASSWORD.MIN,
            },
          ]}
          labelMinWidth={RESET_PASSWORD_FORM.STYLE.MIN_WIDTH}
          inputHeight={RESET_PASSWORD_FORM.STYLE.HEIGHT}
          placeholder={RESET_PASSWORD_FORM.PASSWORD.PLACEHOLDER}
          isPasswordType={RESET_PASSWORD_FORM.PASSWORD.TYPE}
        />
        <InputWrapper
          label={RESET_PASSWORD_FORM.CONFIRM_PASSWORD.LABEL}
          name={RESET_PASSWORD_FORM.CONFIRM_PASSWORD.NAME}
          rules={[
            {
              required: RESET_PASSWORD_FORM.REQUIRED,
              min: RESET_PASSWORD_FORM.PASSWORD.MIN,
            },
            confirmPasswordValidator,
          ]}
          inputHeight={RESET_PASSWORD_FORM.STYLE.HEIGHT}
          labelMinWidth={RESET_PASSWORD_FORM.STYLE.MIN_WIDTH}
          dependencies={[RESET_PASSWORD_FORM.PASSWORD.NAME]}
          isPasswordType={RESET_PASSWORD_FORM.CONFIRM_PASSWORD.TYPE}
        />
      </div>
      <div className='reset-password-submit'>
        <ButtonWrapper
          className={RESET_PASSWORD_FORM.RESET.CLASS_NAME}
          htmlType='submit'
          onClick={() => {}}
        >
          {RESET_PASSWORD_FORM.RESET.VALUE}
        </ButtonWrapper>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
