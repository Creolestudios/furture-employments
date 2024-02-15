import { CANDIDATE_SORT_BY, SALARY_RANGE_LIST } from '..';

export const candidateFields = ({
  LANGUAGES_LIST,
  JOB_TYPES,
  JOB_CATEGORIES,
  SKILLS,
}: any) => [
  {
    type: 'text',
    name: 'query',
    placeholder: 'Search by name,email...',
    searchLabel: 'Search',
    className: 'col-3 sm',
  },
  {
    type: 'text',
    name: 'location',
    placeholder: 'Search by location...',
    searchLabel: 'Location',
    className: 'col-3 sm',
  },
  {
    type: 'multiSelect',
    name: 'languages',
    searchLabel: 'Languages',
    options: LANGUAGES_LIST,
    placeholder: 'Select',
    className: 'select col-3 sm',
    mode: 'multiple',
  },
  {
    type: 'multiSelect',
    name: 'salary',
    placeholder: 'Select',
    searchLabel: 'Salary',
    className: 'select col-3 sm',
    options: SALARY_RANGE_LIST,
    mode: 'multiple',
  },
  {
    type: 'multiSelect',
    name: 'jobTypes',

    searchLabel: 'Job Type',
    options: JOB_TYPES,
    placeholder: 'Select',
    className: 'select col-3 sm',
    mode: 'multiple',
  },
  {
    type: 'multiSelect',
    name: 'categories',

    searchLabel: 'Job Category',
    options: JOB_CATEGORIES,
    placeholder: 'Select',
    className: 'select col-3 sm',
    mode: 'multiple',
  },
  {
    type: 'debounce',
    name: 'skills',
    placeholder: 'Skills',
    searchLabel: 'Skills',
    className: 'col-3 sm',
    options: SKILLS.options,
    skill: SKILLS.skill,
  },
  {
    type: 'select',
    name: 'sortBy',
    defaultValue: CANDIDATE_SORT_BY?.[1]?.value,
    searchLabel: 'Sort By',
    options: CANDIDATE_SORT_BY,
    placeholder: 'Select',
    className: 'select col-2 sm',
  },
  {
    type: 'number',
    name: 'pageSize',
    searchLabel: 'Page Size',
    className: 'col-1 sm',
    defaultValue: 20,
    typeRequired: true,
  },
];

export const employerFields = [
  {
    type: 'text',
    name: 'query',
    placeholder: 'Search Clients',
    className: 'col-12',
  },
];

export const vacanciesForm = [
  {
    type: 'text',
    name: 'query',
    placeholder: 'Search vacancies',
    className: 'col-10',
  },
];
