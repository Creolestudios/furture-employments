import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Drawer, Popover } from 'antd';
import { useQuery } from '@apollo/client';
import { BarsOutlined } from '@ant-design/icons';
import { IOption } from '../../../interfaces';
import { API_TOKEN, HEADER_OPTIONS } from '../../../constants';
import APP_ROUTES from '../../../constants/appRoutes';

import HeaderWrapper from './index.styles';
import LOGO from '../../../assets/images/logo.svg';
import { Container } from '../../../styles/globalStyles';
import { USER_NAME } from '../../../graphql/queries/users/UserQueries';
import AppSidebar from '../sidebar';
import cmsRoutes, { CMS_URL } from '../../../constants/cmsRoutes';

const AppHeader: FC = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem(API_TOKEN);
  const { data } = useQuery(USER_NAME, { skip: !token });
  const logOut = () => {
    sessionStorage.clear();
    window.location.assign(`${process.env.REACT_APP_CMS_URL}?logout=true`);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const isClient = typeof window === 'object';

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient],
  );
  const [size, setSize] = useState<any>(getSize);

  useEffect(() => {
    const onHandleResize = () => {
      setSize(getSize);
    };
    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, [getSize, isClient]);

  return (
    <HeaderWrapper>
      <Container>
        <div
          className={`header-content mobile-header ${
            data?.getUserDetails?.profileImage ? 'linkedin' : ''
          }`}
        >
          {/* eslint-disable-next-line */}
          <img
            src={LOGO}
            className='logo'
            alt='future-employments-logo'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.location.assign(`${process.env.REACT_APP_CMS_URL}`);
            }}
          />
          {data && (
            <div className='user-login '>
              {data?.getUserDetails?.profileImage && (
                <img
                  src={data?.getUserDetails?.profileImage}
                  className='social-image'
                  alt='social login'
                />
              )}
              <span>
                {`${data?.getUserDetails?.firstName} ${data?.getUserDetails?.lastName}`}
              </span>
              {' '}
              |
              {' '}
              {size.width < 425 ? (
                <Popover
                  overlayClassName='menu-popover'
                  content={<AppSidebar />}
                  trigger='click'
                >
                  Dashboard
                </Popover>
              ) : (
                <Link to='/dashboard'>Dashboard</Link>
              )}
            </div>
          )}
          {size.width > 906 ? (
            <div className='right-content'>
              <ul>
                {HEADER_OPTIONS.map((option: IOption) => {
                  if (option.value === 'training') {
                    return (
                      <li key={option.key}>
                        <a
                          href={cmsRoutes.TRAINING}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {option.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={option.key}>
                      <a href={`${CMS_URL}/${option.value}`}>{option.label}</a>
                    </li>
                  );
                })}
              </ul>
              {data ? (
                <div>
                  <Button onClick={logOut}>Logout</Button>
                </div>
              ) : (
                <Button onClick={() => navigate(APP_ROUTES.LOGIN)}>
                  Login / Register
                </Button>
              )}
            </div>
          ) : (
            <Button
              onClick={showDrawer}
              icon={<BarsOutlined style={{ fontSize: '40px' }} />}
              className='mobile-nav'
              size='large'
            />
          )}
          <Drawer
            title=''
            placement='left'
            width={250}
            onClose={onClose}
            open={open}
          >
            {HEADER_OPTIONS.map((option: IOption) => (
              <li key={option.key}>
                <NavLink to='#'>{option.label}</NavLink>
              </li>
            ))}
            {data && (
              <div>
                <Button onClick={logOut}>Logout</Button>
              </div>
            )}
          </Drawer>
        </div>
      </Container>
    </HeaderWrapper>
  );
};

export default AppHeader;
