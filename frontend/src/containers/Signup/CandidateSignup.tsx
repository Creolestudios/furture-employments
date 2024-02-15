import React, { FC, useEffect } from 'react';
import AppLayout from '../../components/layout';
import CandidateProfileForm from '../../components/candidate/candidateProfileForm';
import Loader from '../../components/common/loader';
import Notification from '../../components/common/Notification';
import { IUserDetailQuery } from '../../interfaces';
import candidateService from '../../services/candidate/candidateService';

import StyledCandidateSignup from './candidate-signup.styles';
import { Container } from '../../styles/globalStyles';

const CandidateSignup: FC = () => {
  const {
    data: user,
    loading,
    error,
  }: IUserDetailQuery = candidateService.useGetUserDetail();

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error.message });
    }
  }, [error]);

  return (
    <AppLayout>
      <Container>
        <StyledCandidateSignup>
          <div className='candidate-signup'>
            <h1>CANDIDATE REGISTRATION</h1>
            <div className='container'>
              <div className='left'>
                {user && <CandidateProfileForm user={user.getUserDetails} />}
                {loading && <Loader />}
              </div>
              <div className='right'>
                <div className='widget'>
                  <h3>we care about your privacy</h3>
                  <div className='widget-content'>
                    <p>
                      At Future Employments we take information protection very
                      seriously.
                    </p>
                    <p>
                      Your informatiion is never disclosed to third parties and
                      we will only ever ask for information we feel is necessary
                      to provide you a high level of service.
                    </p>
                    <p>
                      For more information please see our
                      <a href='/'>privacy policy.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StyledCandidateSignup>
      </Container>
    </AppLayout>
  );
};

export default CandidateSignup;
