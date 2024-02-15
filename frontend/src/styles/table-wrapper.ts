import { styled } from 'styled-components';
import { Colors } from './variable';

export const TableWrapper = styled.aside`
  width: 100%;
  margin-bottom: 20px;
  .ant-tag {
    font-size: 12px;
    font-weight: 400;
  }
  h4 {
    margin-bottom: 2px;
    font-size: 15px;
  }
  .inviteForm {
    .ant-form-item .ant-form-item-control-input {
      width: 100%;
    }
  }
  .succes-btn {
    margin-right: 10px;
    .ant-btn {
      color: #fff;
      background-color: ${Colors.LI_GREEN};
      :hover {
        color: #fff !important;
      }
    }
    :not(.ant-btn-disabled):hover {
      color: #fff;
    }
  }
  table {
    tr {
      th {
        &.text-center {
          text-align: center;
        }
      }
      td {
        &.text-center {
          text-align: center;
        }
        &.hide-action {
          display: none;
        }
      }
    }
  }
  .ant-table-wrapper {
    .ant-table-content .ant-table-thead {
      height: 16px !important;
      > tr .ant-table-cell.status {
        text-align: center;
      }
      > tr :first-child {
        /* min-width: 200px !important; */
        /* @media screen and (max-width: 991px) {
          min-width: auto !important;
        } */
      }
      .status {
        /* min-width: 150px !important; */
      }
      > tr > th {
        padding: 6px 16px;
        background-color: ${Colors.WHITE};
      }
      > tr > td {
        background-color: ${Colors.WHITE};
      }
      .date {
        min-width: 150px !important;
      }
    }
    .ant-table-content .ant-table-tbody {
      .application-tag {
        padding: 2px 30px;
      }
      .link {
        cursor: pointer;
        color: #6cb33f !important;
        a {
          color: #6cb33f !important;
        }
      }
      .publish {
        p {
          display: flex;
          justify-content: center;
        }
      }

      > tr > td {
        justify-content: center;
        padding: 2px 16px;
        @media screen and (max-width: 600px) {
          padding: 2px 10px;
        }
        .publish {
          .ant-btn {
            background-color: #6cb33f !important;
          }
        }
        .unpublish {
          .ant-btn {
            background-color: #58474c;
          }
        }
        .ant-btn {
          background-color: ${Colors.PANTONE_BLUE};
          color: ${Colors.WHITE};
          height: auto;
          padding: 2px 15px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
        }
        .edit-btn {
          background-color: ${Colors.LI_GREEN} !important;
        }
      }
    }
    &.address-table {
      .address-actions {
        max-width: 50px;
      }
    }
    &.client-table {
      .ant-table-tbody > tr > td {
        padding: 2px 14px;
      }
    }
    &.apply-table {
      .ant-table-tbody > tr > td {
        .ant-btn {
          background-color: ${Colors.LI_GREEN};
        }
      }
    }
    &.campaign-table {
      tr > th {
        text-align: center;
        &:first-child {
          text-align: left;
        }
      }
      .ant-table-tbody > tr > td {
        text-align: center;
        padding: 10px;
      }
      .title {
        text-align: left !important;
      }
      .details-btn {
        padding: 2px 16px !important;
        height: auto !important;
      }
    }
    .stop-action,
    .start-action {
      padding: 3px 16px !important;
      height: auto !important;
    }
    .stop-action {
      background: ${Colors.CR_RED} !important;
    }
    .start-action {
      background: ${Colors.LI_GREEN} !important;
    }
    .stop-action.ant-popover-disabled-compatible-wrapper {
      .ant-btn {
        background: none !important;
      }
    }
    .start-action.ant-popover-disabled-compatible-wrapper {
      .ant-btn {
        background: none !important;
      }
    }
    .ant-tag.campaign-status-popover {
      padding: 2px 16px;
    }
  }
  &.vacancy-wrapper {
    tr {
      td {
        &:last-child {
          text-align: center;
        }
      }
    }
  }
`;

export default TableWrapper;
