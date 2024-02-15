import { styled } from 'styled-components';
import { Layout } from 'antd';
import { Colors, FontFamily } from '../../../styles/variable';

const { Footer } = Layout;

const FooterWrapper = styled(Footer)`
  padding: 0;

  .home-footer-section {
    background: #1c2530;

    .home-footer-content {
      display: flex;
      align-items: center;
      color: #c6c7c9;
      padding: 22px 0;
      @media only screen and (max-width: 750px) {
        flex-direction: column;
        text-align: center;
        li {
          font-size: 15px !important;
        }
        .right-content {
          margin: 10px 0 0 0 !important;
        }
      }

      .list {
        display: flex;
        list-style: none;
        align-items: center;

        li {
          margin-right: 15px;
          font-family: ${FontFamily.SOURCESANS_REGULAR};
          font-size: 16px;
          font-weight: 100;
          line-height: 18px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .right-content {
        margin-left: auto;

        .name {
          color: ${Colors.WHITE};
          font-family: ${FontFamily.PLUTOSANS_REGULAR};
          span {
            font-weight: 900;
          }
        }
      }
    }
  }
`;

export default FooterWrapper;
