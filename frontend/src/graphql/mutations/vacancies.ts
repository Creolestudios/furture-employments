import { gql } from '@apollo/client';

export const VACANCY_APPROVE = gql`
  mutation ($vacancyId: Int!) {
    approveVacancy(vacancyId: $vacancyId) {
      message
    }
  }
`;

export const newVacancyMutation = gql`
  mutation (
    $userId: Float!
    $upload_file: Upload
    $additional_file: Upload
    $category: String!
    $description: String!
    $workLocation: String!
    $hideSalary: Boolean!
    $position: String!
    $salary: String!
    $type: [String!]!
    $weeklyHours: Float!
  ) {
    newVacancy(
      userId: $userId
      uploadFile: $upload_file
      additionalFile: $additional_file
      vacancyDto: {
        category: $category
        description: $description
        workLocation: $workLocation
        hideSalary: $hideSalary
        position: $position
        salary: $salary
        type: $type
        weeklyHours: $weeklyHours
      }
    ) {
      message
      vacancyId
    }
  }
`;

export const updateVacancyMutation = gql`
  mutation ($vacancyId: Float!, $vacancyDto: VacancyEditDto!) {
    updateVacancy(vacancyId: $vacancyId, vacancyDto: $vacancyDto) {
      message
    }
  }
`;

export const RUN_CAMPAIGN = gql`
  mutation ($campaignsDto: CampaignsDTO!, $vacancyId: Int!) {
    startCampaign(vacancyId: $vacancyId, campaignsDto: $campaignsDto) {
      id
      message
    }
  }
`;

export const updateVacancyFileMutation = gql`
  mutation (
    $vacancyId: Float!
    $uploadFile: Upload
    $additionalFile: Upload
  ) {
    updateJobDescriptionFile(
      vacancyId: $vacancyId
      uploadFile: $uploadFile
      additionalFile: $additionalFile
    ) {
      message
    }
  }
`;

export const closeVacancyMutation = gql`
  mutation ($vacancyId: Int!, $closeReason: String!) {
    closeVacancy(vacancyId: $vacancyId, closeReason: $closeReason) {
      message
    }
  }
`;

export const GET_VACANCY_FILE = gql`
  query ($vacancyId: Float!) {
    downloadVacancyFile(vacancyId: $vacancyId) {
      filename
    }
  }
`;

export const UPDATE_CAMPAIGN = gql`
  mutation ($updateCampaignDto: UpdateCampaignDTO!) {
    updateCampaign(updateCampaignDto: $updateCampaignDto) {
      id
      message
    }
  }
`;

export const UPDATE_CAMPAIGN_STATUS = gql`
  mutation ($campaignId: Int!, $status: Float!) {
    updateCampaignStatus(campaignId: $campaignId, status: $status) {
      id
      message
    }
  }
`;
