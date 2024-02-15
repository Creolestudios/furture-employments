import { styled } from 'styled-components';
import BANNER from '../../assets/images/banner.jpg';
import { Colors, FontFamily } from '../../styles/variable';

const HomeScreenWrapper = styled.div`
  .breadcrumb-section {
    display: flex;
    list-style: none;
    line-height: 1;
    padding: 8px 5px;
    min-height: 30px;
    background: #f1f3f4;
    @media screen and (min-width: 1441px) {
      padding: 8px 150px;
    }
    @media screen and (max-width: 425px) {
      display: none;
    }

    li {
      font-family: ${FontFamily.SOURCESANS_REGULAR};
      font-size: 13px;
      color: #b6b8b9;
      margin-right: 8px;
    }
  }

  .banner-section {
    min-height: 185px;
    background-image: url(${BANNER});
    background-size: cover;
    background-repeat: no-repeat;
    color: ${Colors.WHITE};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px 10px;
    text-align: center;

    .title {
      font-family: ${FontFamily.AlternateGotNo1D_REGULAR};
      font-size: 61px;
      font-weight: 100;
      text-transform: uppercase;
    }

    .descriptiion {
      font-family: ${FontFamily.SOURCESANS_REGULAR};
      font-size: 16px;
      font-weight: 100;
    }
  }

  .content-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 15px;
    background: #f1f3f4;

    .login-container {
      display: flex;
      padding: 40px 0 0px 0;
      @media screen and (max-width: 425px) {
        flex-direction: column;
      }
    }

    p {
      font-family: ${FontFamily.SOURCESANS_REGULAR};
      font-size: 18px;
      color: ${Colors.GREY};
      line-height: 22px;
      padding: 10px 0;
      @media screen and (max-width: 425px) {
        text-align: center;
      }
    }

    .register {
      li {
        padding: 0;
      }
    }

    .auth-btn {
      background: none;
      border: none;
      font-size: 18px;
      font-family: ${FontFamily.SOURCESANS_BOLD};
      color: ${Colors.BLACK};
      box-shadow: none !important;
      &:focus-visible {
        outline: none !important;
        box-shadow: none !important;
        border: none;
      }
      .wave-motion-appear-active {
        box-shadow: none;
      }

      span {
        outline: none;
        border: none;
      }

      &:hover {
        color: ${Colors.BLACK};
        border-color: transparent;
      }
    }
  }
`;

export default HomeScreenWrapper;
