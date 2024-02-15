import React, { useState } from 'react';
import { Form } from 'antd';
import MDEditor from '@uiw/react-md-editor';

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}
const CommonEditorField = ({
  className, name, rules, label, height,
}: any) => {
  const [value, setValue] = useState<any>('');

  return (
    <Form.Item name={name} label={label} rules={rules} className={className}>
      <MDEditor
        height={height}
        minHeight={100}
        value={value}
        onChange={setValue}
        preview='edit'
      />
    </Form.Item>
  );
};
export default CommonEditorField;
