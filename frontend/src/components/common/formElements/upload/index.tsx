import React, { FC, useState } from 'react';
import {
  Button, Form, Upload, UploadFile,
} from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { ALLOWED_FILE_FORMATS } from '../../../../constants';
import { FormItemRule } from '../../../../interfaces/formElements';

interface IProps {
  name: string;
  label: string;
  isUploadWithForm?: boolean;
  isMultiple?: boolean;
  helpMessage?: string;
  maxCount?: number;
  rules?: FormItemRule[];
  errorMessage?: string;
  accept?: string;
  className?: string;
}

const UploadFileWrapper: FC<IProps> = ({
  name,
  label,
  isUploadWithForm,
  isMultiple,
  helpMessage,
  maxCount,
  rules,
  errorMessage,
  accept,
  className,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileRules, setFileRules] = useState<FormItemRule[]>([]);

  const handleChange = (info: UploadChangeParam) => setFileList(info.fileList);
  const handleRequest = ({ file, onSuccess, onError }: any) => {
    if (isUploadWithForm) {
      const fileType = file.type.split('/')[1];

      if (!ALLOWED_FILE_FORMATS.includes(fileType)) {
        if (errorMessage) {
          setFileRules([{ message: errorMessage }]);
        }
        onError();
      } else {
        onSuccess();
      }
    }
  };

  return (
    <Form.Item
      name={name}
      label={label}
      extra={helpMessage}
      rules={errorMessage ? fileRules : rules}
      className={className}
    >
      <Upload
        fileList={fileList}
        onChange={handleChange}
        customRequest={handleRequest}
        multiple={isMultiple}
        maxCount={maxCount}
        accept={accept}
      >
        <Button>Choose File</Button>
      </Upload>
    </Form.Item>
  );
};

UploadFileWrapper.defaultProps = {
  isUploadWithForm: true,
  isMultiple: false,
  helpMessage: '',
  maxCount: undefined,
  rules: [],
  errorMessage: '',
  accept: '',
  className: '',
};

export default UploadFileWrapper;
