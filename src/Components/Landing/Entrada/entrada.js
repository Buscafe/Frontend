import styled from 'styled-components'

export const Header = styled.header`
    background: linear-gradient(to bottom, rgba(46, 49, 55, 0.8), rgba(46, 49, 55, 0.6),rgba(46, 49, 55, 0.4),rgba(46, 49, 55, 0.2),rgba(46, 49, 55, 0));
    padding: 15px 0px;  
    width: 100%;
    position: absolute;

    .main-header{
        z-index: 999;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .headerMenu {
        display: inline-block;
        margin-top: 22px;
        text-align: right;
    }
    .headerMenu ul li {
        display: inline-block; /*Deixa os textos alinhados na direta , horizontal*/
    }
    .headerMenu i {
        border: 2.2px solid transparent;
        background-color: var(--primary-color);
        border-radius: 7px;
        color: var(--white);
        padding: 4px 15px;
        margin: 0 10px 0 0;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.7s;
    }
    .headerMenu i:hover{
        border: 2.2px solid var(--primary-color);
        background-color: var(--primary-color);
        padding: 4px 30px;
        transition: 0.8s;
    }
`

export const Introduction = styled.div`
    background: linear-gradient(to bottom,var(--primary-color) , var(--primary-color-light));
    height: auto;
    padding: 10% 0 3% 0;

    @media(max-width: 650px){
        padding: 40% 0 3% 0;

        #logo{
            margin-top: 50px; 
        }
        .intro-text{
            width: 100%;
        }
    }

    #logo{
        display: flex;
        justify-content: space-around;
        background-color: rgb(red, green, blue);
    }
`