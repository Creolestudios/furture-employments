import { styled } from 'styled-components';
import { Colors, FontFamily } from '../../styles/variable';

const StyledSignupScreen = styled.div`
  background: ${Colors.WHITE};
  padding: 50px 0;
  .sigup-screen-header {
    border-top: 1px solid #eeeeee;
    display: flex;
    align-items: end;
    @media screen and (max-width: 550px) {
      padding-left: 20px;
    }

    h1 {
      font-family: ${FontFamily.AlternateGotNo1D_REGULAR};
      font-size: 45px;
      font-weight: 100;
      color: #020d14;
      margin: 40px 0;
    }
  }

  .signup-content {
    display: flex;
    @media screen and (max-width: 550px) {
      display: block;
      padding-left: 20px;
    }

    .signup-form-container {
      flex: 1;
      margin-right: 100px;
    }
    .signup-help-widget {
      width: 310px;
      h3 {
        background: ${Colors.STRONG_GREEN};
        font-family: ${FontFamily.AlternateGotNo1D_REGULAR};
        font-size: 25px;
        font-weight: 400;
        color: ${Colors.WHITE};
        text-align: center;
        padding: 20px 0px;
      }
      .widget-content {
        padding: 15px;

        h5 {
          color: #58474c;
          font-size: 16px;
          margin-top: 15px;
        }
        p {
          color: #505050;
          line-height: 18px;
          font-size: 16px;
          .privacy-link {
            color: #6eb53f;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default StyledSignupScreen;
