import React, { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import SpinWrapper from './index.styles';

const Loader: FC = () => (
  <SpinWrapper>
    <Spin indicator={<LoadingOutlined spin />} />
  </SpinWrapper>
);

export default Loader;
