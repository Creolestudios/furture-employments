import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import {
  RUN_CAMPAIGN,
  UPDATE_CAMPAIGN,
  UPDATE_CAMPAIGN_STATUS,
  VACANCY_APPROVE,
  closeVacancyMutation,
  newVacancyMutation,
  updateVacancyMutation,
} from '../../graphql/mutations/vacancies';
import {
  CAMPAIGN_DETAILS,
  CAMPAIGN_LIST,
  VACANCIES_AWAITING_APPROVAL,
  VACANCIES_DETAILS,
  VACANCIES_DETAILS_FOR_CAMPAIGN,
  VACANCIES_LIST,
} from '../../graphql/queries/vacancies';
import { GET_APPLICATIONS_BY_EMPLOYER } from '../../graphql/queries/applicationQueries';
import { IPagination } from '../../interfaces';
import { getFullName } from '../../utils';
import { DATE_FORMAT } from '../../constants';

/* --------------------------------------- mutations--------------------------------------*/

export const useApproveVacancyService = () => {
  const [approveVacancy, { data, error, loading }] = useMutation(VACANCY_APPROVE);
  return {
    approveVacancy,
    loading,
    data,
    error,
  };
};

export const useRunCampaign = () => {
  const [runCampaign, { data, loading, error }] = useMutation(RUN_CAMPAIGN);

  return {
    runCampaign,
    data,
    loading,
    error,
  };
};

export const useCloseVacancyService = () => {
  const [closeVacancy, { data, error, loading }] = useMutation(closeVacancyMutation);

  return {
    closeVacancy,
    loading,
    data,
    error,
  };
};

export const useUpdateCampaign = () => {
  const [updateCampaign, { data, loading, error }] = useMutation(UPDATE_CAMPAIGN);

  return {
    updateCampaign,
    data,
    loading,
    error,
  };
};
export const useNewVacancyService = () => {
  const [newVacancy, { data, error, loading }] = useMutation(newVacancyMutation);

  return {
    newVacancy,
    loading,
    data,
    error,
  };
};

export const useUpdateCampaignStatus = () => {
  const [updateCampaignStatus, { data, loading, error }] = useMutation(
    UPDATE_CAMPAIGN_STATUS,
  );

  return {
    updateCampaignStatus,
    data,
    loading,
    error,
  };
};
export const useUpdateVacancyService = () => {
  const [editVacancy, { data, error, loading }] = useMutation(
    updateVacancyMutation,
  );

  return {
    editVacancy,
    loading,
    data,
    error,
  };
};

/* -------------------------------queries-----------------------------------*/
export function useAdminVacancyList(searchParams: any) {
  const { data, loading, error } = useQuery(VACANCIES_LIST, {
    variables: { searchParams },
  });
  const { data: vacancies, total } = data?.employersAllVacancies || {};
  return {
    vacancies: vacancies
      ? vacancies.map((vacancy: any) => ({
        id: vacancy.id,
        clientName: vacancy?.employer?.companyName,
        position: vacancy.position,
        createdAt: moment(vacancy.createdAt).format(DATE_FORMAT),
        applicationCount: vacancy.applicationCount,
        status: vacancy.status,
        employerId: vacancy?.employer?.id,
      }))
      : [],
    total,
    loading,
    error,
  };
}

export function useCampaignList(vacancyId: number) {
  const { data, loading, error } = useQuery(CAMPAIGN_LIST, {
    variables: { vacancyId },
  });
  const { data: campaigns } = data?.vacancyCampaignsList || {};

  return {
    data:
      campaigns && campaigns.length > 0
        ? campaigns.map((campaign: any) => ({
          ...campaign,
          startDate: moment(campaign.startDate).format(DATE_FORMAT),
          endDate: moment(campaign?.endDate).format(DATE_FORMAT),
        }))
        : [],
    loading,
    error,
  };
}

export function useCampaignDetails(campaignId: number) {
  return useQuery(CAMPAIGN_DETAILS, { variables: { campaignId } });
}

export function useVacancyDetails(vacancyId: number) {
  return useQuery(VACANCIES_DETAILS, {
    variables: { vacancyId },
  });
}

export function useVacancyDetailsForCampaign(vacancyId: number) {
  return useQuery(VACANCIES_DETAILS_FOR_CAMPAIGN, {
    variables: { vacancyId },
  });
}

export function useVacanciesAwaitingApproval() {
  const { data, loading, error } = useQuery(VACANCIES_AWAITING_APPROVAL);

  const { data: vacancies, total } = data?.getVacanciesAwaitingApproval || {};
  return {
    vacancies: vacancies
      ? vacancies.map((vacancy: any) => ({
        id: vacancy?.id,
        candidateName: getFullName(
          vacancy?.user?.firstName,
          vacancy?.user?.lastName,
        ),
        clientName: vacancy?.employer?.companyName,
        position: vacancy?.position,
        createdAt: moment(vacancy.createdAt).format(DATE_FORMAT),
        employerId: vacancy?.employer?.id,
      }))
      : [],
    total,
    loading,
    error,
  };
}

export const useApplicationsPerEmployer = ({ current, pageSize }: any) => {
  const { data, loading, error } = useQuery(GET_APPLICATIONS_BY_EMPLOYER, {
    variables: { current, pageSize },
  });
  const { totalPages, pageNo } = data?.getApplicationsByEmployer || {};

  return {
    applications: data?.getApplicationsByEmployer?.data
      ? data?.getApplicationsByEmployer?.data.map((application: any) => ({
        id: application.id,
        candidate_name: `${application?.user.firstName}  ${application?.user.lastName}`,
        status: [application.status],
        received_date: moment(application.createdAt).format('DD/MM/YYYY'),
        position: application.vacancy.position,
      }))
      : [],
    totalPages,
    pageNo,
    loading,
    error,
  };
};
