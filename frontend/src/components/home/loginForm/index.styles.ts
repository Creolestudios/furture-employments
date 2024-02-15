import { styled } from 'styled-components';
import Form from 'antd/es/form/Form';
import { FontFamily, Colors } from '../../../styles/variable';

const StyledForm = styled(Form)`
  .modal-body-content {
    padding: 15px 20px;
  }
  .linkedin-signin {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .linkedin-logo-signin {
      border: none;
    }
    .linkedin-logo-signin:hover {
      border: none;
      background: none;
      cursor: pointer !important;
    }
  }
  .modal-footer {
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
  .link-btns {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-bottom: 20px;
    padding-top: 10px;
    .ant-btn.employer-btn {
      background-color: ${Colors.PANTONE_BLUE} !important;
      color: ${Colors.WHITE};
    }
    .ant-btn.candidate-btn {
      background-color: ${Colors.PANTONE_BLUE_STRONG} !important;
      color: ${Colors.WHITE};
    }
  }
`;

export default StyledForm;
