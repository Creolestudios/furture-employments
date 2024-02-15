import React, { FC } from 'react';
import SubFooter from './subFooter';

import { Container } from '../../../styles/globalStyles';
import FooterWrapper from './index.styles';

const HomeFooter: FC = () => (
  <div className='home-footer-section'>
    <Container>
      <div className='home-footer-content'>
        <ul className='list'>
          <li>Privacy Policy</li>
          <li>Terms of Business</li>
          <li>&copy; 2023 Future Employments</li>
        </ul>
        <ul className='list right-content'>
          <li>Webdesign & Marketing By</li>
          <li className='name'>
            <span>web</span>
            straxt
          </li>
        </ul>
      </div>
    </Container>
  </div>
);

const AppFooter: FC = () => (
  <FooterWrapper>
    <SubFooter />
    <HomeFooter />
  </FooterWrapper>
);

export default AppFooter;
