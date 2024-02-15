import React from 'react';
import { Form, InputNumber } from 'antd';

const InputNumberField = ({
  placeholder,
  name,
  label,
  rules,
  defaultValue,
  disabled,
  addonBefore,
  min,
  className,
  formatter,
  parser,
  onChange,
  type,
}: any) => (
  <Form.Item name={name} label={label} rules={rules} className={className}>
    <InputNumber
      type={type || 'number'}
      placeholder={placeholder}
      min={min || 0}
      addonBefore={addonBefore}
      disabled={disabled}
      defaultValue={defaultValue}
      step='0'
      controls={false}
      formatter={formatter}
      parser={parser}
      onChange={onChange}
    />
  </Form.Item>
);

export default InputNumberField;
