const SIGN_UP_FORM = {
  FORM_NAME: 'signup-form',
  REQUIRED: true,
  FIRST_NAME: {
    LABEL: 'First Name',
    NAME: 'firstName',
  },
  SURNAME: {
    LABEL: 'Surname',
    NAME: 'lastName',
  },
  EMAIL: {
    LABEL: 'Email Address',
    NAME: 'email',
    TYPE: 'email',
  },
  PASSWORD: {
    LABEL: 'Password',
    NAME: 'password',
    PLACEHOLDER: 'min. 6 characters',
    MIN: 6,
    TYPE: true,
  },
  CONFIRM_PASSWORD: {
    LABEL: 'Confirm Password',
    NAME: 'confirmPassword',
    MIN: 6,
    VALIDATOR_MESSAGE: 'Your passwords do not match!',
    TYPE: true,
  },
  STYLE: {
    WRAPPER_COL_SPAN: 15,
    LABEL_COL_SPAN: 5,
  },
  EMPLOYER_TITLE: "I'm an employer >>",
  CANDIDATE_TITLE: "I'm an candidate >>",
};

export default SIGN_UP_FORM;
