import { styled } from 'styled-components';
import { Colors } from '../../../styles/variable';

const StyledCvScreen = styled.div`
  color: #58474c;
  .cv-content {
    background-color: #f4f2ed;
    padding: 17px;
    border-radius: 5px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    a,
    .file-not-exist {
      color: ${Colors.SUCCESS};
      margin-left: 5px;
    }
    .update {
      margin-left: 5px;
    }
  }

  .upload-form {
    padding: 20px 15px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-width: 4px;
    border-radius: 5px;

    h4 {
      color: #58474c;
      margin-bottom: 15px;
    }

    .success-btn {
      border-radius: 3px;
      margin-top: 6px;
    }
    .file-upload {
      .ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
        width: 350px !important;
      }
    }
  }

  .download-btn {
    color: ${Colors.SUCCESS};
    margin-left: 5px;
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    &:hover {
      color: ${Colors.SUCCESS} !important;
      border: none;
    }
  }
`;

export default StyledCvScreen;
