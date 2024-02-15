import { gql } from '@apollo/client';

export const employerDetailsQuery = gql`
  query ($userId: Int!) {
    getEmployerDetails(userId: $userId) {
      data {
        id
        companyName
        addressLine1
        addressLine2
        city
        county
        postcode
        description
        businessNature
        country
        registrationNo
        vatNo
        user {
          id
          firstName
          lastName
          email
          phoneNumber
        }
      }
    }
  }
`;
export const EMPLOYER_DETAILS_BY_ID = gql`
  query ($employerId: Int!) {
    getEmployerDetailsById(employerId: $employerId) {
      data {
        id
        companyName
        addressLine1
        addressLine2
        city
        county
        postcode
        description
        businessNature
        country
        registrationNo
        vatNo
        createdAt
        user {
          id
          firstName
          lastName
          email
          phoneNumber
        }
      }
    }
  }
`;
export const vacancyListQuery = gql`
  query ($searchParams: SearchVacancyDto, $userId: Int, $employerId: Int) {
    employersAllVacancies(
      userId: $userId
      searchParams: $searchParams
      employerId: $employerId
    ) {
      data {
        id
        employer {
          id
          companyName
          addressLine1
          addressLine2
          city
          county
          postcode
          country
          description
          businessNature
        }
        weeklyHours
        description
        salary
        type
        position
        category
        hideSalary
        status
        fileName
        applicationCount
        createdAt
        applications {
          id
          status
        }
      }
      total
    }
  }
`;
