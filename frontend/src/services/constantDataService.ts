import { useQuery } from '@apollo/client';
import {
  COUNTRY_LIST,
  JOB_LIST,
  LANGUAGE_GET_LIST,
} from '../graphql/queries/constantDataQueries';

export const useGetListData = () => {
  const { data } = useQuery(JOB_LIST);
  const ListDown = data?.getList || {};

  const JOB_TYPES = ListDown.JobType
    ? ListDown.JobType.map((jobType: { JobType: string; id: any }) => ({
      label: jobType.JobType,
      value: jobType.JobType,
    }))
    : [];

  const JOB_CATEGORIES = ListDown.JobCat
    ? ListDown.JobCat.map((jobCat: { JobCategory: string; id: any }) => ({
      label: jobCat.JobCategory,
      value: jobCat.JobCategory,
    }))
    : [];

  return {
    JOB_TYPES,
    JOB_CATEGORIES,
  };
};

export const useGetLanguageList = () => {
  const { data } = useQuery(LANGUAGE_GET_LIST);
  const ListDownLanguage = data?.getList || {};

  const LANGUAGE_LIST = ListDownLanguage.language;
  const LANGUAGES_LIST = LANGUAGE_LIST
    ? LANGUAGE_LIST.map((language: { languages: string; id: any }) => ({
      label: language.languages,
      value: language.languages,
    }))
    : [];

  return {
    LANGUAGES_LIST,
  };
};

export const useGetCountryCityList = () => {
  const { data, loading, error } = useQuery(COUNTRY_LIST);
  const { country } = data?.getList || {};

  return {
    country:
      country
      && country.map((info: any) => ({
        label: info.country,
        value: info.country,
        city:
          info.cities
          && info.cities.map((cityInfo: any) => ({
            label: cityInfo.city,
            value: cityInfo.city,
          })),
      })),
    loading,
    error,
  };
};
