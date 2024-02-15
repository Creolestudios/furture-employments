import { Colors } from '../styles/variable';

export const API_TOKEN = 'api-token';
export const USER_ROLE_KEY = 'user-role';

export const USER_ID_KEY = 'fp-user-id';
export const USER_ROLE = {
  CANDIDATE: 1,
  EMPLOYER: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
  CANDIDATE_SIGN_UP: 5,
  EMPLOYER_SIGN_UP: 6,
};
export const ADD_ADMIN = {
  MESSAGE: 'You are not authorized to add an admin.',
};
export const LOGIN_TYPE = {
  DEFAULT: 1,
  LINKEDIN: 2,
};
export const HEADER_OPTIONS = [
  { label: 'Find a Job', key: 'findJob', value: 'job-search' },
  { label: 'Candidates', key: 'candidates', value: 'candidates' },
  { label: 'Employers', key: 'employers', value: 'employers' },
  { label: 'Training', key: 'training', value: 'training' },
  { label: 'News', key: 'news', value: 'news' },
  { label: 'Resources', key: 'resources', value: 'resources' },
  { label: 'Our Team', key: 'meet-our-team', value: 'meet-our-team' },
  { label: 'Contact Us', key: 'contact', value: 'contact' },
];

export const USEFUL_LINKS = [
  { label: 'Find a Job', key: 'findJob', value: 'job-search' },
  { label: 'Candidates', key: 'candidates', value: 'candidates' },
  { label: 'Employers', key: 'employers', value: 'employers' },
  { label: 'Training', key: 'training', value: 'training' },
  { label: 'News', key: 'news', value: 'news' },
];

export const APPLICATION_STATUS = [
  {
    status: 2,
    name: 'Open',
    desc: 'The job application is awaiting review by the employer.',
    color: `${Colors.PANTONE_BLACK_33}`,
  },
  {
    status: 1,
    name: 'Unapproved',
    desc: 'The job application has not yet been approved by Future Employments.',
    color: '#f89406',
  },
  {
    status: 4,
    name: 'Accepted',
    desc: 'The job application has been accepted by the employer.',
    color: '#468847',
  },
  {
    status: 5,
    name: 'Unsuccessful',
    desc: 'The job application was not successful on this occasion.',
    color: `${Colors.PANTONE_BLACK_66}`,
  },
  {
    status: 3,
    name: 'Shortlisted',
    desc: 'The job application has been added to the employer shortlist.',
    color: '#3a87ad',
  },
];

export const APPLICATION_STATUS_TYPE = {
  unapproved: 1,
  open: 2,
  shortlisted: 3,
  accepted: 4,
  unsuccessful: 5,
};
export const VACANCY_STATUS = [
  {
    status: 1,
    name: 'Unapproved',
    desc: 'The vacancy has not yet been approved by your Future Employments account manager.',
    color: '#f89406',
  },
  {
    status: 2,
    name: 'Open',
    desc: 'The vacancy is open and accepting applications via our public campaigns.',
    color: `${Colors.PANTONE_BLACK_33}`,
  },
  {
    status: 3,
    name: 'Closed',
    desc: 'The vacancy has been closed either by you or your Future Employments account manager.',
    color: `${Colors.PANTONE_BLACK_66}`,
  },
];

export const VALIDATE_MESSAGE = {
  REQUIRED: '${label} is required!',
  EMAIL: 'The ${label} you entered is invalid!',
  MIN: '${label} should be ${min} characters or more in length!',
  MAX: '${label} must be up to ${max} characters!',
  NUMBER: 'The ${label} should be only number!',
};

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'dutch', label: 'Dutch' },
  { value: 'french', label: 'French' },
];
export const SALARY_RANGE_LIST = [
  { value: 'Up to £15,000', label: 'Up to £15,000', key: 0 },
  { value: '£15,001 - £20,000', label: '£15,001 - £20,000', key: 1 },
  { value: '£20,001 - £25,000', label: '£20,001 - £25,000', key: 2 },
  { value: '£25,001 - £30,000', label: '£25,001 - £30,000', key: 3 },
  { value: '£30,001 - £40,000', label: '£30,001 - £40,000', key: 4 },
  { value: '£40,001 - £50,000', label: '£40,001 - £50,000', key: 5 },
  { value: '£50,001 - £60,000', label: '£50,001 - £60,000', key: 6 },
  { value: '£60,001 +', label: '£60,001 +', key: 7 },
];
export const JOB_TYPES = [
  { label: 'Full Time', value: 'Full Time' },
  { label: 'Part Time', value: 'Part Time' },
  { label: 'Permanent', value: 'Permanent' },
  { label: 'Contract', value: 'Contract' },
];
export const SELECT_RELOCATION = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes-Locally' },
  { value: 'yes-abroad', label: 'Yes-Internationally' },
];

