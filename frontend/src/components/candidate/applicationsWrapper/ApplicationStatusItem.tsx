import React, { FC } from 'react';
import { Popover, Tag } from 'antd';
import GetWindowDimensions from '../../../utils/useWindowDimension';

interface IProps {
  name?: string;
  content?: string;
  color?: string;
}
const ApplicationStatusItem: FC<IProps> = ({ name, content, color }) => {
  const size = GetWindowDimensions();
  return (
    <Popover
      className='status-popover'
      placement={size.width > 425 ? 'left' : 'top'}
      title={name}
      content={content}
    >
      <Tag color={color} key={name}>
        <span className='tag-content'>{name}</span>
      </Tag>
    </Popover>
  );
};

ApplicationStatusItem.defaultProps = {
  name: '',
  content: '',
  color: '#fff',
};

export default ApplicationStatusItem;
