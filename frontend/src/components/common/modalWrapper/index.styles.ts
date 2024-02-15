import { styled } from 'styled-components';
import { Modal } from 'antd';
import { Colors } from '../../../styles/variable';

const ModalStyledWrapper = styled(Modal)`
  .ant-modal-content {
    padding: 0;

    .ant-modal-header {
      border-bottom: 1px solid #ddd;
      padding: 15px;

      .ant-modal-title {
        font-size: 22px;
        color: #020d14;
        text-transform: uppercase;
        text-align: center;
        line-height: 27px;
      }
    }
    .ant-modal-footer {
      padding: 15px;
      border-top: 1px solid #ddd;
    }
  }
  &.campaign-module {
    .ant-modal-content {
      padding: 15px;
      .ant-modal-body {
        padding: 25px 0;
      }
      .ant-modal-header {
        padding-left: 0;
      }
      .ant-modal-title {
        text-align: left;
        color: #6cb33f;
      }
    }
  }
  &.preview-modal {
    width: 900px !important;
    height: 550px !important;
  }
  &.prospect-address {
    .peoples-add {
      .row {
        .ant-form-item {
          margin-bottom: 20px;
          .ant-input {
            margin-bottom: 0;
          }
        }
        &:last-child {
          .ant-form-item {
            margin-bottom: 0;
          }
        }
      }
    }
    .ant-form-item {
      width: 100%;
    }
    .heading {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 5px;
    }
    .heading-sub {
      font-size: 16px;
    }
    .row {
      display: flex;
      gap: 10px;
      &.client-form-contact {
        .ant-form-item {
          width: 50%;
        }
        .sub-row {
          width: 50%;
          .ant-form-item {
            &:first-child {
              width: 40%;
            }
            &:last-child {
              width: 60%;
            }
          }
        }
      }
      .sub-row {
        display: flex;
        gap: 10px;
        .ant-form-item {
          width: 100%;
          &:first-child {
            width: 40%;
          }
          &:last-child {
            width: 60%;
          }
        }
        @media screen and (max-width: 450px) {
          display: flex;
          .ant-form-item {
            &:first-child {
              width: 35%;
            }
            &:last-child {
              width: 55%;
            }
          }
        }
      }
      /* .ant-input {
        margin-bottom: 10px;
      } */
      .client-form-contact {
        width: 100%;
        &:first-child {
          width: 50%;
        }
      }
    }
    .add-row {
      display: flex;
      justify-content: space-between;
    }
    .action {
      display: flex;
      justify-content: right;
      gap: 25px;
    }
    hr {
      opacity: 0.5;
      margin: 10px 0 10px 0;
    }
  }
  &.convert-modal {
    width: 700px !important;
    .heading {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  &.delete-modal {
    .ant-modal-title {
      color: ${Colors.GREY} !important;
    }
  }
  &.apply-modal {
    .apply-link {
      display: flex;
      font-size: 16px;
    }
  }
  &.recommendation-modal {
    width: 40% !important;
    /* height: 100% !important; */
    @media screen and (max-width: 450px) {
      width: 85% !important;
    }
    .ant-modal-content {
      .ant-modal-body {
        height: 300px;
      }
    }
  }
`;

export default ModalStyledWrapper;
