import styled from 'styled-components';

export const LocalizeStyles = styled.div`
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; */

    .content{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        div{
            margin: 36px 0 ; 
        }
        
        .title-content{
            background-color: #F5B726;
            color: #fff;

            text-transform: capitalize;
            font-size: 45px;
            text-align: left;
            padding: 5px 40px;
            border-radius: 10px 0 0 50px;
        }
        .paragraph1-content{
            margin-bottom: 5%;
            padding-left: 40px;

            width: 85%;

            font-weight: 500;
            font-size: 20px;
            text-transform: uppercase;
            color: #F5B726;
        }
        .paragraph2-content{
            color: #222;
            font-size: 18px;
            margin: 50px 0 20px 40px;
            width: 78%;
            line-height: 28px;
            text-align: justify;
        }
        .btn-localize{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            width: 60%;

            margin: 5% 5%;
            padding: 1.2% 0;

            background-color: transparent;
            border: 2.2px solid var(--primary-color);
            border-radius: 10px;
            
            color: var(--primary-color);
            font-weight: bold;
            text-transform: uppercase;
            font-size: 1.2rem;
            
            transition: 0.7s;

            &:hover {
                border: 3px solid var(--write);
                animation: btn1 .2s forwards;
                padding: 9px 50px;
                color:  var(--primary-color);
                transition: 0.7s;
            }

            img {
                padding: 0 5%;
            }
        }
        
        .buttons{
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 10px;
            margin-right: 10%;
        }
    }

    #LogoWithImage{
        width: 100%;
    }

    @media(max-width: 650px){
        .paragraph1-content{
            width: 100%;
        }
    }       
`