import { styled } from 'styled-components';
import { Colors } from '../../styles/variable';

const StyledPageNotFound = styled.div`
  position: relative;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -100%);
  @media screen and (max-width: 500px) {
    left: 50%;
    top: 250px;
  }
  @media screen and (min-width: 500px) and (max-width: 1000px) {
    left: 66%;
    top: -150px;
    .content {
      width: 350px;
      margin-left: 200px;
    }
  }

  .error {
    display: flex;
    padding: 20px;
    align-items: end;
    justify-content: center;
    gap: 15px;

    h1 {
      color: ${Colors.GREY};
      font-size: 50px;
    }

    h4 {
      color: ${Colors.GREY};
      font-size: 25px;
    }
  }

  .content {
    p {
      font-size: 18px;
      line-height: 25px;
    }
    .title {
      color: #58474c;
      font-weight: 700;
      line-height: 35px;
    }
    a {
      color: ${Colors.SUCCESS};
    }
  }
`;

export default StyledPageNotFound;
