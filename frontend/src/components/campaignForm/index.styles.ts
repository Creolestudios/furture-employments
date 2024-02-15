import { styled } from 'styled-components';
import Form from 'antd/es/form/Form';
import { Colors } from '../../styles/variable';

const StyledForm = styled(Form)`
  .sub-heading {
    padding-bottom: 15px;
  }
  .action-campaign {
    margin-left: 10px;
    @media screen and (min-width: 450px) and (max-width: 1024px) {
      margin-left: 65px;
    }
    @media screen and (max-width: 450px) {
      margin: 25px 0 0 -50px;
    }
  }
  .field-sub {
    margin: -10px 0 20px 150px;
    color: #555555;
    @media screen and (max-width: 450px) {
      margin: -10px 0 20px 0;
    }
  }
  .ant-form-item.ant-form-item-with-help.ant-form-item-has-error {
    .ant-input,
    .ant-picker,
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: #b94a48;
    }
    .ant-col.ant-form-item-control {
      display: block !important;
      margin-bottom: 0 !important;
    }
  }
  .ant-form-item-required::before {
    color: #b94a48 !important;
  }
  .ant-form-item-explain-error {
    margin-top: 5px;
    color: #b94a48;
  }
  label {
    color: #333333 !important;
  }
  .ant-col.ant-form-item-control {
    display: block !important;
    margin-bottom: 20px;
  }

  .ant-form-item {
    &.description {
      .ant-form-item-explain-error {
        margin-top: 12px;
      }
    }
    .ant-row {
      .ant-col {
        label {
          justify-content: end;
        }
      }
    }
  }

  .page-top {
    display: flex;
    justify-content: space-between;
    h2 {
      color: #58474c;
      font-size: 26px;
    }
    a {
      color: ${Colors.SUCCESS};
    }
  }

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
        .ant-picker {
          width: 100%;
        }
        .ant-form-item-control-input {
          width: 100%;
          max-width: 500px;
          /* min-width: 400px; */
        }

        .ant-form-item-explain {
          padding-bottom: 12px;
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
