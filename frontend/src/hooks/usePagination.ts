import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TablePaginationConfig } from 'antd/es/table';
import { IPagination } from '../interfaces';
import { PAGINATION, SEARCH_PARAM_PAGE } from '../constants';

interface IPaginationArgument {
  current?: number;
  pageSize?: number;
  urlSearchList?: any;
}

const usePagination = (paginationArgument: IPaginationArgument = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<IPagination>({
    current: PAGINATION.CURRENT,
    pageSize: PAGINATION.PAGE_SIZE,
  });
  const [totalItems, setTotalItems] = useState<number>(PAGINATION.TOTAL);

  const handleSearchParams = (value: number) => setSearchParams({
    page: String(value),
    ...paginationArgument.urlSearchList,
  });

  useEffect(() => {
    // if (searchParams.get(SEARCH_PARAM_PAGE) === null) {
    //   handleSearchParams(paginationArgument.current ?? PAGINATION.CURRENT);
    // }
    const current = searchParams.get(SEARCH_PARAM_PAGE) === null
      ? paginationArgument.current ?? PAGINATION.CURRENT
      : Number(searchParams.get(SEARCH_PARAM_PAGE));

    setPagination({
      current,
      pageSize: paginationArgument.pageSize ?? PAGINATION.PAGE_SIZE,
    });
    // eslint-disable-next-line
  }, [searchParams]);

  const paginationConfig: TablePaginationConfig = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: totalItems,
    onChange: (current: number, pageSize: number) => {
      setPagination({ current, pageSize });
      // handleSearchParams(current);
    },
  };
  const setTotal = (total: number) => setTotalItems(total);

  return { pagination, paginationConfig, setTotal };
};

export default usePagination;
