import React, { FC } from 'react';
import AppLayout from '../../components/layout';

import StyledSignupScreen from './signup.styles';
import { Container } from '../../styles/globalStyles';
import ProfileForm from '../../components/profileForm';

const EmployerSignup: FC = () => (
  <AppLayout>
    <StyledSignupScreen>
      <Container style={{ display: 'block' }}>
        <div className='sigup-screen-header'>
          <h1 className='text-uppercase'>employer registration</h1>
        </div>
        <div className='signup-content'>
          <div className='signup-form-container'>
            <ProfileForm />
          </div>
          <div className='signup-help-widget'>
            <h3 className='text-uppercase'>WE CARE ABOUT YOUR PRIVACY</h3>
            <div className='widget-content'>
              <p>
                At Future Employments we take information protection very
                seriously.
              </p>
              <br />
              <p>
                Your information is never disclosed to third parties and we will
                only ever ask for information we feel is necessary to provide
                you a high level of service.
              </p>
              <br />
              <p>
                For more information please see our{' '}
                <a href='/' className='privacy-link'>
                  privacy policy.
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </StyledSignupScreen>
  </AppLayout>
);

export default EmployerSignup;
