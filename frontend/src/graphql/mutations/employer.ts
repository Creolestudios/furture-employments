import { gql } from '@apollo/client';

export const employerRegistrationMutation = gql`
  mutation (
    $userId: Float!
    $companyName: String!
    $addressLine1: String!
    $addressLine2: String!
    $county: String!
    $city: String!
    $postcode: String!
    $country: String!
    $description: String!
    $businessNature: String!
    $registrationNo: String!
    $vatNo: String!
    $phoneNumber: String!
  ) {
    employerRegistration(
      employerRegisterDto: {
        userId: $userId
        companyName: $companyName
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        county: $county
        city: $city
        postcode: $postcode
        country: $country
        description: $description
        businessNature: $businessNature
        registrationNo: $registrationNo
        vatNo: $vatNo
        phoneNumber: $phoneNumber
      }
    ) {
      message
      token
    }
  }
`;

export const updateEmployerProfileMutation = gql`
  mutation (
    $userId: Float!
    $companyName: String!
    $addressLine1: String!
    $addressLine2: String!
    $county: String!
    $city: String!
    $postcode: String!
    $country: String!
    $description: String!
    $registrationNo: String!
    $vatNo: String!
    $phoneNumber: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateEmployerProfile(
      userId: $userId
      profileDataDTO: {
        companyName: $companyName
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        county: $county
        city: $city
        postcode: $postcode
        country: $country
        description: $description
        registrationNo: $registrationNo
        vatNo: $vatNo
        phoneNumber: $phoneNumber
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      message
    }
  }
`;
