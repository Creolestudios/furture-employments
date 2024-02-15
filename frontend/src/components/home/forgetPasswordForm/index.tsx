import React, { FC } from 'react';
import { FormInstance } from 'antd';
import { useMutation } from '@apollo/client';
import InputWrapper from '../../common/formElements/inputWrapper';
import ButtonWrapper from '../../common/formElements/buttonWrapper';
import FORGET_PASSWORD_FORM from '../../../constants/components/forgetPasswordForm';

import StyledForm from './index.styles';
import { validateMessage } from '../../../utils';
import { FORGET_PASSWORD } from '../../../graphql/mutations/auth';
import Notification from '../../common/Notification';
import { FORGET_PASSWORD_CONST } from '../../../constants';

interface IProps {
  form: FormInstance;
  onCancel: () => void;
}

const ForgetPasswordForm: FC<IProps> = ({ form, onCancel }) => {
  const [submitForgetPassword, { data }] = useMutation(FORGET_PASSWORD);
  const submitForm = (values: any) => {
    submitForgetPassword({
      variables: { ...values },
    })
      .then((res) => Notification({
        type: 'success',
        message: res?.data?.forgetPassword?.message,
      }))
      .catch((error) => Notification({ type: 'error', message: error.message }));
    return null;
  };
  return (
    <StyledForm
      name={FORGET_PASSWORD_FORM.NAME}
      form={form}
      onFinish={submitForm}
      validateMessages={validateMessage()}
    >
      <div className='password-modal-body-content'>
        {data ? (
          <>
            <p>{FORGET_PASSWORD_CONST.sent}</p>
            <p>{FORGET_PASSWORD_CONST.spamAndReset}</p>
          </>
        ) : (
          <>
            <p>{FORGET_PASSWORD_CONST.title}</p>
            <InputWrapper
              label={FORGET_PASSWORD_FORM.EMAIL.LABEL}
              name={FORGET_PASSWORD_FORM.EMAIL.NAME}
              rules={[
                {
                  required: FORGET_PASSWORD_FORM.EMAIL.REQUIRED,
                  type: FORGET_PASSWORD_FORM.EMAIL.TYPE,
                },
              ]}
              inputHeight={FORGET_PASSWORD_FORM.STYLE.HEIGHT}
              labelMinWidth={FORGET_PASSWORD_FORM.STYLE.MIN_WIDTH}
            />
          </>
        )}
      </div>
      <div className='password-modal-footer'>
        <ButtonWrapper
          className={FORGET_PASSWORD_FORM.LOGIN.CLASS_NAME}
          htmlType='submit'
          disabled={!!data}
          onClick={() => {}}
        >
          {FORGET_PASSWORD_FORM.LOGIN.VALUE}
        </ButtonWrapper>
        <ButtonWrapper
          className={FORGET_PASSWORD_FORM.CANCEL.CLASS_NAME}
          onClick={onCancel}
        >
          {FORGET_PASSWORD_FORM.CANCEL.VALUE}
        </ButtonWrapper>
      </div>
    </StyledForm>
  );
};

export default ForgetPasswordForm;
