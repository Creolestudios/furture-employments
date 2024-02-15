import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import ChipInputWrapper from './ChipInputWrapper';

const ChipInput: React.FC<any> = ({
  name,
  placeholder,
  form,
  label,
  value,
}) => {
  const [input, setInput] = useState<any>('');
  const [tags, setTags] = useState<any>([]);
  const isTagsEmpty = tags.length === 0;
  const onChange = (e: any) => {
    setInput(e.target.value);
    form.setFieldValue({ [name]: undefined });
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimInput: any = input.trim();
    if (
      (key === ',' || key === 'Enter')
      && trimInput.length
      && !tags.includes(trimInput)
    ) {
      e.preventDefault();
      setTags((prevState: any) => [...prevState, trimInput]);
      setInput('');
    }
    if (key === 'Backspace' && !input.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const lastTag = tagsCopy.pop();
      setTags(tagsCopy);
      setInput(lastTag || '');
      const formTags = tagsCopy.length > 0 ? tagsCopy : undefined;
      form.setFieldsValue({ [name]: formTags });
    }
  };

  const deleteTag = (index: number) => {
    if (index >= 0 && index < tags.length) {
      const tagsCopy = [...tags];
      tagsCopy.splice(index, 1);
      setTags(tagsCopy);
      const formTags = tagsCopy.length > 0 ? tagsCopy : undefined;
      form.setFieldsValue({ [name]: formTags });
    }
  };

  useEffect(() => {
    if (!isTagsEmpty) {
      form.setFieldsValue({ [name]: tags });
    }
  }, [tags]);

  useEffect(() => {
    if (value && value.length > 0) {
      setTags(value);
    }
  }, [form, name, value]);

  return (
    <Form.Item name={name} label={label}>
      <ChipInputWrapper className='container'>
        {/* <div className='tag-wrapper'> */}
        {tags.map((tag: any, index: number) => (
          <div className='tag' key={tag}>
            {tag}
            <button type='button' onClick={() => deleteTag(index)}>
              x
            </button>
          </div>
        ))}
        <Input
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          onBlur={() => {
            if (input.trim()) {
              setTags((prevState: any) => [...prevState, input.trim()]);
              setInput('');
            }
          }}
        />
        {/* </div> */}
      </ChipInputWrapper>
    </Form.Item>
  );
};

export default ChipInput;
