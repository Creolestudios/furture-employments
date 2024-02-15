import React, { FC } from 'react';
import {
  EnvironmentFilled,
  FacebookFilled,
  LinkedinFilled,
  MailFilled,
  PhoneFilled,
  TwitterCircleFilled,
} from '@ant-design/icons';

import SubFooterWrapper from './index.styles';
import { USEFUL_LINKS } from '../../../../constants';
import cmsRoutes, { CMS_URL } from '../../../../constants/cmsRoutes';

const SubFooter: FC = () => (
  <SubFooterWrapper>
    <div className='sub-footer-section usefull'>
      <h3>USEFUL LINKS </h3>
      <div className='useful-section'>
        <ul className='list'>
          {USEFUL_LINKS.map((option: any) => {
            if (option.value === 'training') {
              return (
                <li key={option.key}>
                  <a href={cmsRoutes.TRAINING} target='_blank' rel='noreferrer'>
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
        <ul className='list sub-list' style={{ paddingTop: '10px' }}>
          <li>
            <a href={`${cmsRoutes.RESOURCES}`}>Resources</a>
          </li>
          <li>
            <a href={`${cmsRoutes.OUR_TEAM}`}>Our Team</a>
          </li>
          <li>
            <a href={`${cmsRoutes.CONTACT_US}`}>Contact Us</a>
          </li>
          {!sessionStorage.getItem('api-token') && (
            <li>
              <p>Login / Register</p>
            </li>
          )}
        </ul>
      </div>
    </div>
    <div className='sub-footer-section connect-withus'>
      <h3>CONNECT WITH US</h3>
      <ul className='list'>
        <li>
          <p>
            <LinkedinFilled />
            <span className='list-item'> LinkedIn</span>
          </p>
        </li>
        <li>
          <p>
            <FacebookFilled />
            <span className='list-item'>Facebook</span>
          </p>
        </li>
        <li>
          <p>
            <TwitterCircleFilled />
            <span className='list-item'>Twitter</span>
          </p>
        </li>
      </ul>
    </div>
    <div className='sub-footer-section' style={{ border: 'none' }}>
      <h3>CONTACT US</h3>
      <ul className='list contact'>
        <li>
          <p>
            <PhoneFilled />
            <span className='list-item'> 1234567890</span>
          </p>
        </li>
        <li>
          <p>
            <MailFilled />
            <span className='list-item'>hello@futureemployments.com</span>
          </p>
        </li>
        <li>
          <p>
            <EnvironmentFilled />
            <span className='list-item'>Ahmedabad</span>
          </p>
        </li>
      </ul>
    </div>
  </SubFooterWrapper>
);

export default SubFooter;
