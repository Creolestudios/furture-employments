import { styled } from 'styled-components';
import { Colors } from '../../../../styles/variable';

const SubFooterWrapper = styled.div`
  background-color: ${Colors.FOOTER_BACKGROUND};
  color: ${Colors.WHITE};
  display: flex;
  justify-content: space-around;
  padding: 24px 50px;
  .usefull {
    .useful-section {
      display: flex;
      flex-direction: row;
      gap: 30px;
      .sub-list {
        padding-top: 0 !important;
      }
    }
    ul {
      li {
        a {
          color: #fff;
        }
        :hover {
          color: #6db345 !important;
        }
      }
    }
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    .usefull {
      display: none;
    }
    .connect-withus li {
      margin-top: 10px !important;
      &:last-child {
        margin-bottom: 10px !important;
      }
    }
    .sub-footer-section {
      border-right: none !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      width: 100% !important;
      position: relative;
      padding: 0 !important;
      ul {
        padding-left: 20px !important;
        align-items: center;
        list-style: none;
        text-align: center;
        gap: 5px;
      }
      h3 {
        margin-top: 10px;
        margin-bottom: 5px !important;
        text-align: center;
      }
      .contact li {
        p {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
          align-items: center;
        }
      }
      .awards {
        justify-content: center;
        li {
        }
      }
    }
  }
  .sub-footer-section {
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    height: 100%;
    padding: 0 16px 0 10px;
    font-size: 16px;
    line-height: 24px;
    width: 25%;
    h3 {
      margin-bottom: 30px;
    }
    .list {
      /* padding-top: 30px; */
      padding-left: 20px;
      li {
        margin: 0;
      }
    }
    .awards {
      list-style-type: none;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 35px;
        margin-bottom: 15px;
      }
    }
    .list-item {
      margin-left: 5px;
      word-wrap: break-word;
    }
    ul li:hover p {
      color: #6db345;
    }
  }
  .connect-withus {
    li {
      margin-top: 10px;
    }
  }
`;

export default SubFooterWrapper;
