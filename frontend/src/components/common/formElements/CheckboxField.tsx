import React from 'react';
import { Checkbox, Form } from 'antd';

const CheckboxField = ({
  name,
  label,
  rules,
  title,
  className,
  onChange,
  linkInTitle,
  disabled,
}: any) => (
  <Form.Item
    name={name}
    label={label}
    rules={rules}
    valuePropName='checked'
    className={className ?? ''}
  >
    <Checkbox onChange={onChange} disabled={disabled}>
      {title}
      <span className='checkbox-link'>{linkInTitle && linkInTitle}</span>
    </Checkbox>
  </Form.Item>
);

export default CheckboxField;
