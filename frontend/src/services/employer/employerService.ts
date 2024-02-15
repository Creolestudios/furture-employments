import { useQuery } from '@apollo/client';
import moment from 'moment';
import {
  EMPLOYER_DETAILS_BY_ID,
  vacancyListQuery,
} from '../../graphql/queries/employer';
import { DATE_FORMAT } from '../../constants';

export function useEmployerDetailsById(employerId: number) {
  return useQuery(EMPLOYER_DETAILS_BY_ID, { variables: { employerId } });
}

export function useEmployerVacanciesList({
  searchParams,
  userId,
  employerId,
}: any) {
  const { data, loading, error } = useQuery(vacancyListQuery, {
    variables: {
      userId,
      searchParams,
      employerId,
    },
  });
  const { data: vacancyList, total } = data?.employersAllVacancies || {};
  return {
    vacancies:
      vacancyList && vacancyList
        ? vacancyList?.map((vacancy: any) => ({
          id: vacancy.id,
          clientName: vacancy?.employer?.companyName,
          position: vacancy.position,
          createdAt: moment(vacancy.createdAt).format(DATE_FORMAT),
          applicationCount: vacancy.applicationCount,
          status: vacancy.status,
          employerId: vacancy?.employer?.id,
        }))
        : [],
    total,
    loading,
    error,
  };
}
