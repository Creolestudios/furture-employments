import { gql } from '@apollo/client';

export const SEARCH_CLIENT = gql`
  query ($searchParams: SearchClientDto!) {
    searchClients(searchParams: $searchParams) {
      data {
        id
        companyName
        addressLine1
        addressLine2
        city
        county
        postcode
        country
        description
        registrationNo
        vatNo
        createdAt
        updatedAt
        deletedAt
        user {
          email
          firstName
          lastName
          phoneNumber
        }
      }
      total
      current
    }
  }
`;

export const SEARCH_CANDIDATE = gql`
  query ($searchParams: SearchCandidateDto!) {
    searchCandidate(searchParams: $searchParams) {
      data {
        id
        user {
          id
          firstName
          lastName
          email
          phoneNumber
        }
        city
        postcode
        createdAt
        jobPreference {
          desiredSalary
        }
      }
      current
      total
    }
  }
`;

export const CANDIDATE_DETAIL_FOR_ADMIN = gql`
  query ($candidateId: Int!, $applicationId: Int) {
    candidateDetail(candidateId: $candidateId, applicationId: $applicationId) {
      data {
        id
        firstName
        lastName
        email
        phoneNumber
        applications {
          approveReason
        }
        jobPreference {
          desiredSalary
          jobTypes
          categories
          relocation
          canAdminApply
        }
        aboutCandidate {
          id
          languages
          noticePeriodTime
          noticePeriodType
          currentSalary
          reasonForLeaving
          futureProspectsCv
          cv
        }
        candidateProfile {
          id
          addressLine1
          addressLine2
          country
          city
          county
          postcode
          createdAt
        }
      }
    }
  }
`;
export const CANDIDATE_SKILLS_DETAIL = gql`
  query ($candidateId: Int!) {
    candidateDetail(candidateId: $candidateId) {
      data {
        id
        firstName
        lastName
        aboutCandidate {
          id
          skills
        }
        candidateProfile {
          id
        }
        createdAt
      }
    }
  }
`;
export const CANDIDATE_NOTES_BY_ADMIN = gql`
  query ($candidateId: Int!) {
    adminNotesForCandidate(candidateId: $candidateId) {
      data {
        description
        id
        createdAt
      }
    }
  }
`;
export const CANDIDATE_NOTES_BY_ID = gql`
  query ($notesId: Int!) {
    getNotesById(notesId: $notesId) {
      data {
        description
        id
      }
    }
  }
`;

export const ADMIN_NOTES_FOR_EMPLOYER = gql`
  query ($employerId: Int!) {
    adminNotesForEmployer(employerId: $employerId) {
      data {
        description
        id
        createdAt
      }
    }
  }
`;

export const ADMIN_NOTES_BY_ID_FOR_EMPLOYER = gql`
  query ($notesId: Int!) {
    adminNotesByIdForEmployer(notesId: $notesId) {
      data {
        description
        id
      }
    }
  }
`;

export const ADMIN_LIST = gql`
  query {
    allAdminList {
      data {
        email
        firstName
        lastName
        email
        role
        disableAdmin
        id
      }
      total
    }
  }
`;

export const ADMIN_DETAILS = gql`
  query ($userId: Int!) {
    adminDetails(userId: $userId) {
      email
      firstName
      lastName
      id
      disableAdmin
      role
    }
  }
`;
export const GET_SKILLS = gql`
  query ($searchSkill: String!) {
    getSkills(searchSkill: $searchSkill) {
      data {
        id
        skill
      }
    }
  }
`;
export const GET_PDF_TO_MARKDOWN_TEXT = gql`
  query ($fileName: String!) {
    getPdfToMarkdownText(fileName: $fileName) {
      pdfText
    }
  }
`;

export const SEARCH_PROSPECT_CLIENT = gql`
  query ($searchParams: SearchProspectsClientsDto!) {
    getProspectClients(searchParams: $searchParams) {
      data {
        id
        status
        companyName
        personAssigned
        reminderType
        reminderDate
      }
      total
      current
    }
  }
`;

export const PROSPECT_CLIENT_DETAILS = gql`
  query ($prospectClientId: Float!) {
    getProspectClientDetails(prospectClientId: $prospectClientId) {
      data {
        id
        companyName
        website
        address {
          id
          addressLine1
          addressLine2
          city
          county
          postcode
          converted
          country
          createdAt
          updatedAt
          deletedAt
        }
        people {
          id
          firstName
          lastName
          jobTitle
          email
          mobileNumber
          phoneNumber
          extension
          converted
          createdAt
          updatedAt
          deletedAt
        }
        description
        personAssigned
        notes
        status
        reminderNote
        user {
          id
        }
        additionalEmails
        reminderType
        reminderDate
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export const PROSPECT_CLIENT_TIMELINE = gql`
  query ($prospectClientId: Float!) {
    getProspectTimeline(prospectClientId: $prospectClientId) {
      data {
        id
        prospectClientId
        timelineDescription
        createdAt
      }
    }
  }
`;
