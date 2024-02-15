const CANDIDATE_PROFILE_FORM = {
  FORM_NAME: 'candidateProfileForm',
  REQUIRED: true,
  UPDATE: true,
  UNDEFINED: undefined,
  FIRST_NAME: {
    LABEL: 'First Name',
    NAME: 'firstName',
    MAX: 100,
  },
  LAST_NAME: {
    LABEL: 'Surname',
    NAME: 'lastName',
    MAX: 100,
  },
  EMAIL: {
    LABEL: 'Email Address',
    NAME: 'email',
    TYPE: 'email',
    MAX: 100,
  },
  PHONE_NUMBER: {
    LABEL: 'Phone Number',
    NAME: 'phoneNumber',
    ERROR_MESSAGE: 'Phone Number is required!',
    PATTERN: /^[0-9]+$/,
  },
  ADDRESS1: {
    LABEL: 'Address Line 1',
    NAME: 'addressLine1',
    MAX: 255,
  },
  ADDRESS2: {
    LABEL: 'Address Line 2',
    NAME: 'addressLine2',
    MAX: 255,
  },
  CITY: {
    LABEL: 'Town/City',
    NAME: 'city',
    MAX: 50,
  },
  COUNTY: {
    LABEL: 'County',
    NAME: 'county',
    MAX: 100,
  },
  POSTCODE: {
    LABEL: 'Postcode',
    NAME: 'postcode',
    MAX: 20,
  },
  COUNTRY: {
    LABEL: 'Country',
    NAME: 'country',
    MAX: 50,
  },
  LANGUAGES: {
    LABEL: 'Languages',
    NAME: 'languages',
    MODE: 'multiple',
  },
  IS_CURRENTLY_EMPLOYED: {
    LABEL: 'Currently Employed?',
    NAME: 'isCurrentlyEmployed',
  },
  NOTICE_PERIOD: {
    LABEL: 'Notice Period',
    NAME: 'noticePeriodTime',
    NUMBER_TYPE: true,
    SUFFIX_NAME: 'noticePeriodType',
  },
  CURRENT_SALARY: {
    LABEL: 'Current Salary',
    NAME: 'currentSalary',
    MAX: 20,
  },
  LEAVING_REASON: {
    LABEL: 'Reason for Leaving',
    NAME: 'reasonForLeaving',
    ROW: 2,
    MAX: 255,
  },
  JOB_TYPE: {
    LABEL: 'Job Types',
    NAME: 'jobTypes',
    HELP_MESSAGE: 'Choose all that apply.',
  },
  DESIRED_SALARY: {
    LABEL: 'Desired Salary',
    NAME: 'desiredSalary',
  },
  RELOCATION: {
    LABEL: 'Willing to Relocate',
    NAME: 'relocation',
  },
  JOB_CATEGORY: {
    LABEL: 'Job Categories',
    NAME: 'categories',
    MODE: 'multiple',
    HELP_MESSAGE: 'Choose all that apply.',
    ERROR_MESSAGE: 'You must select at least 1 job category.',
  },
  CV_FILE: {
    LABEL: 'CV File',
    NAME: 'cv',
    MAX_COUNT: 1,
    ERROR_MESSAGE:
      'Please upload a CV or tick the checkbox to upload your CV later.',
    HELP_MESSAGE:
      'Please upload your CV in either Word, Open Document or PDF format.',
    UPDATE: {
      ERROR_MESSAGE:
        'CV file can not be empty and upload it in below mention format.',
    },
  },
  UPLOAD_CV_LATER: {
    NAME: 'isUploadCvLater',
    TITLE: 'I want to upload my CV later',
  },
  TERMS_CONDITION: {
    NAME: 'isTermsCondition',
    TITLE: 'I agree to the Future Employments',
    ERROR_MESSAGE: 'You must agree to our terms of business.',
    LINK_IN_TITLE: 'Terms of Business',
  },
  WORK_RIGHT: {
    NAME: 'hasWorkRight',
    TITLE: 'I can confirm and provide evidence of my right to work in the UK',
    LABEL: 'Right to Work',
    ERROR_MESSAGE:
      'You must confirm you can provide evidence of your right to work in the UK.',
  },
  PERMISSION_TO_ADMIN: {
    NAME: 'canAdminApply',
    TITLE: 'Can admin apply for a vacancy',
    LABEL: '',
  },
  CLASS_NAME: {
    PROFILE_FORM_ITEM: 'profile-form-item',
  },
  BUTTON: {
    CONTINUE: 'Continue',
    SAVE: 'Save Changes',
  },
  INITIAL_VALUES: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    languages: [],
    isCurrentlyEmployed: true,
    noticePeriodTime: '0',
    noticePeriodType: 0,
    currentSalary: '',
    reasonForLeaving: '',
    jobTypes: [],
    desiredSalary: '',
    relocation: [],
    categories: [],
    cv: null,
    isUploadCvLater: false,
    isTermsCondition: undefined,
    hasWorkRight: undefined,
    id: null,
  },
  IS_CURRENT_EMPLOYED_INITIAL: true,
  CV_INITIAL_VALUE: {
    cv: null,
  },
};

export default CANDIDATE_PROFILE_FORM;
