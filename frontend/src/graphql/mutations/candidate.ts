import { gql } from '@apollo/client';

export const REGISTER_CANDIDATE = gql`
  mutation (
    $userArgs: CandidateUser!
    $profileArgs: CandidateProfileDTO!
    $aboutArgs: AboutCandidateDTO!
    $jobPreferenceArgs: CandidateJobPreferenceDto!
    $userId: Int!
    $cv: Upload
  ) {
    candidateRegistration(
      userArgs: $userArgs
      profileArgs: $profileArgs
      aboutArgs: $aboutArgs
      jobPreferenceArgs: $jobPreferenceArgs
      userId: $userId
      cv: $cv
    ) {
      message
      role
      token
    }
  }
`;

export const UPDATE_CANDIDATE_PROFILE = gql`
  mutation (
    $userInfoArgs: UpdateUserBasicSignupDto!
    $profileArgs: UpdateCandidateProfileDto!
    $aboutArgs: UpdateAboutCandidateDto!
    $userId: Int!
  ) {
    updateCandidateProfile(
      userInfoArgs: $userInfoArgs
      profileArgs: $profileArgs
      aboutArgs: $aboutArgs
      userId: $userId
    ) {
      message
    }
  }
`;

export const UPDATE_JOB_PREFERENCE = gql`
  mutation (
    $jobPreferenceId: Int!
    $jobPreferenceArgs: UpdateCandidateJobPreferenceDto!
  ) {
    updateJobPreference(
      jobPreferenceId: $jobPreferenceId
      jobPreferenceArgs: $jobPreferenceArgs
    ) {
      message
    }
  }
`;

export const UPDATE_CV = gql`
  mutation ($userId: Int!, $cv: Upload) {
    updateCV(userId: $userId, cv: $cv) {
      message
    }
  }
`;

export const UPDATE_FUTURE_PROSPECTS_CV = gql`
  mutation ($aboutId: Int!, $futureProspectsCv: String!) {
    updateCandidateFutureProspectsCv(
      aboutId: $aboutId
      futureProspectsCv: $futureProspectsCv
    ) {
      message
    }
  }
`;
