import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableWrapper from '../../styles/table-wrapper';
import {
  IProspectPeople,
  ProspectPeopleDataType,
} from '../../interfaces/prospectClients';

const PeoplesTableModal: React.FC<IProspectPeople> = ({
  tableData,
  convertModal,
  setConvertPerson,
  setChangeDetails,
}) => {
  const columns: ColumnsType<ProspectPeopleDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, { firstName, lastName }) => (
        <p>{`${firstName} ${lastName}`}</p>
      ),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Email address',
      key: 'email',
      dataIndex: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Mobile Number',
      key: 'mobileNumber',
      dataIndex: 'mobileNumber',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Extension No.',
      key: 'extension',
      dataIndex: 'extension',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Phone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      render: (text) => <p>{text}</p>,
    },
  ];

  const [selectedKey, setSelectedKey] = useState<any>([
    tableData.filter((item: any) => item.converted)[0]?.key ?? tableData[0].key,
  ]);

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ProspectPeopleDataType[],
    ) => {
      const data = {
        personId: selectedRows[0].key,
        firstName: selectedRows[0].firstName,
        lastName: selectedRows[0].lastName,
        email: selectedRows[0].email,
        phoneNumber: selectedRows[0].phoneNumber,
      };
      setConvertPerson(data);
    },
    getCheckboxProps: (record: ProspectPeopleDataType) => ({
      disabled: record.converted,
    }),
  };

  useEffect(() => {
    setSelectedKey([tableData.filter((item: any) => item.converted)[0]?.key]);
    if (setConvertPerson) {
      const selectedData = tableData.filter((item: any) => item.converted)[0];
      let convertibleData: any = tableData[0];
      if (selectedData) {
        convertibleData = selectedData;
      }
      const data = {
        personId: convertibleData.key,
        firstName: convertibleData.firstName,
        lastName: convertibleData.lastName,
        email: convertibleData.email,
        phoneNumber: convertibleData.phoneNumber,
      };
      setConvertPerson(data);
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
        className='client-table'
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

export default PeoplesTableModal;
