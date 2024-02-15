import React, { FC, useEffect } from 'react';
import AppLayout from '../../../components/layout';
import CandidateProfileForm from '../../../components/candidate/candidateProfileForm';
import candidateService from '../../../services/candidate/candidateService';
import CANDIDATE_PROFILE_FORM from '../../../constants/components/candidateProfileForm';
import Notification from '../../../components/common/Notification';
import Loader from '../../../components/common/loader';
import { IJobPreferenceQueryResponse } from '../../../interfaces';

import StyledJobPreferenceScreen from './job-preferences.styles';

const JobPreferences: FC = () => {
  const { useGetJobPreference } = candidateService;
  const { preference, loading, error }: IJobPreferenceQueryResponse = useGetJobPreference();

  useEffect(() => {
    if (error) {
      Notification({ type: 'error', message: error.message });
    }
  }, [error]);

  return (
    <AppLayout>
      <StyledJobPreferenceScreen>
        <h1 className='heading'>Job Preferences</h1>
        {preference && Object.keys(preference).length > 0 && (
          <CandidateProfileForm
            isUpdateJobPreference={CANDIDATE_PROFILE_FORM.UPDATE}
            preference={preference}
          />
        )}
        {loading && <Loader />}
      </StyledJobPreferenceScreen>
    </AppLayout>
  );
};

export default JobPreferences;
