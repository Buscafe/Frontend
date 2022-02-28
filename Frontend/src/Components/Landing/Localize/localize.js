import styled from 'styled-components';

export const LocalizeStyles = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; 
    margin-top: 36px;

    div {
        #LogoWithImage{
            /* width: 100%;
            height: 100%; */
            margin-left: -8%;
            display: block;
        }
    }

    .content{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        
        .title-content{
            background-color: #F5B726;
            color: #Fff;

            text-transform: capitalize;
            font-size: 45px;
            text-align: left;
            padding: 5px 40px;

            border-radius: 10px 0 0 50px;
        }
        .paragraph1-content{
            margin-bottom: 5%;

            width: 85%;
            text-align: center;

            font-weight: 500;
            font-size: 20px;
            text-transform: uppercase;
            color: #F5B726;
        }
        .paragraph2-content{
            color: #222;
            margin: 3%;
            width: 78%;
            line-height: 28px;
            text-align: justify;
        }
        .btn-localize{
            border: 2.2px solid var(--primary-color);
            background-color: transparent;
            border-radius: 10px;
            color: var(--primary-color);
            font-weight: bold;
            padding: 1.2% 2.6%;
            text-transform: uppercase;
            font-size: 1.2rem;
            display: block;
            margin: 2% auto;
            transition: 0.7s;

            &:hover {
            background-color: rgb(245, 245, 245);
            transition: 0.7s;
            }

            img {
                padding: 0 20%;
            }
        }
        
        .buttons{
            display: flex;
            justify-content: space-between;
            gap: 20px;
        }
    }

    @media(max-width: 650px){
        .paragraph1-content{
            width: 100%;
        }
    }       
`