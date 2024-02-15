import React, { FC, useEffect, useState } from 'react';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';

import CandidatesTable from '../../../components/adminTables/CandidatesTable';
import SearchForm from '../../../components/searchForm/SearchForm';
import { candidateFields } from '../../../constants/components/searchForm';
import { ISearchCandidateFilter } from '../../../interfaces/search';
import { CANDIDATE_SORT_BY, PAGE_NO } from '../../../constants';
import {
  useAddSkills,
  useCandidateSearch,
  useCandidateSkills,
  useGetSkills,
} from '../../../services/admin/adminService';
import usePagination from '../../../hooks/usePagination';
import {
  useGetCountryCityList,
  useGetLanguageList,
  useGetListData,
} from '../../../services/constantDataService';

const SearchCandidates: FC = () => {
  const defaultFilters = {
    current: PAGE_NO,
    pageSize: 10,
    sortBy: CANDIDATE_SORT_BY[1].value,
  };

  const [searchFilters, setSearchFilters] = useState<ISearchCandidateFilter>(defaultFilters);

  const [paramsList, setParamsList] = useState<any>(null);

  const [searchSkill, setSearchSkill] = useState('');
  const { data, loading, total } = useCandidateSearch(searchFilters);

  const { pagination, paginationConfig, setTotal } = usePagination({
    current: PAGE_NO,
    pageSize: 10,
    urlSearchList: paramsList,
  });

  useEffect(() => {
    if (total) {
      setTotal(total);
      setSearchFilters({ ...searchFilters, current: pagination.current });
    }
  }, [total, pagination]);
  const { country } = useGetCountryCityList();
  const { LANGUAGES_LIST } = useGetLanguageList();
  const { JOB_TYPES, JOB_CATEGORIES } = useGetListData();
  const { newSkills } = useGetSkills(searchSkill);
  const handleSearchSkills = (skill: string) => {
    setSearchSkill(skill);
  };

  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>Candidates</h1>
        </div>
        <div className='client candidates'>
          <SearchForm
            fields={candidateFields({
              LANGUAGES_LIST,
              JOB_TYPES,
              JOB_CATEGORIES,
              SKILLS: { options: newSkills, skill: handleSearchSkills },
            })}
            isReset
            defaultFilters={defaultFilters}
            setSearchFilters={setSearchFilters}
            setParamsList={setParamsList}
            isCandidate
            parentOptions={country}
          />
        </div>
        {!loading && data && (
          <CandidatesTable
            data={data}
            isPagination
            paginationConfig={paginationConfig}
          />
        )}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default SearchCandidates;
