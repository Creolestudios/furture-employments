import React, { FC } from 'react';
import AppLayout from '../../../components/layout';
import HomeScreenWrapper from '../../Home/home.styles';
import { Container } from '../../../styles/globalStyles';
import ResetPasswordForm from '../../../components/home/resetPasswordForm';
import { ResetPasswordWrapper } from './ResetPasswordWrapper';

const ResetPassword: FC = () => (
  <AppLayout>
    <HomeScreenWrapper>
      <Container>
        <ul className='breadcrumb-section'>
          <li className='text-uppercase'>future Employments</li>
          <li>&gt;</li>
          <li className='text-uppercase'>reset password</li>
        </ul>
      </Container>
      <ResetPasswordWrapper>
        <div className='title'>
          <h3>Reset Password</h3>
        </div>
        <ResetPasswordForm />
      </ResetPasswordWrapper>
    </HomeScreenWrapper>
  </AppLayout>
);

export default ResetPassword;
