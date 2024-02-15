import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $role: Int!
    $loginType: Int!
  ) {
    createUser(
      userRegisterDto: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        role: $role
        loginType: $loginType
      }
    ) {
      message
      token
    }
  }
`;
export const USER_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    signIn(signInDto: { email: $email, password: $password }) {
      id
      token
      role
    }
  }
`;
export const LINKEDIN_LOGIN = gql`
  mutation ($code: String!, $role: Int!) {
    logInLinkedIn(code: $code, role: $role) {
      id
      role
      token
    }
  }
`;
export const LINKEDIN_AUTH_URL = gql`
  mutation ($role: Int!) {
    linkedinAuthURL(role: $role)
  }
`;
export const RESET_PASSWORD = gql`
  mutation ($password: String!, $confirmPassword: String!, $token: String!) {
    resetPassword(
      resetPasswordDto: {
        password: $password
        confirmPassword: $confirmPassword
        token: $token
      }
    ) {
      message
    }
  }
`;
export const FORGET_PASSWORD = gql`
  mutation ($email: String!) {
    forgetPassword(forgetPasswordDto: { email: $email }) {
      message
    }
  }
`;
