const ADD_ADMIN_FORM = {
  FORM_NAME: 'addAdminForm',
  REQUIRED: true,
  FIRST_NAME: {
    LABEL: 'First Name',
    NAME: 'FirstName',
    MESSAGE: ' FirstName is required',
  },
  SURNAME: {
    LABEL: 'Surname',
    NAME: 'LastName',
    MESSAGE: ' Surname is required',
  },
  EMAIL: {
    LABEL: 'Email Address',
    NAME: 'Email',
    TYPE: 'email',
    MESSAGE: ' Email is required',
  },
  PASSWORD: {
    LABEL: 'Password',
    NAME: 'Password',
    PLACEHOLDER: 'min. 6 characters',
    MIN: 6,
    TYPE: true,
    MESSAGE: 'Password is required',
  },
  CONFIRM_PASSWORD: {
    LABEL: 'Confirm Password',
    NAME: 'ConfirmPassword',
    MIN: 6,
    VALIDATOR_MESSAGE: 'Your passwords do not match!',
    TYPE: true,
  },
  STYLE: {
    WRAPPER_COL_SPAN: 15,
    LABEL_COL_SPAN: 5,
  },
};

export default ADD_ADMIN_FORM;
