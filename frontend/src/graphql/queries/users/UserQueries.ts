import { gql } from '@apollo/client';

export const USER_NAME = gql`
  query {
    getUserDetails {
      id
      firstName
      lastName
      profileImage
      email
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query {
    getUserDetails {
      id
      firstName
      lastName
      email
      phoneNumber
      role
    }
  }
`;
