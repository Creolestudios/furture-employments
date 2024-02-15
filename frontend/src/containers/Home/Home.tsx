import React, { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, FormInstance } from 'antd';
import AppLayout from '../../components/layout';
import ModalWrapper from '../../components/common/modalWrapper';
import ButtonWrapper from '../../components/common/formElements/buttonWrapper';
import LoginForm from '../../components/home/loginForm';
import ForgetPasswordForm from '../../components/home/forgetPasswordForm';
import HOME from '../../constants/containers/home';
import APP_ROUTES from '../../constants/appRoutes';

import LOGO from '../../assets/images/logo.svg';
import HomeScreenWrapper from './home.styles';
import { Container } from '../../styles/globalStyles';

const Login: FC = () => {
  const navigate = useNavigate();
  const [loginForm] = Form.useForm() as [FormInstance];
  const [showButtons, setShowButtons] = useState(false);
  const [forgetPasswordForm] = Form.useForm() as [FormInstance];

  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);

  const handleLoginModal = () => {
    loginForm.resetFields();
    setIsLoginOpen(!isLoginOpen);
  };

  const handleForgetPasswordModal = () => {
    forgetPasswordForm.resetFields();
    setIsPasswordOpen(!isPasswordOpen);
  };
  const handleRegister = () => navigate(APP_ROUTES.CREATE_ACCOUNT);

  return (
    <AppLayout>
      <HomeScreenWrapper>
        <Container style={{ maxWidth: 'none' }}>
          <ul className='breadcrumb-section'>
            <li className='text-uppercase' style={{ cursor: 'pointer' }}>
              future Employments
            </li>
            <li>&gt;</li>
            <li className='text-uppercase'>log in</li>
          </ul>
        </Container>
        <div className='banner-section'>
          <div className='title'>YOUR FUTURE EMPLOYMENTS ACCOUNT</div>
          <div className='descriptiion'>
            Register an account today or simply log in to your current profile.
          </div>
        </div>
        <div className='content-section'>
          <NavLink to='' onClick={handleLoginModal}>
            <img src={LOGO} alt='future-employments-logo' />
          </NavLink>
          <div className='login-container'>
            <ButtonWrapper
              className='text-uppercase auth-btn'
              onClick={handleLoginModal}
            >
              {`> ${HOME.LOGIN_BUTTON}`}
            </ButtonWrapper>
            <ButtonWrapper
              className='text-uppercase auth-btn'
              onClick={handleForgetPasswordModal}
            >
              {`> ${HOME.FORGOTTEN_PASSWORD_BUTTON}`}
            </ButtonWrapper>
          </div>
          <p>
            If you don&apos;t already have an account with Future Employments,
            click below to register your details
          </p>
          <ButtonWrapper
            className='text-uppercase auth-btn'
            onClick={handleRegister}
          >
            {`> ${HOME.REGISTER_BUTTON}`}
          </ButtonWrapper>
        </div>
        <ModalWrapper
          isOpen={isLoginOpen}
          title={HOME.LOGIN_MODAL_TITLE}
          onCancel={handleLoginModal}
          onOk={() => {}}
        >
          <LoginForm
            onCancel={handleLoginModal}
            form={loginForm}
            showButtons={showButtons}
            setShowButtons={setShowButtons}
          />
        </ModalWrapper>
        <ModalWrapper
          isOpen={isPasswordOpen}
          title={HOME.FORGOT_PASSWORD}
          onCancel={handleForgetPasswordModal}
          onOk={() => {}}
        >
          <ForgetPasswordForm
            onCancel={handleForgetPasswordModal}
            form={forgetPasswordForm}
          />
        </ModalWrapper>
      </HomeScreenWrapper>
    </AppLayout>
  );
};

export default Login;
