import { APPLICATION_STATUS } from '../constants';

// Application status tag value
export const getApplicationStatus = (applicationStatus: number) => {
  const currentStatus = APPLICATION_STATUS.filter(
    (application) => application.status === applicationStatus,
  )?.[0];
  return {
    name: currentStatus?.name,
    color: currentStatus?.color,
    desc: currentStatus?.desc,
  };
};
