import styled from 'styled-components';

export const Container = styled.div`
    .cadastro{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        color: var(--primary-color);
        height: 100vh;
        width: 45vw;

        h1 {
            font-size: 60px;
            font-weight: bold;
        }

        h3 {
            font-size: 16px;
            font-weight: medium;
            margin-top: 0;
        }
    }

    #cadastrar{
        margin: 5% auto;

        width: 100%;
        padding: 10px 0;

        border: 1px solid var(--primary-color);
        background-color: var(--primary-color);
        border-radius: 5px;
        
        color: var(--white);
        font-weight: bold;
        text-transform: uppercase;
        transition: 0.3s;

        &:hover{
            filter: opacity(0.9);
            transition: 0.3s;
        }
    }
`

export const Aside = styled.aside`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
    width: 55vw;

    background: linear-gradient(45deg ,var(--primary-color-light), var(--primary-color));  
    
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const FormStyles = styled.form`
    .data-form{
        gap: 40px;

        div{
            display: flex;
            flex-direction: column;
            margin-top: 15px;
        }

        input{
            border: 1px solid var(--light-grey);
            border-radius: 5px;

            padding: 10px 20px;
            color: var(--primary-color);
        }
    }

    .user-type {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        margin-top: 25px;

        svg {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
        }

        button{
            background-color: transparent;
            color: var(--light-grey);
        
            display: flex;
            align-items: center;
            flex-direction: column;
        
            border: 1.2px solid var(--light-grey);
            border-radius: 5px !important;
        
            padding: 10px 0;
            cursor: pointer;
            transition: 0.3s;

            &:hover{
                border-color: var(--primary-color);
                transition: 0.3s;
            }
            &:active{
                background-color: var(--primary-color);
            }
        }
    }

    .password{
        flex-direction: row !important;
        justify-content: space-between;
    }

    #link{
        color: var(--primary-color-light);
        font-size: 1.1rem;
        text-decoration: underline;
    }

    #btn1{border-radius: 5px 0 0 5px;}
    #btn2{border-radius: 0 5px 5px 0;} 
`

export const Separator = styled.div`
    font-size: 14px;
    color: var(--medium-grey);

    display: flex;
    align-items: center;

    &::before{
        content: '';
        flex: 1;
        height: 1px;
        background-color: var(--medium-grey);
        margin-right: 16px;
    }
    
    &::after{
        content: '';
        flex: 1;
        height: 1px;
        background-color: var(--medium-grey);
        margin-left: 16px;
    }
`

export const SocialLogin = styled.div`
    .room{
        width: 110%;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        color: var(--white);
        
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        border: 0;
        padding: 10px;

        transition: filter 0.2s;

        img {
            margin-right: 8px;
        }

        &:hover{
            filter: brightness(0.9);
        }
    }
    .google{
        background-color: #ea4335;
    }
    .facebook{
        background-color: #1877F1;
    }
`