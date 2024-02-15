import { createGlobalStyle, styled } from 'styled-components';
import { FontFamily, Colors } from './variable';

const Global = createGlobalStyle`
    body {
        font-family: ${FontFamily.SOURCESANS_REGULAR};
        color: #58474c;
    }

    .text-uppercase {
        text-transform: uppercase;
    }
    .sub-heading {
        color: #6CB33F;
        margin-top: 15px;
    }
    .ant-popover {
        width: 250px;
        border: 1px solid rgba(0,0,0,0.3);
    }
    .app-btn {
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
            border-color: transparent !important;
        }
    }
    .margin0 {
        margin: 0;
    }
    

    .success-btn {
        border: none;
        box-shadow: none;
        font-family: ${FontFamily.SOURCESANS_BOLD};
        color: ${Colors.WHITE};
        font-size: 14px;
        border-radius: 0;
        background: ${Colors.SUCCESS};

        &:hover {
            color: ${Colors.WHITE} !important;
            border-color: none;
        }
        button{
            border: none;
        }
    }
    .cancel {
        background-color: ${Colors.PANTONE_BLACK_66};
    }
    .prospect-note {
        .ant-form-item-control-input {
            width: 100%;
        }
    }
    .ant-modal.close-vacancy {
       .ant-modal-content {
        .ant-modal-body {
            h2 {
                color:#6CB33F;
            }
            hr {
                opacity: 0.3;
                margin-bottom: 10px;
                margin-top: 5px;
            }
            p {
                margin-bottom: 5px;
            }
        }
       }
    }
    .ant-drawer {
        height: 100%;
        .ant-drawer-body {
                div {
                    margin-top: 30px !important;
                }
                li {
                    margin-bottom: 10px;
                        a {
                    color: ${Colors.BLACK};
                    font-family: ${FontFamily.PLUTOSANS_REGULAR};
                }
            }
            .ant-btn {
                background-color: #6CB33F;
                color: #fff;
            }
        }
        .ant-drawer-header-title {
        flex-direction: row-reverse;
        }
        .ant-drawer-header {
        border: none;
        }
    }
    .ant-btn.mobile-nav {
        border: none;
        color:  ${Colors.BLACK};
    }
    .signin {
        padding-left: 0 !important;
    }
    .header-divider {
        margin: 0 !important;
    }
    .ant-upload-wrapper .ant-upload-select {
        .ant-upload {
            .ant-btn {
                background-color: ${Colors.PANTONE_BLUE};
                color: ${Colors.WHITE};
            }
        }
    }
    .ant-input-number {
        width: auto;
    }

    .page-heading {
        margin-bottom: 20px;
        color: #58474c;
    }
    .menu-popover {
        border: none;
        width: 210px;
        z-index: 100;
        background-color: #fff;
        inset: 42px auto auto 170px !important;
        .ant-popover-inner {
            background-color: rgba(16, 24, 32, 0.1);
        }
        .ant-menu.ant-menu-light.ant-menu-root.ant-menu-inline {
            background-color: rgba(16, 24, 32, 0.001);
            border-inline-end:none;
        }
        .ant-menu-item {
            padding-left: 2px !important;
            height: 23px;
            color: #58474c;
        }
        .ant-menu-item-group-title {
            font-weight: bold;
            color: ${Colors.PANTONE_BLUE_STRONG};
            padding: 5px 0px;
        }
        .ant-popover-arrow {
            display: none;
        }
    }

    /* for dropdown */
    .ant-select-dropdown{
        &.currency-select{
            .ant-cascader-menu{
                min-height: 100px;
                height: auto;
            }
        }
    }

    /* pagination css */
    .ant-pagination{
        li{
           *{
            cursor: pointer !important;
           }
            &.ant-pagination-item{
                
                &.ant-pagination-item-active{
                    border-color: ${Colors.SUCCESS};
                    color: ${Colors.SUCCESS};
                    a{
                        color: ${Colors.SUCCESS};
                    }
                }
            }
            button{
               
                svg{
                    color: ${Colors.SUCCESS};
                }
            }
            &.ant-pagination-disabled{
                opacity: .5;
                *{
                    cursor: not-allowed !important;
                }
                button{
                    svg{
                        color: ${Colors.GREY};
                    }
                }
            }
        }
    } 
    .cv-content{ 
        h1,h2,h3,h4,h5,h6{
            &:hover{
        a {svg{
        display:none;
        }
        }
    }
    }
    }
    .wmde-markdown.wmde-markdown-color *{
        white-space: wrap;
    float: left;
    clear: both;
    }
    /* .wmde-markdown li + li {
    margin-top: -0.90em !important
} */
`;

export default Global;

export const Container = styled.div`
  max-width: 1430px;
  width: 100%;
  margin: 0 auto;
`;
