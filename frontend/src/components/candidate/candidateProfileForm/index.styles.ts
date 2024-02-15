import { styled } from 'styled-components';
import Form from 'antd/es/form/Form';
import { Colors } from '../../../styles/variable';

const StyledForm = styled(Form)`
  .sub-heading {
    padding-bottom: 15px;
  }
  .candidate-hr {
    margin-top: -10px;
  }
  .ant-form-item {
    /* margin-bottom: 0; */
    .ant-row {
      .ant-col {
        label {
          justify-content: end;
        }
      }
    }
    /* .ant-form-item-control {
      display: flex;
      flex-direction: row;
      margin-bottom: 24px;

      .ant-form-item-control-input {
        margin-right: 15px;
      }
    } */
  }

  .profile-form-item,
  .ant-form-item {
    .ant-row {
      .ant-form-item-label {
        label {
          min-width: 150px;
          @media screen and (max-width: 450px) {
            min-width: 0;
          }
        }
      }
      .ant-form-item-control {
        .ant-form-item-control-input {
          max-width: 400px;
          width: 100%;
          /* min-width: 400px; */
        }

        .ant-form-item-explain {
          padding-bottom: 12px;
        }
      }
    }
  }

  .upload-cv-later,
  .terms-condition {
    .ant-form-item-row {
      .ant-form-item-control {
        .ant-form-item-control-input {
          .ant-form-item-control-input-content {
            display: flex;
            justify-content: center;

            .checkbox-link {
              a {
                margin-left: 2px;
                color: ${Colors.SUCCESS};
              }
            }
          }
        }
      }

      .ant-form-item-explain {
        padding-bottom: 12px;
        max-width: 400px;
        display: flex;
        justify-content: center;
      }
    }
    .ant-form-item-explain-error {
      margin-left: -30px;
    }
  }
  .file-upload {
    .ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
      width: 400px !important;
    }
  }
  .work-right {
    .ant-row {
      .ant-form-item-control {
        .ant-form-item-control-input {
          max-width: 500px;
          .ant-form-item-control-input-content {
            label {
              &:last-child {
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  .success-btn {
    margin: 5px 10px 40px 98px;
  }
  .terms-condition {
    padding-left: 68px;
  }
`;

export default StyledForm;
