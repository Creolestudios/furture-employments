import { gql } from '@apollo/client';

export const VACANCIES_LIST = gql`
  query ($userId: Int, $searchParams: SearchVacancyDto) {
    employersAllVacancies(userId: $userId, searchParams: $searchParams) {
      data {
        id
        employer {
          id
          companyName
        }
        position
        createdAt
        status
        applicationCount
      }
      total
    }
  }
`;

export const VACANCIES_DETAILS = gql`
  query ($vacancyId: Float!) {
    vacancyDetails(vacancyId: $vacancyId) {
      position
      id
      category
      createdAt
      description
      workLocation
      additionalFileName
      employer {
        id
        companyName
        county
        addressLine1
        addressLine2
        city
        country
      }
      status
      type
      salary
      weeklyHours
      hideSalary
      campaigns {
        endDate
      }
    }
  }
`;

export const VACANCIES_DETAILS_FOR_CAMPAIGN = gql`
  query ($vacancyId: Float!) {
    vacancyDetails(vacancyId: $vacancyId) {
      position
      id
      description
    }
  }
`;

export const CAMPAIGN_LIST = gql`
  query ($vacancyId: Int!) {
    vacancyCampaignsList(vacancyId: $vacancyId) {
      data {
        id
        title
        startDate
        endDate
        status
      }
    }
  }
`;

export const CAMPAIGN_DETAILS = gql`
  query ($campaignId: Int!) {
    campaignDetails(campaignId: $campaignId) {
      id
      title
      slug
      description
      startDate
      endDate
      summary
      keyword
      featured
      status
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const VACANCIES_AWAITING_APPROVAL = gql`
  query {
    getVacanciesAwaitingApproval {
      data {
        id
        position
        createdAt
        user {
          firstName
          lastName
        }
        employer {
          id
          companyName
        }
      }
      total
    }
  }
`;
