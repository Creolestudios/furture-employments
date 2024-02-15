import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import _debounce from 'lodash/debounce';
import type { SelectProps } from 'antd';

const { Option } = Select;

const DebounceAndTagSelect: React.FC<{
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  newOptions: any;
  searchRecord: any;
}> = ({
  placeholder, name, label, className, newOptions, searchRecord,
}) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const fetchOptions = async (input: string) => {
    searchRecord(input);
    setOptions(newOptions);
    return newOptions;
  };

  const debouncedFetchOptions = _debounce(fetchOptions, 1000);

  const handleSearch = (value: string) => {
    setInputValue(value);
    debouncedFetchOptions(value);
  };

  const handleInputKeyDown = () => {
    debouncedFetchOptions(inputValue);
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        mode='tags'
        placeholder={placeholder}
        value={inputValue}
        onSearch={handleSearch}
        onInputKeyDown={handleInputKeyDown as any}
        className={className}
        dropdownStyle={
          options && options.length === 0 && inputValue === ''
            ? { display: 'none' }
            : { display: '' }
        }
      >
        {options
          && options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default DebounceAndTagSelect;
DebounceAndTagSelect.defaultProps = {
  placeholder: '',
  label: '',
  className: '',
};
