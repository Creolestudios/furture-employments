// Routes to access CMS content
export const CMS_URL = process.env.REACT_APP_CMS_URL;
const cmsRoutes = {
  ALL_JOBS: `${CMS_URL}/job-search`,
  CANDIDATES: `${CMS_URL}/candidates`,
  EMPLOYERS: `${CMS_URL}/employers`,
  NEWS: `${CMS_URL}/news`,
  RESOURCES: `${CMS_URL}/resources`,
  OUR_TEAM: `${CMS_URL}/meet-our-team`,
  TRAINING: 'https://www.purplepath.co.uk/',
  CONTACT_US: `${CMS_URL}/contact-us`,
};

export default cmsRoutes;
