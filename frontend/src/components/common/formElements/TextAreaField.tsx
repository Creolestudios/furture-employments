import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const TextAreaField = ({
  rows,
  placeholder,
  name,
  rules,
  label,
  className,
  onChange,
  value,
}: any) => (
  <Form.Item name={name} label={label} rules={rules} className={className}>
    <TextArea
      rows={rows || 3}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </Form.Item>
);

export default TextAreaField;
