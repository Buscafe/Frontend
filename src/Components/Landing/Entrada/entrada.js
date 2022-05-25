import styled from 'styled-components'

export const Header = styled.header`
    background: #2D2C2C;
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
    div{
        color: #fff
    }
    p{
        color: #F3B72B
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