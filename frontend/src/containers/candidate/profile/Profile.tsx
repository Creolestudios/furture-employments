import React, { FC, useEffect } from 'react';
import AppLayout from '../../../components/layout';
import candidateService from '../../../services/candidate/candidateService';
import CandidateProfileForm from '../../../components/candidate/candidateProfileForm';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';
import { ICandidateProfileQuery } from '../../../interfaces';
import CANDIDATE_PROFILE_FORM from '../../../constants/components/candidateProfileForm';
import StyledProfileScreen from './profile.styles';

const CandidateProfile: FC = () => {
  const {
    aboutCandidate,
    candidateProfile,
    user,
    loading,
    error,
  }: ICandidateProfileQuery = candidateService.useGetCandidateProfile();

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error?.message });
    }
  }, [error]);

  return (
    <AppLayout>
      <StyledProfileScreen>
        <h1 className='heading'>Update Profile</h1>
        {aboutCandidate && candidateProfile && user && (
          <CandidateProfileForm
            user={user}
            isUpdateProfile={CANDIDATE_PROFILE_FORM.UPDATE}
            profile={candidateProfile}
            about={aboutCandidate}
          />
        )}
        {loading && <Loader />}
      </StyledProfileScreen>
    </AppLayout>
  );
};
export default CandidateProfile;
