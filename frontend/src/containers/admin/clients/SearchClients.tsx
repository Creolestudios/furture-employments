import React, { FC, useEffect, useState } from 'react';

import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import ClientsTable from '../../../components/adminTables/ClientsTable';
import { ISearchClientFilter } from '../../../interfaces/search';
import { PAGE_NO, PAGE_SIZE } from '../../../constants';
import ButtonWrapper from '../../../components/common/formElements/buttonWrapper';
import { useClientSearch } from '../../../services/admin/adminService';
import SearchForm from '../../../components/searchForm/SearchForm';
import { employerFields } from '../../../constants/components/searchForm';
import usePagination from '../../../hooks/usePagination';

const SearchClients: FC = () => {
  const defaultFilters = {
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
  };

  const [searchFilters, setSearchFilters] = useState<ISearchClientFilter>(defaultFilters);
  const [paramsList, setParamsList] = useState<any>(null);
  const { pagination, paginationConfig, setTotal } = usePagination({
    ...defaultFilters,
    urlSearchList: paramsList,
  });

  const { data, loading, total } = useClientSearch(searchFilters);

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
          <h1>Clients</h1>
        </div>
        <div className='client'>
          <SearchForm
            fields={employerFields}
            className='search-client-form'
            defaultFilters={defaultFilters}
            setSearchFilters={setSearchFilters}
            setParamsList={setParamsList}
          >
            <ButtonWrapper htmlType='submit'>Search</ButtonWrapper>
          </SearchForm>
        </div>
        {!loading && data && (
          <ClientsTable
            tableData={data}
            isPagination
            paginationConfig={paginationConfig}
          />
        )}
      </FormPageWrapper>
    </AppLayout>
  );
};

export default SearchClients;
