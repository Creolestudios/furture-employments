const LOGIN_FORM = {
  NAME: 'login-form',
  REQUIRED: true,
  EMAIL: {
    NAME: 'email',
    LABEL: 'Email Address',
    TYPE: 'email',
  },
  PASSWORD: {
    NAME: 'password',
    LABEL: 'Password',
    TYPE: true,
  },
  LOGIN: {
    VALUE: 'log in',
    HTML_TYPE: 'submit',
    CLASS_NAME: 'text-uppercase footer-btn login',
  },
  CANCEL: {
    VALUE: 'cancel',
    CLASS_NAME: 'text-uppercase footer-btn cancel',
  },
  STYLE: {
    HEIGHT: '40px',
    MIN_WIDTH: '125px',
  },
};

export default LOGIN_FORM;
