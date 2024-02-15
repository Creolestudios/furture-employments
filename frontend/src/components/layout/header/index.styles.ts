import { styled } from 'styled-components';
import { Layout } from 'antd';
import { Colors, FontFamily } from '../../../styles/variable';

const { Header } = Layout;

const HeaderWrapper = styled(Header)`
  display: flex;
  align-items: center;
  background: ${Colors.WHITE};
  padding: 15px 10px;
  min-height: 134px;

  .user-login {
    position: absolute;
    top: -10px;
    right: 55px;
    opacity: 0.5;
    font-size: 12px;
    span {
      color: #050f1b;
    }
    a {
      color: #050f1b;
    }
    @media screen and (max-width: 425px) {
      top: -10px;
      right: 20px;
    }
  }
  @media screen and (max-width: 991px) {
    min-height: auto;
    padding: 60px 10px 50px 20px;
  }
  @media screen and (max-width: 425px) {
    min-height: auto;
    padding: 60px 0 60px 0;
  }
  @media screen and (max-width: 1290px) {
    .right-content {
      li {
        padding: 0 7px !important;
      }
    }
    .logo {
      width: 160px;
      margin-right: 5px !important;
    }
  }
  .header-content {
    display: flex;
    flex-wrap: wrap;
  }
  .mobile-header {
    @media only screen and (max-width: 907px) {
      align-items: center;
      padding: 0 25px 0 25px;
      justify-content: space-between;
      img {
        width: 160px;
      }
      .social-image {
        width: 20% !important;
        height: 20% !important;
      }
    }
  }
  .logo {
    width: 213px;
    margin-right: 40px;
    @media screen and (max-width: 1291px) {
      width: 140px;
    }
  }

  .right-content {
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    ul {
      list-style: none;
      display: flex;
      align-items: center;
      margin-right: 10px;
      @media screen and (max-width: 991px) {
        margin-bottom: 10px;
      }

      li {
        padding: 0 22px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid transparent;
        @media screen and (max-width: 991px) {
          padding: 0 7px;
          height: 32px;
        }
        &:hover {
          border: 2px solid ${Colors.HEADER_FONT};
          border-radius: 35px;
        }

        a {
          color: ${Colors.HEADER_FONT} !important;
          font-size: 18px;
          font-family: ${FontFamily.SOURCESANS_SEMI_BOLD};
          white-space: nowrap;
          cursor: pointer;
          @media screen and (max-width: 991px) {
            font-size: 16px;
          }
        }
      }
    }

    .ant-btn {
      padding: 0 20px;
      min-width: 140px;
      height: 30px;
      border-radius: 25px;
      background: ${Colors.SUCCESS};
      color: ${Colors.WHITE};
      font-size: 14px;
      font-family: ${FontFamily.SOURCESANS_SEMI_BOLD};
      border: none;
      outline: none;
      &:hover {
        color: ${Colors.WHITE};
        border-color: ${Colors.SUCCESS};
        border: none;
      }
    }
  }
  .linkedin {
    .right-content {
      margin-top: 20px;
    }
    .user-login {
      display: flex;
      align-items: center;
      gap: 5px;
      top: 0px;
      @media screen and (max-width: 450px) {
        justify-content: right;
        right: 0 !important;
      }
    }
  }
  .social-image {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

export default HeaderWrapper;
