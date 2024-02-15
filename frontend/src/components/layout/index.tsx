import React, { FC } from 'react';
import { Divider, Layout } from 'antd';
import AppHeader from './header';
import AppFooter from './footer';
import ContentWrapper, { LayoutWrapper } from './index.styles';
import SidebarMenu from './sidebarMenu';
import { API_TOKEN, USER_ROLE, USER_ROLE_KEY } from '../../constants';

const { Content } = Layout;
const AppLayout: FC<{ children: any }> = ({ children }) => {
  const AUTHORIZED_ROLES = Object.values(USER_ROLE).filter(
    (role: number) => role !== USER_ROLE.CANDIDATE_SIGN_UP
      && role !== USER_ROLE.EMPLOYER_SIGN_UP,
  );
  const isAuthenticated = sessionStorage.getItem(API_TOKEN);
  const isAuthorized = AUTHORIZED_ROLES.includes(
    Number(sessionStorage.getItem(USER_ROLE_KEY)),
  );

  return (
    <Layout>
      <AppHeader />
      {isAuthenticated && isAuthorized && (
        <Divider className='header-divider' />
      )}
      <ContentWrapper
        className={isAuthenticated && isAuthorized ? '' : 'signin'}
      >
        <LayoutWrapper>
          <div
            className={
              isAuthenticated && isAuthorized ? 'authorized-body-section' : ''
            }
          >
            {isAuthenticated && isAuthorized && <SidebarMenu />}
            <Content className='layout-content'>{children}</Content>
          </div>
        </LayoutWrapper>
      </ContentWrapper>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
