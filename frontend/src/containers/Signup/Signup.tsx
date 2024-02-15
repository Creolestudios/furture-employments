import React, { FC } from 'react';
import AppLayout from '../../components/layout';
import SignupForm from '../../components/signup/signupForm';

import StyledSignupScreen from './signup.styles';
import { Container } from '../../styles/globalStyles';

const Signup: FC = () => (
  <AppLayout>
    <StyledSignupScreen>
      <Container style={{ display: 'block' }}>
        <div className='sigup-screen-header'>
          <h1 className='text-uppercase'>sign up</h1>
        </div>
        <div className='signup-content'>
          <div className='signup-form-container'>
            <SignupForm />
          </div>
          <div className='signup-help-widget'>
            <h3 className='text-uppercase'>sign up help</h3>
            <div className='widget-content'>
              <h5>Register as a Candidate</h5>
              <p>
                If you are looking for a job and want to apply for jobs online.
              </p>
              <h5>Register as an Employer</h5>
              <p>
                If you are a business and want to post vacancies and track
                applicants online.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </StyledSignupScreen>
  </AppLayout>
);

export default Signup;
