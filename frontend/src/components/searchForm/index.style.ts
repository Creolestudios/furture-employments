import { styled } from 'styled-components';

const SearchFormWrapper = styled.div`
  margin-bottom: 49px;
  .ant-form {
    display: flex !important;
    flex-wrap: wrap;
    .ant-form-item {
      .ant-form-item-label {
        label {
        }
      }
      .ant-form-item-control {
        flex: 1;
        margin-bottom: 0;
        .ant-form-item-control-input {
          width: 100%;
        }
      }
    }
    .col-3 {
      width: 25%;
    }
    .col-9 {
      width: 75%;
    }
    .col-12 {
      width: 100%;
    }
    .right {
      justify-content: end;
      .ant-form-item {
        width: 25%;
        margin-right: 0;
        text-align: revert;
        float: right;
        margin-left: 15px;
      }
    }
    .ant-col.ant-form-item-label {
      text-align: left;
    }
    .ant-row.ant-form-item-row {
      display: flex;
      flex-direction: column;
    }
    .ant-form-item .ant-form-item-label > label::after {
      content: ' ' !important;
    }
    .select .ant-select-selector {
      /* min-width: 200px; */
      /* max-width: 200px; */
    }
    @media (max-width: 767px) {
      .col-3.sm {
        width: 50%;
      }
      .col-9.sm {
        width: 100%;
      }
      .right {
        .ant-form-item {
          width: 100%;
        }
      }
    }
  }
  &.search-client-form {
    .ant-form {
      flex-wrap: nowrap !important;
    }
  }
  .search-submit,
  .reset {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .salary-from {
    .ant-select-selector {
      min-width: 210px;
      width: 100%;
      max-width: 240px;
    }
  }
`;
export default SearchFormWrapper;
