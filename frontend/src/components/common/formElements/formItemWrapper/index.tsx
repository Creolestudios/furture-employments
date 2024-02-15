import React, { FC, ReactElement } from 'react';
import { IFormItem } from '../../../../interfaces/formElements';

import StyledFormItem from './index.styles';

interface IProps extends IFormItem {
  children: ReactElement;
}

const FormItemWrapper: FC<IProps> = ({
  label,
  name,
  labelMinWidth,
  children,
  wrapperCol,
  labelCol,
  dependencies,
  rules,
}) => (
  <StyledFormItem
    label={label}
    name={name}
    rules={rules}
    labelminwidth={labelMinWidth}
    wrapperCol={wrapperCol}
    labelCol={labelCol}
    dependencies={dependencies}
  >
    {children}
  </StyledFormItem>
);

export default FormItemWrapper;
