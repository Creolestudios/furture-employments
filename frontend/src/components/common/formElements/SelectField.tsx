import React from 'react';
import { Form, Select } from 'antd';

const SelectField = ({
  options,
  placeholder,
  name,
  label,
  rules,
  className,
  disabled,
  defaultValue,
  onSelect,
  handleChange,
  open,
  size,
  mode,
  formItemClassName,
  helpMessage,
}: any) => (
  <Form.Item
    name={name}
    label={label}
    rules={rules}
    className={formItemClassName}
    extra={helpMessage}
  >
    <Select
      onChange={handleChange}
      defaultValue={defaultValue}
      className={className}
      placeholder={placeholder}
      options={options?.map((item: any) => ({
        value: item.value,
        label: item.label,
        disabled: item.disabled ? item.disabled : false,
        key: Object.keys(item).includes('key') ? item.key : item.value,
      }))}
      onSelect={onSelect}
      disabled={disabled}
      open={open}
      size={size}
      mode={mode}
    />
  </Form.Item>
);

export default SelectField;
