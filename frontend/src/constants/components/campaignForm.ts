const CAMPAIGN_FORM = {
  TITLE: {
    NAME: 'title',
    LABEL: 'Title',
    VALIDATION_RULE: [
      {
        required: true,
      },
    ],
  },
  SLUG: {
    NAME: 'slug',
    LABEL: 'Slug',
  },
  JOB_SUMMARY: {
    NAME: 'summary',
    LABEL: 'Job Summary',
    VALIDATION_RULE: [
      {
        required: true,
      },
    ],
  },
  JOB_DESCRIPTION: {
    NAME: 'description',
    LABEL: 'Job Description',
    VALIDATION_RULE: [
      {
        required: true,
      },
    ],
    CLASSNAME: 'description',
  },
  START_DATE: {
    NAME: 'startDate',
    LABEL: 'Start Date',
    TYPE: 'date',
    VALIDATION_RULE: [
      {
        required: true,
      },
    ],
  },
  END_DATE: {
    NAME: 'endDate',
    LABEL: 'End Date',
    TYPE: 'date',
    VALIDATION_RULE: [
      {
        required: true,
      },
    ],
  },
  KEYWORDS: {
    NAME: 'keyword',
    LABEL: 'Keywords',
  },
  FEATURED: {
    NAME: 'featured',
    LABEL: 'Featured',
  },
};

export default CAMPAIGN_FORM;
