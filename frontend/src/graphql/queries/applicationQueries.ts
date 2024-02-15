import { gql } from '@apollo/client';

export const APPLICATION_BY_VACANCY_ID = gql`
  query ($current: Int!, $pageSize: Int!, $vacancyId: Int!) {
    getApplicationByVacancy(
      current: $current
      pageSize: $pageSize
      vacancyId: $vacancyId
    ) {
      applications {
        id
        status
        user {
          firstName
          lastName
          email
        }
        vacancy {
          id
          weeklyHours
          createdAt
        }
        createdAt
      }
      pageNo
      total
    }
  }
`;

export const CANDIDATE_APPLICATIONS = gql`
  query ($current: Int!, $pageSize: Int!, $candidateId: Int) {
    getApplicationsForCandidate(
      current: $current
      pageSize: $pageSize
      candidateId: $candidateId
    ) {
      applications {
        id
        status
        createdAt
        vacancy {
          id
          position
        }
      }
      total
    }
  }
`;
export const ADMIN_APPLICATIONS = gql`
  query ($current: Int!, $pageSize: Int!) {
    getApplicationsForAdmin(current: $current, pageSize: $pageSize) {
      applications {
        id
        status
        user {
          id
          firstName
          lastName
          phoneNumber
        }
        vacancy {
          id
          position
          employer {
            companyName
            id
          }
        }
        aboutCandidate {
          id
        }
        createdAt
      }
      total
    }
  }
`;

export const CANDIDATE_APPLICATION_ADMIN_SIDE = gql`
  query ($current: Int!, $pageSize: Int!, $userId: Int!) {
    getCandidateApplicationsForAdmin(
      current: $current
      pageSize: $pageSize
      userId: $userId
    ) {
      applications {
        id
        status
        user {
          id
          firstName
          lastName
          phoneNumber
        }
        vacancy {
          position
          employer {
            id
            companyName
          }
        }
        createdAt
      }
      total
    }
  }
`;

export const CANDIDATE_APPLICATION = gql`
  query ($applicationId: Int!) {
    getCandidateApplicationDetail(applicationId: $applicationId) {
      id
      status
      approveReason
      createdAt
      vacancy {
        id
        position
      }
    }
  }
`;

export const GET_APPLICATION_AWAITING_APPROVAL = gql`
  query {
    getApplicationsWaitingForApproval {
      applications {
        id
        user {
          id
          firstName
          lastName
        }
        aboutCandidate {
          id
        }
        vacancy {
          employer {
            id
            companyName
          }
          id

          position
        }
        createdAt
      }
      total
    }
  }
`;

export const GET_APPLICATIONS_BY_EMPLOYER = gql`
  query ($current: Int!, $pageSize: Int!) {
    getApplicationsByEmployer(current: $current, pageSize: $pageSize) {
      data {
        id
        status
        reason
        user {
          firstName
          lastName
          id
          email
        }
        vacancy {
          id
          weeklyHours
          description
          salary
          type
          position
          category
          hideSalary
          status
          fileName
        }
        aboutCandidate {
          id
          cv
          futureProspectsCv
        }
        createdAt
      }
      pageNo
      totalPages
    }
  }
`;
export const GET_APPLICATIONS_DETAILS = gql`
  query ($applicationId: Int!) {
    getCandidateApplicationDetail(applicationId: $applicationId) {
      id
      status
      approvedBy
      createdAt
      approveReason
      vacancy {
        id
        weeklyHours
        description
        salary
        type
        position
        category
        employer {
          id
          companyName
        }
      }
      user {
        id
        firstName
        email
        lastName
        phoneNumber
      }
      profile {
        id
        addressLine1
        addressLine2
        city
        county
        postcode
        country
      }
      about {
        id
        cv
        futureProspectsCv
        updatedAt
      }
    }
  }
`;
export const FUTURE_PROSPECTS_CV_DETAILS = gql`
  query ($profileId: Int!) {
    futureProspectCvDetail(profileId: $profileId) {
      data {
        id
        firstName
        lastName
        aboutCandidate {
          id
          cv
          futureProspectsCv
        }
        candidateProfile {
          id
        }
      }
    }
  }
`;
