import { styled } from 'styled-components';

export const ResetPasswordWrapper = styled.div`
  margin: 40px 0;

  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 40px;
  }
  .reset-password-form-wrapper {
    max-width: 550px;
    margin: 0 auto;
    .ant-form-item {
      .ant-form-item-row {
        .ant-form-item-label {
          margin-right: 15px;
        }
        .ant-form-item-control {
          max-width: 100%;
        }
      }
    }
  }

  .reset-password-submit {
    button {
      background: #6eb53f;
      color: #fff;
      &:hover {
        border-color: inherit !important;
        color: #fff !important;
      }
      height: 45px;
      padding: 10px 40px;
    }
    margin-left: 160px;
    margin-top: 40px;
  }
`;
