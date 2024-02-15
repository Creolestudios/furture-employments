import { gql } from '@apollo/client';

export const COUNTRY_LIST = gql`
  query {
    getList {
      country {
        id
        country
        code
        cities {
          id
          city
        }
      }
    }
  }
`;

export const LANGUAGE_GET_LIST = gql`
  query {
    getList {
      language {
        id
        languages
        code
      }
    }
  }
`;

export const JOB_LIST = gql`
  query {
    getList {
      JobCat {
        id
        JobCategory
      }
      JobType {
        id
        JobType
      }
    }
  }
`;
