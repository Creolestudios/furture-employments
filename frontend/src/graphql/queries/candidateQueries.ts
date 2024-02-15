import { gql } from '@apollo/client';

export const GET_CANDIDATE_PROFILE = gql`
  query {
    getCandidateProfile {
      id
      firstName
      lastName
      email
      phoneNumber
      role
      candidateProfile {
        addressLine1
        addressLine2
        city
        county
        postcode
        country
      }
      aboutCandidate {
        languages
        isCurrentlyEmployed
        noticePeriodTime
        noticePeriodType
        currentSalary
        reasonForLeaving
      }
    }
  }
`;

export const GET_CANDIDATE_JOB_PREFERENCE = gql`
  query {
    getCandidateJobPreference {
      id
      jobTypes
      desiredSalary
      categories
      relocation
      canAdminApply
    }
  }
`;

export const GET_CV_DETAIL = gql`
  query {
    getCVDetails {
      id
      fileName
      updatedAt
    }
  }
`;
export const GET_CV_CONTENT_URL = gql`
  query ($cv: String!) {
    getCvContentUrl(cv: $cv) {
      url
      fileName
    }
  }
`;
export const CANDIDATE_NOTES = gql`
  query {
    candidateNotesList {
      data {
        description
        id
      }
    }
  }
`;
