import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_DETAIL } from '../../graphql/queries/users/UserQueries';
import {
  REGISTER_CANDIDATE,
  UPDATE_CANDIDATE_PROFILE,
  UPDATE_CV,
  UPDATE_JOB_PREFERENCE,
} from '../../graphql/mutations/candidate';
import {
  CANDIDATE_NOTES,
  GET_CANDIDATE_JOB_PREFERENCE,
  GET_CANDIDATE_PROFILE,
  GET_CV_CONTENT_URL,
  GET_CV_DETAIL,
} from '../../graphql/queries/candidateQueries';
import { ICvContentArgs } from '../../interfaces';

const useGetUserDetail = () => useQuery(GET_USER_DETAIL);

const useRegisterCandidate = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_CANDIDATE);

  return {
    register,
    loading,
    error,
    data,
  };
};

const useGetCandidateProfile = () => {
  const { data, loading, error } = useQuery(GET_CANDIDATE_PROFILE);
  let { aboutCandidate, candidateProfile, ...user } = data?.getCandidateProfile || {};

  if (!loading && aboutCandidate && candidateProfile && user) {
    const { __typename: aboutTypeName, ..._aboutCandidate } = aboutCandidate;
    const { __typename: profileTypeName, ..._candidateProfile } = candidateProfile;
    const { __typename: userTypeName, ..._user } = user;

    aboutCandidate = _aboutCandidate;
    candidateProfile = _candidateProfile;
    user = _user;
  }

  return {
    aboutCandidate,
    candidateProfile,
    user,
    loading,
    error,
  };
};

const useUpdateCandidateProfile = () => {
  const [update, { data, loading, error }] = useMutation(
    UPDATE_CANDIDATE_PROFILE,
  );

  return {
    update,
    loading,
    error,
    data,
  };
};

const useGetJobPreference = () => {
  const { data, loading, error } = useQuery(GET_CANDIDATE_JOB_PREFERENCE);
  const { __typename, ...preference } = data?.getCandidateJobPreference || {};

  return { preference, loading, error };
};

const useUpdateJobPreference = () => {
  const [update, { data, loading, error }] = useMutation(UPDATE_JOB_PREFERENCE);

  return {
    update,
    loading,
    error,
    data,
  };
};

const useGetCvDetail = () => useQuery(GET_CV_DETAIL);

const useUpdateCV = () => {
  const [update, { data, loading, error }] = useMutation(UPDATE_CV, {
    refetchQueries: [GET_CV_DETAIL],
  });

  return {
    update,
    loading,
    error,
    data,
  };
};

const useGetCvContentUrl = (cvContentArgs: ICvContentArgs) => useQuery(GET_CV_CONTENT_URL, {
  skip: !cvContentArgs.fetchQuery,
  variables: { cv: cvContentArgs.fileName },
});

const useCandidateNotes = () => {
  const { data, loading, error } = useQuery(CANDIDATE_NOTES);
  const { data: candidateNotes } = data?.candidateNotesList || {};
  return {
    candidateNotes,
    loading,
    error,
  };
};

const candidateService = {
  useGetUserDetail,
  useRegisterCandidate,
  useGetCandidateProfile,
  useUpdateCandidateProfile,
  useGetJobPreference,
  useUpdateJobPreference,
  useGetCvDetail,
  useUpdateCV,
  useGetCvContentUrl,
  useCandidateNotes,
};

export default candidateService;
