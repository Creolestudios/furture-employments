const RESET_PASSWORD_FORM = {
  NAME: 'reset-password',
  REQUIRED: true,
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
  RESET: {
    VALUE: 'Reset',
    HTML_TYPE: 'submit',
    CLASS_NAME: 'text-uppercase footer-btn login',
  },
  CANCEL: {
    VALUE: 'cancel',
    CLASS_NAME: 'text-uppercase footer-btn cancel',
  },
  STYLE: {
    HEIGHT: '40px',
    MIN_WIDTH: '145px',
  },
};

export default RESET_PASSWORD_FORM;
