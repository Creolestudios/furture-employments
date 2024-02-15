import React, { FC, useEffect, useState } from 'react';

import {
  Button, Empty, Form, Input, Select,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import _debounce from 'lodash/debounce';
import AppLayout from '../../../components/layout';
import FormPageWrapper from '../../../styles/formContainer';
import {
  PAGE_NO,
  PAGE_SIZE,
  PROSPECT_CLIENTS_SORT_BY,
  PROSPECT_CLIENTS_STATUS_SORT,
} from '../../../constants';
import { useProspectClientSearch } from '../../../services/admin/adminService';
import usePagination from '../../../hooks/usePagination';
import ProspectClientsTable from '../../../components/adminTables/ProspectClientsTable';
import Loader from '../../../components/common/loader';
import ProspectClientForm from '../../../components/ProspectClientForm/ProspectClientForm';
import ModalWrapper from '../../../components/common/modalWrapper';

const ProspectClients: FC = () => {
  const [form] = Form.useForm();
  const [newClientForm] = Form.useForm();
  const defaultFilters = {
    current: PAGE_NO,
    pageSize: PAGE_SIZE,
    sortBy: '',
  };

  const [searchFilters, setSearchFilters] = useState<any>(defaultFilters);
  const [paramsList, setParamsList] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);
  const { pagination, paginationConfig, setTotal } = usePagination({
    ...defaultFilters,
    urlSearchList: paramsList,
  });

  const { data, loading, total } = useProspectClientSearch(searchFilters);

  useEffect(() => {
    if (total) {
      setTotal(total);
      setSearchFilters({ ...searchFilters, current: pagination.current });
    }
  }, [total, pagination]);
  const fetchOptions = async (input: string) => {
    setSearchFilters({ ...searchFilters, query: input });
    setParamsList({ ...paramsList, query: input });
  };

  const debouncedFetchOptions = _debounce(fetchOptions, 1000);

  const handleSearch = (e: any) => {
    debouncedFetchOptions(e.target.value);
  };

  return (
    <AppLayout>
      <FormPageWrapper>
        <div>
          <h1>Prospect Clients</h1>
        </div>
        <div className='client'>
          <Form form={form} style={{ width: '100%' }}>
            <div className='prospect-client'>
              <div className='prospect'>
                <Input
                  name='Search'
                  placeholder='Search'
                  prefix={<SearchOutlined />}
                  onChange={(e: any) => handleSearch(e)}
                />
                <Select
                  options={PROSPECT_CLIENTS_SORT_BY}
                  defaultValue={PROSPECT_CLIENTS_SORT_BY[0].label}
                  onChange={(e: any) => setSearchFilters({ ...searchFilters, sortBy: e })}
                />
                <Select
                  options={PROSPECT_CLIENTS_STATUS_SORT}
                  placeholder='Status'
                  onChange={(e: any) => setSearchFilters({ ...searchFilters, status: e })}
                />
              </div>
              <div className='add-btn'>
                <Button onClick={() => setShowModal(true)}>
                  Add New Prospect
                </Button>
              </div>
            </div>
          </Form>
        </div>
        {!loading && data && (
          <ProspectClientsTable
            tableData={data}
            isPagination
            paginationConfig={paginationConfig}
          />
        )}
        {loading && <Loader />}
      </FormPageWrapper>
      <ModalWrapper
        title='New Prospect Client'
        isOpen={showModal}
        onCancel={() => {
          setShowModal(false);
          newClientForm.resetFields();
        }}
        onOk={() => {
          setShowModal(false);
          newClientForm.resetFields();
        }}
        destroyOnClose
        moduleClass='campaign-module prospect-address'
      >
        <div>
          <ProspectClientForm
            form={newClientForm}
            setShowModal={setShowModal}
          />
        </div>
      </ModalWrapper>
    </AppLayout>
  );
};

export default ProspectClients;