export const SELECT_CURRENCY = [
  { value: '£', label: '£' },
  { value: '€', label: '€' },
  { value: '$', label: '$' },
];

export const JOB_CATEGORIES = [
  { value: 'Admin, Secretarial, PA', label: 'Admin, Secretarial, PA' },
  { value: 'Customer Service', label: 'Customer Service' },
  { value: 'Estate Agency', label: 'Estate Agency' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Marketing and PR', label: 'Marketing and PR' },
  { value: 'Purchasing', label: 'Purchasing' },
  {
    value: 'Motoring and Automotive',
    label: 'Motoring and Automotive',
  },
  { value: 'Sales', label: 'Sales' },
  {
    value: 'Training, Internship, Apprenticeship Schemes',
    label: 'Training, Internship, Apprenticeship Schemes',
  },
  { value: 'I.T.', label: 'I.T.' },
  {
    value: 'Transport and Logistics',
    label: 'Transport and Logistics',
  },
  { value: 'Finance', label: 'Finance' },
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Warehousing', label: 'Warehousing' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Catering Assistant', label: 'Catering Assistant' },
  { value: 'Catering Management', label: 'Catering Management' },
  { value: 'Chef', label: 'Chef' },
  { value: 'Other', label: 'Other' },
];

export const CANDIDATE_SORT_BY = [
  { value: 'createdAt ASC', label: 'Registration Date ASC' },
  { value: 'createdAt DESC', label: 'Registration Date DESC' },
  { value: 'city ASC', label: 'Location ASC' },
  { value: 'desiredSalary ASC', label: 'Salary ASC' },
  { value: 'desiredSalary DESC', label: 'Salary DESC' },
];
export const COUNTRY = [
  {
    label: 'USA',
    value: 'USA',
  },

  {
    label: 'UK',
    value: 'UK',
  },
];
export const CITY = [{ label: 'Birmingham', value: 'Birmingham' }];
export const NOTICE_PERIOD_TYPES = [
  { label: 'Days', value: 0, key: 0 },
  { label: 'Weeks', value: 1, key: 1 },
  { label: 'Months', value: 2, key: 2 },
  { label: 'Years', value: 3, key: 3 },
];

export const RELOCATION_LIST = [
  { label: 'No', value: 1 },
  { label: 'Locally', value: 2 },
  { label: 'Internationally', value: 3 },
];

export const ALLOWED_FILE_FORMATS = [
  'pdf',
  'docx',
  'txt',
  'vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const CAMPAIGN_STATUS = {
  START: 1,
  STOP: 2,
};

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_MONTH_FORMAT = 'MM/DD/YYYY';
export const VACANCIES_STATUS = {
  UNAPPROVED: 1,
  OPEN: 2,
  CLOSE: 3,
};

export const PAGE_SIZE_20 = 20;
export const PAGE_SIZE = 10;
export const PAGE_NO = 1;

export const DASHBOARD_PAGINATION = {
  VACANCY: {
    PAGE_NO: 1,
    PAGE_SIZE: 5,
  },
  APPLICATION: {
    PAGE_NO: 1,
    PAGE_SIZE: 15,
  },
};

export const CANDIDATE_PAGE_SIZE = 2;
export const PAGINATION = {
  CURRENT: 1,
  PAGE_SIZE: 2,
  TOTAL: 0,
};

export const SEARCH_PARAM_PAGE = 'page';
export const CAPITAL_ALPHABET_REGEX = /[A-Z]/;

export const FORGET_PASSWORD_CONST = {
  sent: 'We have sent a reset password email to you. Please click the reset password link to set your new password.',
  spamAndReset:
    "Didn't receive the email yet? Please check your spam folder or retry the process.",
  title:
    'Enter the email address associated with your account to reset your password.',
};

export const PROSPECT_CLIENTS_SORT_BY = [
  { value: 'companyName ASC', label: 'Sort: A-Z' },
  { value: 'personAssigned', label: 'Assigned To' },
  { value: 'reminderDate', label: 'Reminder Date' },
  { value: 'status', label: 'Status' },
  { value: 'companyName DESC', label: 'Sort: Z-A' },
];

export const PROSPECT_CLIENTS_STATUS_SORT = [
  { value: 0, label: 'All' },
  { value: 1, label: 'Status: Open' },
  { value: 2, label: 'Status: Converted' },
  { value: 3, label: 'Status: Closed' },
];

export const PROSPECT_CLIENTS_STATUS = [
  { value: 1, label: 'Open' },
  { value: 2, label: 'Converted' },
  { value: 3, label: 'Closed' },
];

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const REMINDER_TYPES = ['phone', 'email', 'visit'];
