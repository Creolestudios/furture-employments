const FORGET_PASSWORD_FORM = {
  NAME: 'forgot-password',
  EMAIL: {
    NAME: 'email',
    LABEL: 'Email',
    TYPE: 'email',
    REQUIRED: true,
  },
  LOGIN: {
    VALUE: 'reset password',
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

export default FORGET_PASSWORD_FORM;
