import { styled } from 'styled-components';

const SpinWrapper = styled.div`
  .ant-spin {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    span {
      font-size: 50px;
    }
  }
`;

export default SpinWrapper;
