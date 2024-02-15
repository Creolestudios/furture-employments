import { styled } from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

const UpdateCVWrapper = styled(Content)`
  padding: 5px;
  padding-right: 40px;
  .prev-file {
    background: #f4f2ed;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    .link {
      color: #6cb33f;
    }
    strong {
      color: #58474c;
    }
  }
  .form {
    background-color: inherit !important;
    border-color: #ddd !important;
    border-width: 4px !important;
    border-radius: 5px !important;
    border: 4px solid;
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    .file-upload {
      .ant-form-item-control {
        flex-direction: column;
      }
      .ant-form-item-has-error {
        flex-direction: column;
      }
      .ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
        width: 330px !important;
      }
    }
    h4 {
      margin-bottom: 10px;
      font-size: 15px;
    }
  }
`;

export default UpdateCVWrapper;
