import { styled } from 'styled-components';
import Form from 'antd/es/form/Form';
import { FontFamily, Colors } from '../../../styles/variable';

const StyledForm = styled(Form)`
  .password-modal-body-content {
    padding: 15px 20px;

    p {
      color: #505050;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  .password-modal-footer {
    border-top: 1px solid #ddd;
    background-color: #f5f5f5;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .footer-btn {
      border: none;
      box-shadow: none;
      font-family: ${FontFamily.SOURCESANS_BOLD};
      color: ${Colors.WHITE};
      font-size: 14px;
      border-radius: 0;

      &:hover {
        color: ${Colors.WHITE} !important;
        border-color: none;
      }
    }

    .login {
      background: ${Colors.SUCCESS};
      width: 200px;
      &:hover {
        background: ${Colors.SUCCESS_HOVER};
        color: ${Colors.PANTONE_BLACK_66} !important;
      }
    }

    .cancel {
      background: ${Colors.PANTONE_BLACK_66};
      &:hover {
        background: ${Colors.PANTONE_BLACK_33};
        color: ${Colors.PANTONE_BLACK_66} !important;
      }
    }
  }
`;

export default StyledForm;
