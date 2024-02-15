import { gql } from '@apollo/client';

export const APPLICATION_APPROVED_BY_ADMIN = gql`
  mutation ($applicationId: Int!, $approveReason: String!) {
    applicationApprove(
      applicationId: $applicationId
      approveReason: $approveReason
    ) {
      message
    }
  }
`;

export const SHORTLIST_APPLICATION = gql`
  mutation ($applicationId: Int!) {
    shortListApplication(applicationId: $applicationId) {
      message
    }
  }
`;

export const ACCEPT_APPLICATION = gql`
  mutation ($applicationId: Int!) {
    acceptApplication(applicationId: $applicationId) {
      message
    }
  }
`;

export const REJECT_APPLICATION = gql`
  mutation ($rejectReason: String!, $applicationId: Int!) {
    rejectApplication(
      applicationId: $applicationId
      rejectReason: $rejectReason
    ) {
      message
    }
  }
`;
