import React, { FC } from 'react';
import { Button, FormInstance } from 'antd';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LinkedinFilled } from '@ant-design/icons';
import InputWrapper from '../../common/formElements/inputWrapper';
import ButtonWrapper from '../../common/formElements/buttonWrapper';
import LOGIN_FORM from '../../../constants/components/loginForm';
import StyledForm from './index.styles';
import { validateMessage } from '../../../utils';
import { LINKEDIN_AUTH_URL, USER_LOGIN } from '../../../graphql/mutations/auth';
import {
  API_TOKEN,
  LOGIN_TYPE,
  USER_ROLE,
  USER_ROLE_KEY,
} from '../../../constants';
import appRoutes from '../../../constants/appRoutes';
import Notification from '../../common/Notification';
import LinkedinSiginLogo from '../../../assets/images/signidefault.png';

interface IProps {
  onCancel: () => void;
  form: FormInstance;
  showButtons: any;
  setShowButtons: any;
}

const LoginForm: FC<IProps> = ({
  onCancel,
  form,
  showButtons,
  setShowButtons,
}) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isApplying = params.get('is-applying');
  const jobIds = params.get('jobId');
  const toApply = sessionStorage.getItem('is-applying');
  const getJobId = sessionStorage.getItem('jobId');
  const toApplyRoute = isApplying ?? toApply;
  const jobId = jobIds ?? getJobId;
  const [submitLogin] = useMutation(USER_LOGIN);
  const submitForm = (values: any) => {
    submitLogin({
      variables: { ...values, loginType: LOGIN_TYPE.DEFAULT },
    })
      .then((res) => {
        sessionStorage.setItem(API_TOKEN, res?.data?.signIn?.token);
        sessionStorage.setItem(
          USER_ROLE_KEY,
          JSON.stringify(res?.data?.signIn?.role),
        );
        if (!toApplyRoute) {
          navigate(appRoutes.DASHBOARD);
        } else {
          const role = Number(sessionStorage.getItem(USER_ROLE_KEY));
          if (role && role === USER_ROLE.CANDIDATE) {
            window.location.assign(
              `${process.env.REACT_APP_CMS_URL}/job-detail/${jobId}`,
            );
          } else {
            navigate(appRoutes.DASHBOARD);
          }
        }
      })
      .catch((error) => Notification({ type: 'error', message: error.message }));
    return null;
  };

  const [handleAuthUrl] = useMutation(LINKEDIN_AUTH_URL);

  const getSignInAuthUrl = (role: number) => {
    handleAuthUrl({ variables: { role } })
      .then((res) => {
        window.location.href = res?.data?.linkedinAuthURL;
      })
      .catch((error) => {
        Notification({ type: 'error', message: error?.message });
        navigate(appRoutes.HOME);
      });
  };

  return (
    <StyledForm
      name={LOGIN_FORM.NAME}
      form={form}
      onFinish={submitForm}
      validateMessages={validateMessage()}
    >
      <div className='modal-body-content'>
        <InputWrapper
          label={LOGIN_FORM.EMAIL.LABEL}
          name={LOGIN_FORM.EMAIL.NAME}
          rules={[
            { required: LOGIN_FORM.REQUIRED, type: LOGIN_FORM.EMAIL.TYPE },
          ]}
          inputHeight={LOGIN_FORM.STYLE.HEIGHT}
          labelMinWidth={LOGIN_FORM.STYLE.MIN_WIDTH}
        />
        <InputWrapper
          label={LOGIN_FORM.PASSWORD.LABEL}
          name={LOGIN_FORM.PASSWORD.NAME}
          rules={[{ required: LOGIN_FORM.REQUIRED }]}
          inputHeight={LOGIN_FORM.STYLE.HEIGHT}
          labelMinWidth={LOGIN_FORM.STYLE.MIN_WIDTH}
          isPasswordType={LOGIN_FORM.PASSWORD.TYPE}
        />
      </div>
      <div className='modal-footer'>
        <ButtonWrapper
          className={LOGIN_FORM.LOGIN.CLASS_NAME}
          htmlType='submit'
          onClick={() => {}}
        >
          {LOGIN_FORM.LOGIN.VALUE}
        </ButtonWrapper>
        <ButtonWrapper
          className={LOGIN_FORM.CANCEL.CLASS_NAME}
          onClick={onCancel}
        >
          {LOGIN_FORM.CANCEL.VALUE}
        </ButtonWrapper>
      </div>
      {!showButtons && (
        <div>
          <hr />
          <div className='linkedin-signin'>
            <button
              type='button'
              onClick={() => setShowButtons(true)}
              className='linkedin-logo-signin'
            >
              <img src={LinkedinSiginLogo} alt='linkedin logo' />
            </button>
          </div>
        </div>
      )}
      {showButtons && (
        <div className='link-btns'>
          <Button
            className='employer-btn'
            icon={<LinkedinFilled />}
            onClick={() => getSignInAuthUrl(USER_ROLE.EMPLOYER_SIGN_UP)}
          >
            Employer
          </Button>
          <Button
            className='candidate-btn'
            icon={<LinkedinFilled />}
            onClick={() => getSignInAuthUrl(USER_ROLE.CANDIDATE_SIGN_UP)}
          >
            Candidate
          </Button>
        </div>
      )}
    </StyledForm>
  );
};
export default LoginForm;
