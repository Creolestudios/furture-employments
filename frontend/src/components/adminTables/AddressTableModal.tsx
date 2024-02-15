import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableWrapper from '../../styles/table-wrapper';
import {
  IProspectAddress,
  ProspectAddressDataType,
} from '../../interfaces/prospectClients';

// For editing the address of prospect client
const AddressTableModal: React.FC<IProspectAddress> = ({
  tableData,
  convertModal,
  setConvertAddress,
}) => {
  const columns: ColumnsType<ProspectAddressDataType> = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => <p>{`Address  ${index + 1}`}</p>,
    },
    {
      title: '',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (
        text,
        {
          addressLine1, addressLine2, city, county, country, postcode,
        },
      ) => (
        <p>
          {`${addressLine1} ${addressLine2} ${city} ${county} ${country} ${postcode}`}
        </p>
      ),
    },
  ];
  const [selectedKey, setSelectedKey] = useState<any>([
    tableData.filter((item: any) => item.converted)[0]?.key ?? tableData[0].key,
  ]);

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ProspectAddressDataType[],
    ) => {
      const data = {
        addressId: selectedRows[0].key,
        addressLine1: selectedRows[0].addressLine1,
        addressLine2: selectedRows[0].addressLine2,
        city: selectedRows[0].city,
        county: selectedRows[0].county,
        country: selectedRows[0].country,
        postcode: selectedRows[0].postcode,
      };
      setConvertAddress(data);
    },
    getCheckboxProps: (record: ProspectAddressDataType) => ({
      disabled: record.converted,
    }),
  };

  useEffect(() => {
    const selectedData = tableData.filter((item: any) => item.converted)[0];
    if (selectedData) {
      setSelectedKey([selectedData.key]);
    } else {
      setSelectedKey([tableData[0].key]);
    }
    if (setConvertAddress) {
      let convertibleData: any = tableData[0];
      if (selectedData) {
        convertibleData = selectedData;
      }
      const data = {
        addressId: convertibleData.key,
        addressLine1: convertibleData.addressLine1,
        addressLine2: convertibleData.addressLine2,
        city: convertibleData.city,
        county: convertibleData.county,
        country: convertibleData.country,
        postcode: convertibleData.postcode,
      };
      setConvertAddress(data);
    }
  }, [tableData]);

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        pagination={false}
        scroll={{ x: 500 }}
        className='address-table'
        showHeader={false}
        rowSelection={
          convertModal
            ? {
              type: 'radio',
              defaultSelectedRowKeys: selectedKey,
              ...rowSelection,
            }
            : undefined
        }
      />
    </TableWrapper>
  );
};

export default AddressTableModal;
