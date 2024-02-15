import { styled } from 'styled-components';
import { Layout } from 'antd';
import { Colors } from '../../styles/variable';

const { Content } = Layout;

const ContentWrapper = styled(Content)`
  background: ${Colors.LOGIN_BACKGROUND};
  min-height: 52vh;
  @media screen and (max-width: 991px) {
    padding-left: 15px;
  }
`;

export default ContentWrapper;

export const LayoutWrapper = styled(Layout)`
  background: ${Colors.LOGIN_BACKGROUND};

  /* padding: 0 10px; */

  .authorized-body-section {
    display: flex;
    max-width: 1430px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 10px;

    @media screen and (max-width: 991px) {
      display: block;
    }
  }
`;
