import React from 'react';
import { DatePicker, Form } from 'antd';

const DatePickerWrapper = ({
  name,
  label,
  rules,
  placeholder,
  dateFormat,
  disabledDate,
}: any) => (
  <Form.Item name={name} label={label} rules={rules}>
    <DatePicker
      format={dateFormat}
      placeholder={placeholder}
      disabledDate={disabledDate}
    />
  </Form.Item>
);

export default DatePickerWrapper;

DatePickerWrapper.defaultPorps = {
  dateFormat: 'YYYY-MM-DD',
};
