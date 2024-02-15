import React from 'react';
import { Tag } from 'antd';

export const tagsRender = (tag: any) => {
  let color;
  let tagName = tag;
  if (typeof tag === 'number') {
    color = '#3a87ad';
    if (tag === 0) {
      tagName = 'N/A';
      color = '#999999';
    }
  } else {
    color = '#999999';
  }
  return (
    <Tag color={color} key={tag}>
      <span style={{ fontWeight: 'bold' }}>
        {' '}
        {tagName}
      </span>
    </Tag>
  );
};
