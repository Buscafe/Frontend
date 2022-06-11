import styled from 'styled-components'

export const PricingContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        padding: 3rem 0 6rem 0;
        background-color: var(--primary-color);
        color: #fff;

        h1 span{
            color: var(--primary-color);
            background-color: #fff;
            padding: 0.3rem;
            border-radius: 0.25rem;
            font-size: 2.5rem;
        }
    }

    .comparitionTable{
        td{
            padding: 10px;
            border: 1px solid black;
            width: 400px;
        }

        margin-top: 5%;
        margin-bottom: 5%;
    }
    
    table .communityRow{
        background-color: #90EE90;
        font-weight: bolder;
        text-align: center;
    }

    table .comercialRow{
        background-color: #ADD8E6;
        font-weight: bolder;
        text-align: center;
    }

    .actions{
        font-size: 16px;
        font-weight: bolder;
    }

    .titleTable{
        font-size: 20px;
        text-align: center;
    }

    .checkButton{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* ============================================================= */

    .infoField{
        background-color: var(--primary-color);
        width: 100%;
        padding: 3% 7% 3% 7%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .info{
        display: flex;
        flex-wrap: wrap; 
        width: 50%;
        font-weight: bolder; 
        font-size: 20px;
        color: var(--white);

        div{
            width: 40%;
            margin-top: 3%;

            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            flex-wrap: wrap;
        }

        .userIcon{
            margin-top: 5%;
            margin-right: 3%;
        }
    }
    
    .stats{
        width: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        color: var(--white);
        

        div{
            margin: 5% 3% 5% 3%;

            h1{
                font-weight: bolder; 
            }
        }
    }

    .planInfo{
            display: flex;
            /* justify-content: center; */
            align-items: center;
        div{
            width: 25%;
            border: 2px solid black;
        } 
    }

`

export const CardContainer = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    gap: 2rem;

    margin-top: -2rem;
    width: 70%;

    .card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        border-radius: 0.5rem;

        width: 100%;
        height: 250px;
        padding: 1rem 1.5rem;

        h1 {
            color: var(--blue);
        }
        p {
            color: #3E5060;
            height: 30%;
            width: 80%;
        }

        #price {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;

            span {
                color: var(--blue);
                font-size: 1.5rem;
            }
        }

        button {
            width: 100%;

            background-color: var(--blue);
            border-radius: 0.5rem;
            border: none;
            color: #fff;
            font-weight: bold;

            padding: 1rem 1.25rem;
            transition: 0.3s;

            &:hover {
                background-color: var(--blue-dark);
            }
        }
    }

    .Comunidade {
        h1 {
            color: var(--green);
        }

        #price span{
            color: var(--green);
        }

        button {
            background-color: var(--green);

            &:hover {
                background-color: #2cb885;
            }
        }
    }

`