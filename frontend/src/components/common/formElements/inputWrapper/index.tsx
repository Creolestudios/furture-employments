import React, { FC, ReactNode } from 'react';
import FormItemWrapper from '../formItemWrapper';
import { IFormItem } from '../../../../interfaces/formElements';

import StyledInput, {
  StyledInputNumber,
  StyledPasswordInput,
} from './index.styles';

interface IProps extends IFormItem {
  inputHeight?: string;
  placeholder?: string;
  isPasswordType?: boolean;
  inputMaxWidth?: string;
  addOnAfter?: ReactNode;
  isNumberType?: boolean;
  isDisabled?: boolean;
  onChange?: any;
}

const InputWrapper: FC<IProps> = ({
  label,
  name,
  inputHeight,
  labelMinWidth,
  wrapperCol,
  labelCol,
  placeholder,
  dependencies,
  rules,
  isPasswordType,
  inputMaxWidth,
  addOnAfter,
  isNumberType,
  isDisabled,
  onChange,
}) => {
  if (isNumberType) {
    return (
      <FormItemWrapper
        label={label}
        name={name}
        labelMinWidth={labelMinWidth}
        wrapperCol={wrapperCol}
        labelCol={labelCol}
        dependencies={dependencies}
        rules={rules}
      >
        <StyledInputNumber
          height={inputHeight}
          maxwidth={inputMaxWidth}
          onChange={onChange}
        />
      </FormItemWrapper>
    );
  }

  return (
    <FormItemWrapper
      label={label}
      name={name}
      labelMinWidth={labelMinWidth}
      wrapperCol={wrapperCol}
      labelCol={labelCol}
      dependencies={dependencies}
      rules={rules}
    >
      {isPasswordType ? (
        <StyledPasswordInput height={inputHeight} placeholder={placeholder} />
      ) : (
        <StyledInput
          height={inputHeight}
          placeholder={placeholder}
          maxwidth={inputMaxWidth}
          addonAfter={addOnAfter}
          disabled={isDisabled}
          onChange={onChange}
        />
      )}
    </FormItemWrapper>
  );
};

InputWrapper.defaultProps = {
  inputHeight: '32px',
  placeholder: '',
  isPasswordType: false,
  addOnAfter: null,
  isNumberType: false,
  inputMaxWidth: '100%',
  isDisabled: false,
  onChange: null,
};

export default InputWrapper;
