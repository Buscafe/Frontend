import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        /* Colors */
        --red                 : #E52E40;
        --black               : #161616;
        --white               : #f3f3f3;
        --green               : #33cc95;
        --grey                : #6A6E81;
        --light-grey          : #EDE7E7;
        --medium-grey         : #A8A8B3;
        --shadow              : rgba(0, 0, 0, 0.07);

        --background          : #2D2C2C;
        --background-light    : #4F4F4F;
        --background-dark     : #202024;
        
        --primary-color       : #F3B72B;
        --primary-color-light : #FEC63E;
        --primary-color-dark  : #E0A824;
    }

    /* Scrol */
    ::-webkit-scrollbar{
        width: 10px;
        background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb{
        background-color: #f5b726;
        box-shadow: 0px 0px 15px rgb(0, 0, 0);
        border-radius: 10px;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }

    html {
        scroll-behavior: smooth;
        
        @media (max-width: 1080px){
            font-size: 93.75%; /*15px*/
        }
        @media (max-width: 720px){
            font-size: 87.5%; /*14px*/
        }
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    button{
        cursor: pointer;
    }

    ul {
        list-style-type: none;

    }

    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }
`