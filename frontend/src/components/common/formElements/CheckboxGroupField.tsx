import React from 'react';
import { Checkbox, Form } from 'antd';

const CheckboxGroupField = ({
  name,
  label,
  rules,
  options,
  helpMessage,
}: any) => (
  <Form.Item name={name} label={label} rules={rules} extra={helpMessage ?? ''}>
    <Checkbox.Group options={options} />
  </Form.Item>
);

export default CheckboxGroupField;
