import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';

import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import SearchForm from '../../../components/searchForm/SearchForm';
import { vacanciesForm } from '../../../constants/components/searchForm';
import { ISearchVacanciesFilter } from '../../../interfaces/search';
import { PAGE_NO, PAGE_SIZE, USER_ROLE } from '../../../constants';
import usePagination from '../../../hooks/usePagination';
import CommonVacancyTable from '../../../components/commonVacancyTable/CommonVacancyTable';
import { useAdminVacancyList } from '../../../services/vacancies/vacancyService';

const Vacancies: FC = () => {
  const defaultFilters = {
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
  };
  const [searchFilters, setSearchFilters] = useState<ISearchVacanciesFilter>(defaultFilters);
  const [paramsList, setParamsList] = useState<any>(null);
  const { vacancies, total } = useAdminVacancyList(searchFilters);

  const { pagination, paginationConfig, setTotal } = usePagination({
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
    urlSearchList: paramsList,
  });
  useEffect(() => {
    if (total) {
      setTotal(total);
      setSearchFilters({ ...searchFilters, current: pagination.current });
    }
  }, [total, pagination]);

  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>Vacancies</h1>
        </div>
        <div className='search-vacancies'>
          <SearchForm
            fields={vacanciesForm}
            setSearchFilters={setSearchFilters}
            defaultFilters={defaultFilters}
            setParamsList={setParamsList}
          >
            <Button htmlType='submit'>Search</Button>
          </SearchForm>
        </div>
        <CommonVacancyTable
          role={USER_ROLE.ADMIN}
          isPagination
          paginationConfig={paginationConfig}
          data={vacancies}
        />
      </FormPageWrapper>
    </AppLayout>
  );
};

export default Vacancies;
