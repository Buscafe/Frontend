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
        flex-wrap: wrap;
        gap: 20px;
        width: 100vw;
        
        background-color: var(--primary-color);
        padding: 2rem 2rem;

        .rowInfosBox{
            display: flex;
            align-items: center;
            margin-left: 2%;

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
                padding: 5px;
                border-radius: 0.25rem;
            }
        }
    }
`

export const CardBoxContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 70%;
    

    .cardBoxHome{
        display: flex;
        gap: 1rem;
        flex-wrap: wrap !important;


        background-color: var(--primary-color);
        border-radius: 50px 10px 50px 10px;
        padding: 1rem;

        width: 32%;
        height: 90%;

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