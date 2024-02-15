import { styled } from 'styled-components';
import { Layout } from 'antd';
import { Colors } from '../../styles/variable';

const { Content } = Layout;

const ApplicationDetailWrapper = styled(Content)`
  .tags {
    margin-bottom: 15px;
    cursor: pointer;
  }
  .link {
    color: #6cb33f;
  }
  .map {
    display: block;
    max-width: 160px !important;
  }
  .ant-tabs .ant-tabs-tab {
    &:hover {
      color: inherit;
      background-color: #eeeeee;
    }
    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #555555;
    }
  }
  .details {
    display: flex;
    gap: 150px;
    background: #f4f2ed;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    @media screen and (max-width: 450px) {
      display: block;
    }
    .link {
      color: #6cb33f !important;
      cursor: pointer;
    }
    strong {
      color: #58474c;
    }

    .details-item {
      display: flex;
      margin-bottom: 12px;
      span {
        color: #58474c;
        padding: 0 5px;
      }
    }
    .status-tag {
      span {
        color: #fff;
      }
    }
    .ant-tag {
      font-size: 12px;
      font-weight: 400;
    }
  }
  .futureProspects {
    background-color: #f2dede;
    border-radius: 5px;
    padding: 8px 35px 8px 14px;
    border: 1px solid #eed3d7;
    color: #b94a48;
    h3 {
      margin-bottom: 2px;
      font-size: 15px;
      line-height: 24px;
      color: #58474c;
    }
  }
  .reason {
    margin: 10px 0;
    padding: 0 0 0 15px;
    border-left: 5px solid #eeeeee;
    .heading {
      margin-bottom: 9px;
      font-size: 14px;
    }
    .small {
      display: block;
      line-height: 18px;
      color: #999999;
    }
  }
  hr {
    margin: 18px 0;
    border: 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #ffffff;
  }
  .hide-contact {
    margin-top: 10px;
  }
  .applicant-details {
    position: relative;
    padding: 40px 50px;
    margin: 20px 8px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 450px) {
      padding: 20px 20px;
      margin: 20px 0px;
      .updated {
        right: 5px !important;
        top: 20px !important;
        .ant-btn {
          font-size: 12px !important;
        }
      }
    }
    h2 {
      color: #96847e;
      margin-bottom: 10px;
    }
    .sub-heading {
      color: #6cb33f;
    }
    .skillset {
      margin-left: 30px;
    }
    .updated {
      position: absolute;
      right: 20px;
      top: 20px;
      text-align: right;
      .ant-btn {
        font-size: 14px;
        color: #fff;
        background-color: #0094ca;
      }
      .updated-date {
        text-align: center;
        color: ${Colors.PANTONE_BLACK_66};
        margin-top: 5px;
      }
    }
    .contact-details {
      .contact {
        display: block;
        margin-bottom: 18px;
        font-style: normal;
        line-height: 18px;
        .link {
          color: #6cb33f;
        }
      }
    }
  }
  .actions {
    text-align: right;
    margin-top: 15px;
    padding: 15px 15px;
    display: flex;
    border-top: solid 1px #ddd;
    .ant-btn {
      color: ${Colors.WHITE};
      border-radius: 5px;
      margin-right: 10px;
    }
    &.vacancy.details-tab-btn {
      justify-content: space-between;
      .danger-btn {
        button {
          background-color: ${Colors.CR_RED};
        }
        background: none !important;
      }
    }
    @media screen and (max-width: 450px) {
      padding: 15px 0px;
      flex-direction: column;
      .succes-btn {
        display: flex;
        margin-bottom: 10px;
      }
      .info-btn {
        text-align: left;
        margin-bottom: 10px;
      }
    }
    .succes-btn {
      margin-right: 10px;
      .ant-btn {
        color: #fff;
        background-color: ${Colors.LI_GREEN};
      }
    }
    .secondary-btn {
      background-color: ${Colors.GREY};
    }
    .danger-btn {
      background-color: ${Colors.CR_RED};
    }
    .inverse-btn {
      .ant-btn {
        color: #fff;
        background-color: ${Colors.PANTONE_BLACK_66};
        border: none;
      }
    }
    .info-btn {
      .ant-btn {
        color: #fff;
        background-color: ${Colors.PANTONE_BLUE};
      }
    }
    .danger-btn {
      .ant-btn {
        color: #fff;
        background-color: ${Colors.PANTONE_BLACK_66};
      }
    }
    .detail-right-action {
      display: flex;
      gap: 10px;

      justify-content: space-between;
      width: 100%;
      @media screen and (max-width: 450px) {
        gap: 5px;
      }
    }
  }
  .application-act {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 450px) {
      flex-direction: row;
    }
  }
  .details-tab-btn {
    @media screen and (max-width: 450px) {
      .succes-btn {
        /* flex-direction: column; */
        gap: 10px;
        margin-right: 0;
      }
      .danger-btn {
        .ant-btn {
          width: 100% !important;
        }
      }
    }
  }
  .vacancy {
    /* justify-content: flex-start; */
  }
  .ant-tabs-card > .ant-tabs-nav {
    color: #ba4160;
  }
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active {
    color: black;
  }
  .table {
    .ant-table .ant-table-container .ant-table-content .ant-table-thead {
      display: none;
    }
    .ant-table-wrapper .ant-table-tbody {
      > tr :first-child {
        color: black;
        font-weight: 500;
      }
      > tr > td {
        padding: 5px 1px;
      }
    }
  }
  .note-form {
    .ant-col.ant-form-item-control {
      display: block !important;
    }
    .note-form-action {
      justify-content: space-between;
      .danger-btn {
        background: #ba4160;
      }
    }
  }
  .add-note {
    border-top: 0;
    border-bottom: solid 1px #ddd;
    .note-form {
      .note-form-action {
        justify-content: space-between;
        .danger-btn {
          background: #ba4160;
        }
      }
    }
  }
  .notes {
    .time {
      font-weight: bold;
    }
    .title {
      font-weight: bold;
    }
    .desc {
      margin-top: 2px;
    }
  }
  .content-details {
    p,
    span {
      color: #58474c;
      padding: 3px 0;
    }
  }
  .missing-cv {
    background: #fcf8e3;
    border: #fbeed5;
    padding: 8px 35px 8px 14px;
    border-radius: 4px;
    margin: 20px 0;
    h2 {
      color: #58474c;
      font-size: 16px;
    }
    p {
      color: #c09853;
    }
  }
  .updates-reason {
    padding: 10px;
    margin: 0 10px;
    box-shadow: -7px 0px 0px 0px rgba(0, 0, 0, 0.2);
    .approve-reasons {
      color: ${Colors.PANTONE_BLACK_66};
      font-size: 14px;
      line-height: 1.7;
    }
    .approve {
      color: ${Colors.PANTONE_BLACK_33};
      text-transform: capitalize;
      margin-top: 10px;
    }
  }
  .update-reason {
    background: none;
    border: none;
    color: ${Colors.LI_GREEN};
    &:hover {
      color: ${Colors.LI_GREEN} !important;
      span {
        text-decoration: underline !important;
      }
    }
  }
  .reminder-section {
    h3 {
      margin-bottom: 10px;
    }
    .reminder-div {
      margin-top: 15px;
      .sub-head {
        font-size: 18px;
        font-weight: 500;
      }
      .additional-emails {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .date-time {
        margin: 10px 0 15px 0;
        display: flex;
        gap: 15px;
      }
    }
  }
  .status-select {
    width: 150px;
  }
  .status-form {
    .ant-form-item-control-input {
      width: 100%;
    }
    .btns {
      .ant-form-item-control-input-content {
        gap: 10px;
        display: flex;
        .cancel {
          background-color: ${Colors.PANTONE_BLACK_66};
        }
      }
    }
  }
  .timeline {
    margin-top: 30px;
  }
`;

export default ApplicationDetailWrapper;
