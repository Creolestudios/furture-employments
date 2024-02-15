import React from 'react';
import { Tag, Popover } from 'antd';
import { VACANCY_STATUS } from '../../constants';
import GetWindowDimensions from '../../utils/useWindowDimension';

const StatusTagWithPopover: React.FC<{ tag: string }> = ({ tag }) => {
  const popOver = VACANCY_STATUS.find((item) => item.name === tag);
  const size = GetWindowDimensions();
  return (
    <Popover
      className='status-popover'
      placement={size.width > 425 ? 'left' : 'top'}
      title={popOver?.name}
      content={popOver?.desc}
    >
      <Tag color={popOver?.color} key={tag}>
        <span style={{ fontWeight: 'bold' }}>{tag}</span>
      </Tag>
    </Popover>
  );
};

export default StatusTagWithPopover;
