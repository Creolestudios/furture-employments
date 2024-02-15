import React, { useEffect, useState } from 'react';
import { CANDIDATE_SORT_BY, PAGE_NO } from '../../constants';
import { ISearchCandidateFilter } from '../../interfaces/search';
import {
  useCandidateSearch,
  useGetSkills,
} from '../../services/admin/adminService';
import {
  useGetCountryCityList,
  useGetLanguageList,
  useGetListData,
} from '../../services/constantDataService';
import FormPageWrapper from '../../styles/formContainer';
import CandidatesTable from '../adminTables/CandidatesTable';
import FilterCandidates from './FilterCandidates';
import { candidateFields } from '../../constants/components/invitationForm';

const InviteCandidates = ({ alreadyApplied }: any) => {
  const defaultFilters = {
    current: PAGE_NO,
    pageSize: 10,
    sortBy: CANDIDATE_SORT_BY[1].value,
  };

  const [searchFilters, setSearchFilters] = useState<ISearchCandidateFilter>(defaultFilters);

  const [paramsList, setParamsList] = useState<any>(null);

  const [searchSkill, setSearchSkill] = useState('');
  const { data, loading, total } = useCandidateSearch(searchFilters);
  const [pagination, setPagination] = useState<any>({
    current: PAGE_NO,
    pageSize: 10,
  });
  const { country } = useGetCountryCityList();
  const { LANGUAGES_LIST } = useGetLanguageList();
  const { JOB_TYPES, JOB_CATEGORIES } = useGetListData();
  const { newSkills } = useGetSkills(searchSkill);
  const handleSearchSkills = (skill: string) => {
    setSearchSkill(skill);
  };
  data.forEach((candidate: any) => {
    const matchedApplication = alreadyApplied.find(
      (application: any) => application.email === candidate.email,
    );
    if (matchedApplication) {
      candidate.applied = true;
    } else {
      candidate.applied = false;
    }
  });

  return (
    <FormPageWrapper>
      <div className='client candidates'>
        <FilterCandidates
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
          invite
          data={data}
          isPagination
          paginationConfig={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            onChange: (current: number, pageSize: number) => {
              setPagination({ current, pageSize });
            },
          }}
        />
      )}
    </FormPageWrapper>
  );
};

export default InviteCandidates;
