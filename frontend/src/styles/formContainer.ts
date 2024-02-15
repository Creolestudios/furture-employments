import { styled } from 'styled-components';
import { Layout } from 'antd';
import { Colors } from './variable';

const { Content } = Layout;

const FormPageWrapper = styled(Content)`
  /* margin-top: 5px; */
  .super-admin-form {
    .ant-form-item {
      .ant-form-item-control {
        flex-direction: column;
        .ant-form-item-control-input {
          max-width: 300px;
          min-width: 200px;
        }
      }
    }
  }

  .ant-form-item-control-input {
    .ant-input-number-group-wrapper {
      /* width: 100%; */
    }
  }

  .view-all {
    float: right;
    color: #6cb33f;
    margin: 0 0 9px;
    cursor: pointer;
    @media screen and (max-width: 450px) {
      margin: -15px 0 9px;
    }
  }
  &.candidate-skills {
    .page-header h1 {
      font-size: 26px;
    }
    .form-action,
    .comma-separated {
      padding-left: 150px;
    }
    .comma-separated {
      margin: 0;
    }
    hr {
      margin: 15px 0;
    }
    .skills {
      margin-bottom: -15px;
      padding-left: 100px;
      .ant-select {
        width: 200px;
      }
    }
    .skill-error {
      padding-left: 50px;
      color: red;
    }
    button {
      border: none;
      background-color: ${Colors.LI_GREEN};
      color: ${Colors.WHITE};
      &:hover {
        color: #fff !important;
        border: none;
      }
    }
  }
  .profile-form {
    @media screen and (max-width: 450px) {
      padding-left: 15px;
    }
    .ant-form-item {
      .ant-form-item-control {
        .ant-form-item-control-input {
          min-width: 300px;
        }
      }
    }
    .phoneNumber {
      .ant-input-number {
        .ant-input-number-input {
          min-width: 300px;
        }
      }
    }
  }
  .page-header {
    border: none;
    margin: 0 0 16px 0;
    padding: 0;
    h1 {
      @media screen and (max-width: 450px) {
        font-size: 26px;
      }
    }
    .vacancy-link {
      float: right;
      color: #6cb33f;
      margin-top: -45px;
      cursor: pointer;
      @media screen and (max-width: 450px) {
        margin-top: -65px;
      }
    }
  }
  .quill {
    height: 250px;
    margin-bottom: 35px;
    /* width: 600px; */
  }
  .ant-collapse {
    border: none;
    margin-top: 10px;
    .ant-collapse-header {
      padding: 8px 35px 8px 14px;
      background-color: #d9edf7;
      border-color: #bce8f1;
      color: #3a87ad;
      border-radius: 4px !important;
      .pull-right {
        float: right;
      }
      .ant-collapse-expand-icon {
        display: none;
      }
    }
    .ant-collapse-content {
      border: none;
      > .ant-collapse-content-box {
        padding: 10px 0;
      }
    }
  }
  .ant-collapse > .ant-collapse-item:last-child {
    border: none;
    > .ant-collapse-header {
      border: none;
    }
  }
  .client {
    display: flex;
    gap: 10px;
    .ant-btn {
      background-color: #6cb33f;
      color: #fff;
      :hover {
        background-color: #6cb33f !important;
        color: #fff !important;
      }
    }
    .ant-form {
      display: flex;
    }
    .prospect {
      display: flex;
      gap: 10px;
      .ant-select-selector {
        width: 170px;
      }
    }
    .add-btn {
      position: relative;
      right: 0;
    }
    .prospect-client {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      justify-content: space-between;
      @media screen and (max-width: 450px) {
        flex-direction: column;
        .prospect {
          flex-direction: column;
          margin-bottom: 10px;
          .ant-select-single {
            .ant-select-selector {
              width: 100% !important;
            }
          }
        }
      }
    }
  }
  .prospect-details-form {
    @media screen and (max-width: 450px) {
      margin-top: 10px;
    }
    .page-header {
      .ant-row {
        width: 100% !important;
        .ant-form-item-control-input {
          width: 100% !important;
        }
      }
      .input-wrapper {
        display: flex;
        .ant-form-item-has-error {
          .ant-form-item-control {
            flex-direction: column;
            gap: 2px;
          }
        }
        .ant-input {
          width: 350px;
          @media screen and (max-width: 450px) {
            width: 164px;
          }
        }
        .website {
          font-weight: 400;
          font-size: 24px;
        }
      }
      .company-name {
        font-weight: 600;
        font-size: 36px;
      }
      .desc {
        font-weight: 500;
        font-size: 22px;
      }
    }
  }
  .candidates {
    /* display: table-row; */
    .ant-form {
      display: block;
      /* > div {
        margin-bottom: 15px;
      } */
      .code {
        display: flex;
        .select {
          /* margin-right: 15px !important; */
          min-width: 180px;
          @media screen and (max-width: 991px) {
            min-width: 150px;
          }
          .ant-form-item-control-input {
            margin-right: 0;
          }
        }
      }
      .ant-form-item {
        margin-bottom: 15px;
        margin-right: 15px;
        /* #skills {
          border: 1px solid #d9d9d9;
          flex-direction: row;
          padding: 0 10px;
          display: flex;
          flex-wrap: wrap;
          .ant-input {
            box-shadow: none;
            padding-left: 0;
            min-width: 50px;
            width: inherit;
            flex: 1;
          }
          &::-webkit-scrollbar {
            height: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background: #ccc;
          }
        } */
      }
    }
    .name {
      display: flex;
      gap: 15px;
      .select {
        .ant-form-item {
          min-width: 200px !important;
        }
      }
      .ant-form-item {
        margin-top: 5px;
      }
      .salary-to {
        margin-left: 5px;
      }
      .btn {
        display: flex;
        .reset {
          .ant-btn {
            background-color: #fff;
            color: #000;
            :hover {
              background-color: #fff !important;
              color: #000 !important;
            }
          }
        }
        .ant-form-item {
          margin-top: 25px;
        }
      }
      @media screen and (max-width: 436px) {
        display: block;
      }
    }
  }
  @media screen and (max-width: 991px) {
    width: auto !important;
    padding-right: 25px !important;
  }
  h1 {
    color: #58474c;
    margin-bottom: 20px;
  }
  .preferences {
    margin: -20px 0px 16px 175px;
  }
  hr {
    opacity: 0.3;
    margin-bottom: 15px;
    margin-top: 5px;
    width: auto;
    @media only screen and (max-width: 768px) {
      width: auto !important;
    }
  }
  .field-sub {
    margin: -20px 0 20px 180px;
    @media only screen and (max-width: 426px) {
      margin: 0;
    }
  }
  .ant-form-item {
    margin-bottom: 0;
    .ant-form-item-control {
      display: flex;
      flex-direction: row;
      margin-bottom: 24px;
      @media only screen and (max-width: 426px) {
        display: block;
        margin-bottom: 14px;
      }

      .ant-form-item-control-input {
        /* margin-right: 15px; */
        .reset {
          background-color: ${Colors.PANTONE_BLACK_66};
        }
      }
    }
  }
  .ant-form-item.no-label {
    margin-left: 180px !important;
    @media only screen and (max-width: 426px) {
      margin-left: 0 !important;
      .ant-form-item-control-input {
        width: 100% !important;
      }
    }
    .ant-form-item-control-input {
      min-width: 400px;
      @media only screen and (max-width: 426px) {
        min-width: 250px !important;
      }
    }
  }
  .vacancy-form {
    .ant-form-item {
      .ant-form-item-control {
        .ant-form-item-control-input {
          min-width: 330px;
          @media only screen and (max-width: 426px) {
            min-width: 250px !important;
          }
        }
      }
    }
    .phoneNumber {
      .ant-input-number {
        .ant-input-number-input {
          min-width: 300px;
        }
      }
    }
    .file-upload {
      .ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
        width: 330px !important;
      }
      .ant-form-item-control {
        flex-direction: column;
      }
      .ant-form-item-has-error {
        flex-direction: column;
      }
    }
    .salary {
      display: flex;
      flex-direction: row;
      margin-left: 110px;
      .ant-form-item .ant-form-item-control {
        flex-direction: column !important;
      }
      .ant-form-item-explain-error {
        margin-left: 10px !important;
      }
      @media only screen and (max-width: 426px) {
        margin-left: -10px !important;
        .ant-input-number-group-wrapper {
          width: 335px;
        }
        .ant-form-item-has-error {
          margin-left: 0 !important;
        }
        flex-direction: column;
        .ant-form-item-has-error.salary2 {
          margin-left: -50px !important;
        }
      }
      .range-checkbox {
        .ant-form-item-has-error {
          margin-left: 70px !important;
        }
      }
      .ant-form-item-has-error {
        /* margin-left: 0px; */
        margin-right: 5px;
      }
      .ant-form-item-has-error.salary2 {
        margin-left: 0px !important;
      }
      .ant-form-item {
        .ant-form-item-control-input {
          margin-left: 10px;
          min-width: 100px !important;
        }
      }
    }
  }
  .search-vacancies {
    .ant-form {
      flex-wrap: nowrap;
      .col-12 {
        width: 20% !important;
      }
    }
    .ant-btn {
      background-color: ${Colors.LI_GREEN};
      color: #fff;
      &:hover {
        color: #fff;
        border-color: #fff;
      }
    }
  }
  .no-data-msg {
    display: flex;
    @media only screen and (max-width: 426px) {
      flex-direction: column;
    }
  }
  .note-form {
    .note-form-action {
      display: flex;
      justify-content: space-between;
      .danger-btn {
        background: ${Colors.CR_RED};
        color: ${Colors.WHITE};
      }
    }
  }
`;

export default FormPageWrapper;
