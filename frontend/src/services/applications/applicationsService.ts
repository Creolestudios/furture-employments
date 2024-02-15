import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import {
  ADMIN_APPLICATIONS,
  APPLICATION_BY_VACANCY_ID,
  CANDIDATE_APPLICATIONS,
  CANDIDATE_APPLICATION,
  GET_APPLICATION_AWAITING_APPROVAL,
  GET_APPLICATIONS_DETAILS,
  CANDIDATE_APPLICATION_ADMIN_SIDE,
} from '../../graphql/queries/applicationQueries';
import { IPagination } from '../../interfaces';
import {
  ACCEPT_APPLICATION,
  APPLICATION_APPROVED_BY_ADMIN,
  REJECT_APPLICATION,
  SHORTLIST_APPLICATION,
} from '../../graphql/mutations/application';
import { DATE_FORMAT } from '../../constants';

export function useGetApplicationsForVacancy({
  current,
  pageSize,
  vacancyId,
}: any) {
  const { data, loading, error } = useQuery(APPLICATION_BY_VACANCY_ID, {
    variables: { vacancyId, current, pageSize },
  });

  const { applications, total, pageNo } = data?.getApplicationByVacancy || {};

  return {
    applications: applications
      ? applications.map((application: any) => ({
        applicationId: application.id,
        key: application.id,
        status: application.status,
        candidate_name: `${application.user?.firstName} ${application.user?.lastName}`,
        email: application.user?.email,

        applied_date: moment(application?.createdAt).format(DATE_FORMAT),
      }))
      : [],
    total,
    pageNo,
    loading,
    error,
  };
}

export const useGetCandidateApplications = ({
  current,
  pageSize,
  candidateId,
}: any) => {
  const { data, loading, error } = useQuery(CANDIDATE_APPLICATIONS, {
    variables: { current, pageSize, candidateId },
  });
  const { applications, total } = data?.getApplicationsForCandidate || {};

  return {
    applications: applications
      ? applications.map((application: any) => ({
        id: application.id,
        status: application.status,
        createdAt: moment(application.createdAt).format(DATE_FORMAT),
        position: application.vacancy.position,
        vacancyId:application.vacancy.id,
      }))
      : applications,
    total,
    loading,
    error,
  };
};

export const useGetApplicationList = ({ current, pageSize }: IPagination) => {
  const { data, loading, error } = useQuery(ADMIN_APPLICATIONS, {
    variables: {
      current,
      pageSize,
    },
  });

  const { applications, total } = data?.getApplicationsForAdmin || {};

  return {
    applications: applications
      ? applications.map((application: any) => ({
        id: application?.id,
        candidateName: `${application?.user?.firstName} ${application?.user?.lastName}`,
        position: application?.vacancy?.position,
        clientName: application?.vacancy?.employer?.companyName,
        phoneNumber: application?.user.phoneNumber,
        createdAt: moment(application?.createdAt).format(DATE_FORMAT),
        status: application?.status,
        employerId: application?.vacancy?.employer?.id,
        candidateId: application?.aboutCandidate?.id,
        vacancyId: application?.vacancy?.id,
      }))
      : [],
    total,
    loading,
    pageSize,
    error,
  };
};

export const useGetApplicationListAdminside = ({
  current,
  pageSize,
  userId,
}: any) => {
  const { data, loading, error } = useQuery(CANDIDATE_APPLICATION_ADMIN_SIDE, {
    variables: {
      current,
      pageSize,
      userId,
    },
  });

  const { applications, total } = data?.getCandidateApplicationsForAdmin || {};

  return {
    applications: applications
      ? applications.map((application: any) => ({
        id: application?.id,
        clientName: application?.vacancy?.employer?.companyName,
        position: application?.vacancy?.position,
        createdAt: moment(application?.createdAt).format(DATE_FORMAT),
        status: application?.status,
      }))
      : [],
    total,
    loading,
    pageSize,
    error,
  };
};

export const useGetApplicationWaitingForApproval = () => {
  const { data, loading, error } = useQuery(GET_APPLICATION_AWAITING_APPROVAL);
  const { applications, total } = data?.getApplicationsWaitingForApproval || {};
  return {
    applications: applications
      ? applications.map((application: any) => ({
        id: application?.id,
        candidateName: `${application?.user?.firstName} ${application?.user?.lastName}`,
        candidateId: application?.aboutCandidate?.id,
        position: application?.vacancy?.position,
        clientName: application?.vacancy?.employer?.companyName,
        vacancyId: application?.vacancy?.id,
        employerId: application?.vacancy?.employer?.id,
        createdAt: moment(application?.createdAt).format(DATE_FORMAT),
      }))
      : [],
    total,
    loading,
    error,
  };
};

export const useApproveApplicationByAdmin = () => {
  const [applicationApprove, { data, loading, error }] = useMutation(
    APPLICATION_APPROVED_BY_ADMIN,
  );
  return {
    applicationApprove,
    message: data?.applicationApprove?.message,
    loading,
    error,
  };
};

export const useGetCandidateApplication = (applicationId: number | null) => {
  const { data, loading, error } = useQuery(CANDIDATE_APPLICATION, {
    variables: { applicationId },
  });

  const { ...application } = data?.getCandidateApplicationDetail || {};

  return { application, loading, error };
};

export const useGetApplicationsDetails = ({ applicationId }: any) => {
  const { data, loading, error } = useQuery(GET_APPLICATIONS_DETAILS, {
    variables: { applicationId },
  });
  const details = data?.getCandidateApplicationDetail || {};

  return {
    details: {
      ...details,
      createdAt: moment(details?.createdAt).format(DATE_FORMAT),
    },
    loading,
    error,
  };
};

export const useShortlistApplication = () => {
  const [applicationShortlist, { data, loading, error }] = useMutation(
    SHORTLIST_APPLICATION,
  );

  return {
    applicationShortlist,
    loading,
    error,
    data,
  };
};

export const useAcceptApplication = () => {
  const [applicationAccept, { data, loading, error }] = useMutation(ACCEPT_APPLICATION);

  return {
    applicationAccept,
    loading,
    error,
    data,
  };
};

export const useRejectApplication = () => {
  const [applicationReject, { data, loading, error }] = useMutation(REJECT_APPLICATION);

  return {
    applicationReject,
    loading,
    error,
    data,
  };
};
