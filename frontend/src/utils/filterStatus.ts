import { VACANCY_STATUS } from '../constants';

// vacancy status tag value 
export function filterVacancyStatus(status: any) {
  return VACANCY_STATUS.filter(
    (applicationStatus) => applicationStatus.status === status,
  )?.[0]?.name;
}
