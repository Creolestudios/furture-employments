import React from 'react';
import { Card } from 'antd';
import SidemenuWrapper from './index.styles';
import AppSidebar from '../sidebar';
import GetWindowDimensions from '../../../utils/useWindowDimension';

const SidebarMenu: any = () => {
  const size = GetWindowDimensions();
  if (size.width > 425) {
    return (
      <SidemenuWrapper>
        <Card title='Menu' bordered={false}>
          <AppSidebar />
        </Card>
      </SidemenuWrapper>
    );
  }
  return null;
};

export default SidebarMenu;
