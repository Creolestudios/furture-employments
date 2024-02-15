import { DATE_FORMAT } from './constants';
import { Role } from './enum';

export const getAuthorizedRoles = (role?: number) => {
  if (role) {
    return [Role.ADMIN, Role.SUPER_ADMIN, role];
  } else {
    return [Role.ADMIN, Role.SUPER_ADMIN];
  }
};
export const getAllAuthorized = () => {
  return [Role.ADMIN, Role.SUPER_ADMIN, Role.CANDIDATE, Role.EMPLOYER];
};
export const convertDateInGivenFormat = (value: Date, format: string) => {
  const date = value.getDate();
  const month = value.getMonth();
  const year = value.getFullYear();

  switch (format) {
    case DATE_FORMAT.DD_MM_YYYY:
      return `${date}/${month}/${year}`;
    case DATE_FORMAT.MM_DD_YYYY:
      return `${month}/${date}/${year}`;
    case DATE_FORMAT.YYYY_MM_DD:
      return `${year}/${month}/${date}`;
    default:
      return value.toLocaleString();
  }
};
