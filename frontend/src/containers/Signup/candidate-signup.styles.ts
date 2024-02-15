import { styled } from 'styled-components';
import { Colors, FontFamily } from '../../styles/variable';

const StyledCandidateSignup = styled.div`
  .candidate-signup {
    h1 {
      font-size: 45px;
      font-weight: 100;
      font-family: ${FontFamily.AlternateGotNo1D_REGULAR};
      padding: 40px 0 20px 0;
    }

    .container {
      display: flex;
      @media screen and (max-width: 450px) {
        flex-direction: column;
      }
      .left {
        flex: 1;

        .ant-layout-content {
          margin-top: 0;
        }
      }
      .right {
        max-width: 360px;
        height: fit-content;
        margin-left: 20px;

        .widget {
          h3 {
            background: ${Colors.STRONG_GREEN};
            font-size: 25px;
            font-family: ${FontFamily.AlternateGotNo1D_REGULAR};
            color: ${Colors.WHITE};
            text-align: center;
            text-transform: uppercase;
            font-weight: 100;
            padding: 20px 0;
          }
          .widget-content {
            padding: 10px 10px 10px;
            p {
              padding-bottom: 10px;
              line-height: 18px;
              color: #505050;

              &:last-child {
                a {
                  color: ${Colors.SUCCESS};
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledCandidateSignup;
