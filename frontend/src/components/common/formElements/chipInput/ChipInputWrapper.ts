import styled from 'styled-components';
import { Colors } from '../../../../styles/variable';

const ChipInputWrapper = styled.div`
  .tag-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: max-content;
  }
  &.container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;
    border: 1px grey solid;
    border-radius: 5px;
    color: black;
  }

  &.container input {
    /* width: 100%; */
    min-width: 315px;
    border: none;
    border-radius: 5px;
    padding-left: 14px;
  }

  .tag {
    display: flex;
    align-items: center;
    margin: 7px 0;
    margin-right: 10px;
    padding: 0 10px;
    padding-right: 5px;
    border: 1px solid #fafafa;
    border-radius: 5px;
    background-color: #fafafa;
    white-space: nowrap;
    color: black;
    text-wrap: wrap;
  }

  .tag button {
    display: flex;
    padding: 6px;
    border: none;
    background-color: unset;
    cursor: pointer;
    color: red;
  }
`;
export default ChipInputWrapper;
