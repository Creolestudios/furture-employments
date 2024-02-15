import { styled } from 'styled-components';
import Form from 'antd/es/form/Form';
import { Colors } from '../../../styles/variable';

const StyledSignupForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0;
    .ant-form-item-control {
      display: flex;
      flex-direction: row;
      margin-bottom: 24px;
      @media screen and (max-width: 550px) {
        margin-bottom: 10px;
      }
      .ant-form-item-control-input {
        margin-right: 15px;
      }
    }
  }
  .signup-form-footer {
    border-top: 1px solid #ddd;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    @media screen and (max-width: 550px) {
      display: block;
      margin-left: 25px;
      .employer-btn {
        text-transform: uppercase;
      }
      .candidate-btn {
        margin-top: 15px;
        text-transform: uppercase;
      }
    }

    .employer-btn {
      background: ${Colors.PANTONE_BLACK_66};
      color: ${Colors.WHITE};
      &:hover {
        color: ${Colors.WHITE};
      }
    }
    .candidate-btn {
      background: ${Colors.STRONG_GREEN};
      color: ${Colors.WHITE};
      &:hover {
        color: ${Colors.WHITE};
      }
    }
  }
`;

export default StyledSignupForm;
