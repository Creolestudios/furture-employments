import { styled } from 'styled-components';
import { Colors } from '../../../styles/variable';

const SidemenuWrapper = styled.aside`
  /* padding-left: 50px; */
  margin-right: 20px;
  width: 220px;
  @media screen and (max-width: 500px) {
    padding-left: 5px;
    margin-right: 0;
  }
  .ant-card {
    box-shadow: none;
  }
  .ant-card-head {
    /* max-width: 220px; */
    background-color: #0094ca;
    min-height: 40px !important;
    color: ${Colors.WHITE};
    .ant-card-head-title {
      font-size: 18px;
    }
  }
  .ant-card-body {
    /* max-width: 220px; */
    padding: 5px 10px;
    background-color: rgba(16, 24, 32, 0.1);
    .ant-layout-sider.ant-layout-sider-dark {
      margin-top: -1px;
      ul {
        background-color: rgba(16, 24, 32, 0.1) !important;
        border-inline-end: none;
        .ant-menu-item-group-list {
          background-color: rgba(16, 24, 32, 0.001) !important;
        }
      }
    }
    .ant-menu {
      /* max-width: 215px; */
      font-size: 13px;
      .ant-menu-item {
        color: #58474c;
        padding-left: 2px !important;
        height: 24px;
        &.ant-menu-item-active,
        &.ant-menu-item-selected {
          padding: 2px 10px !important;
          background: rgba(0, 0, 0, 0.06);
        }
      }
      .ant-menu-item-group-title {
        font-weight: bold;
        color: ${Colors.PANTONE_BLUE_STRONG};
        padding: 5px 0px;
      }
    }
  }
`;

export default SidemenuWrapper;
