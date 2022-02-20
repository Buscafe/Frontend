import styled from 'styled-components';

export const DadosStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100vh;

    .rowInfos{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100vw;
        
        background-color: var(--primary-color);
        padding: 2rem 2rem;

        .rowInfosBox{
            display: flex;
            align-items: center;

            h4 {
                color: var(--white);
                font-size: 1.5rem;
                font-weight: bold;
                margin: 0;
                margin-right: 1rem;
            }

            div{
                background-color: var(--white);
                color: var(--primary-color);
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
            }
        }
    }
`

export const CardBoxContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    height: 70%;

    .cardBoxHome{
        display: flex;
        flex-direction: column;
        gap: 1rem;

        background-color: var(--primary-color);
        border-radius: 50px 10px 50px 10px;
        padding: 1rem;

        width: 25%;
        height: 350px;

        div {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;

            color: var(--white);
        }

        img {
            width: 25%;
        }

        p{
            display: flex;
            align-items: center;
            
            background-color: var(--primary-color-dark);
            color: #AD8118;
            border-radius: 50px 10px 50px 10px;
            text-align: justify;
            font-size: 1.2rem;

            width: 100%;
            height: 100%;
            padding: 2rem 1.3rem;
        }
    }
`