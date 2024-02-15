import React, { useEffect, useState } from 'react';
import {
  Layout, Menu, MenuProps, theme,
} from 'antd';
import {
  AppstoreFilled,
  CopyFilled,
  FileTextFilled,
  FireOutlined,
  HeartFilled,
  LikeFilled,
  MessageFilled,
  PictureOutlined,
  PlusOutlined,
  ProfileFilled,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { USER_ROLE } from '../../../constants';
import GetWindowDimensions from '../../../utils/useWindowDimension';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  disabled?: boolean,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
}
const candidateItems: MenuProps['items'] = [
  getItem('Dashboard', 'dashboard', <AppstoreFilled />),

  { type: 'divider' },
  getItem(
    'JOBS',
    'jobs',
    null,
    [getItem('My Applications', 'applications', <StarFilled />)],
    'group',
  ),
  getItem(
    'ACCOUNT',
    'account',
    null,
    [
      getItem('Update Profile', 'profile', <ProfileFilled />),
      getItem('Update CV', 'profile/cv', <FileTextFilled />),
      getItem('Job Preferences', 'profile/preferences', <HeartFilled />),
    ],
    'group',
  ),
  { type: 'divider' },

  getItem('Candidate Resources', 'resources', <CopyFilled />),
];

const employerItems: MenuProps['items'] = [
  getItem('Dashboard', 'dashboard', <AppstoreFilled />),

  { type: 'divider' },
  getItem(
    'VACANCIES',
    'vacancies',
    null,
    [
      getItem('View Vacancies', 'vacancies', <FireOutlined />),
      getItem('Submit a new Vacancy', 'vacancies/submit', <PlusOutlined />),
      getItem('Applications', 'applications', <StarFilled />),
    ],
    'group',
  ),
  getItem(
    'ACCOUNT',
    'account',
    null,
    [getItem('Update Profile', 'profile', <ProfileFilled />)],
    'group',
  ),
  { type: 'divider' },

  getItem('Employer Resources', 'resources', <CopyFilled />),
];

const adminItems: MenuProps['items'] = [
  getItem('Dashboard', 'dashboard', <AppstoreFilled />),

  { type: 'divider' },
  getItem(
    'CLIENTS',
    'client',
    null,
    [
      getItem('Search Clients', 'clients', <SearchOutlined />),
      getItem('Vacancies', 'vacancies', <PlusOutlined />),
    ],
    'group',
  ),
  getItem(
    'CANDIDATES',
    'candidates',
    null,
    [
      getItem('Search Candidates', 'candidates', <SearchOutlined />),
      getItem('Applications', 'applications', <StarFilled />),
      // getItem('CV Reviews', 'cv', <LikeFilled />, undefined, undefined, true),
    ],
    'group',
  ),
  { type: 'divider' },
  getItem('Prospect Clients', 'prospect-clients', <UserOutlined />),
  // getItem(
  //   'MISC',
  //   'misc',
  //   null,
  //   [
  //     getItem('Users', 'users', <UserOutlined />, undefined, undefined, true),
  //     getItem(
  //       'Contact Forms',
  //       'contact',
  //       <AppstoreFilled />,
  //       undefined,
  //       undefined,
  //       true
  //     ),
  //     getItem('Blog', 'posts', <MessageFilled />, undefined, undefined, true),
  //     getItem('Pages', 'pages', <AppstoreFilled />, undefined, undefined, true),
  //     getItem(
  //       'Media',
  //       'media',
  //       <PictureOutlined />,
  //       undefined,
  //       undefined,
  //       true
  //     ),
  //   ],
  //   'group'
  // ),
  // getItem(
  //   'ADMIN',
  //   'admin',
  //   null,
  //   [
  //     getItem(
  //       'Content Blocks',
  //       'blocks',
  //       <AppstoreFilled />,
  //       undefined,
  //       undefined,
  //       true
  //     ),
  //   ],
  //   'group'
  // ),
];
const SuperAdminItems: MenuProps['items'] = [
  getItem('Dashboard', 'dashboard', <AppstoreFilled />),

  { type: 'divider' },
  getItem(
    'CLIENTS',
    'client',
    null,
    [
      getItem('Search Clients', 'clients', <SearchOutlined />),
      getItem('Vacancies', 'vacancies', <PlusOutlined />),
    ],
    'group',
  ),
  getItem(
    'CANDIDATES',
    'candidates',
    null,
    [
      getItem('Search Candidates', 'candidates', <SearchOutlined />),
      getItem('Applications', 'applications', <StarFilled />),
      // getItem('CV Reviews', 'cv', <LikeFilled />, undefined, undefined, true),
    ],
    'group',
  ),
  { type: 'divider' },
  getItem('Prospect Clients', 'prospect-clients', <UserOutlined />),
  // getItem(
  //   'MISC',
  //   'misc',
  //   null,
  //   [
  //     getItem('Users', 'users', <UserOutlined />, undefined, undefined, true),
  //     getItem(
  //       'Contact Forms',
  //       'contact',
  //       <AppstoreFilled />,
  //       undefined,
  //       undefined,
  //       true
  //     ),
  //     getItem('Blog', 'posts', <MessageFilled />, undefined, undefined, true),
  //     getItem('Pages', 'pages', <AppstoreFilled />, undefined, undefined, true),
  //     getItem(
  //       'Media',
  //       'media',
  //       <PictureOutlined />,
  //       undefined,
  //       undefined,
  //       true
  //     ),
  //   ],
  //   'group'
  // ),
  getItem(
    'ADMIN',
    'admin',
    null,
    [
      getItem('Admin User Accounts', 'admins', <UserOutlined />),
      // getItem(
      //   'Content Blocks',
      //   'blocks',
      //   <AppstoreFilled />,
      //   undefined,
      //   undefined,
      //   true
      // ),
    ],
    'group',
  ),
];
const AppSidebar: any = () => {
  const navigate = useNavigate();
  const size = GetWindowDimensions();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [items, setItems] = useState<any>(candidateItems);
  useEffect(() => {
    const ROLE: number = Number(sessionStorage.getItem('user-role'));
    switch (ROLE) {
      case USER_ROLE.EMPLOYER:
        setItems(employerItems);
        break;
      case USER_ROLE.CANDIDATE:
        setItems(candidateItems);
        break;
      case USER_ROLE.ADMIN:
        setItems(adminItems);
        break;
      case USER_ROLE.SUPER_ADMIN:
        setItems(SuperAdminItems);
        break;
      default:
        setItems(employerItems);
    }
  }, []);
  const handleClick = (e: any) => {
    if (e.key !== 'dashboard') {
      navigate(`/dashboard/${e.key}`);
    } else {
      navigate(`/${e.key}`);
    }
  };
  if (size.width > 425) {
    return (
      <Sider style={{ background: colorBgContainer }}>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
          items={items}
          onClick={(e: any) => handleClick(e)}
        />
      </Sider>
    );
  }
  return (
    <Menu
      mode='inline'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
      items={items}
      onClick={(e: any) => handleClick(e)}
    />
  );
};

export default AppSidebar;
