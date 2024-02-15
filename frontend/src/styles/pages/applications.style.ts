import styled from 'styled-components';
import { Colors } from '../variable';

export const UpdateCvStyle = styled.div`
  .candidate-cv-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      color: #58474c;
      font-size: 26px;
      margin-top: 0;
    }
    a {
      color: ${Colors.LI_GREEN};
    }
  }

  .ant-btn {
    background: none;
    border: none;
    box-shadow: none;
    &.download {
      color: ${Colors.LI_GREEN};
      cursor: pointer;
    }
  }
  .select-cvContent {
    margin-top: 10px;
  }
  .candidatecvform {
    margin: 30px 0;
    width: 100%;
    .select-from-cv {
      display: flex;
      .cv-box {
        width: 50%;
      }
      .ant-form-item {
        width: 100%;
      }
      gap: 15px;
      .cv-content {
        .ant-input {
          height: 300px;
        }
      }
    }
  }
  .action-cv {
    .ant-form-item-control {
      margin-left: 0;
    }
    &.candidate {
      margin-top: 20px;
    }
  }
`;
