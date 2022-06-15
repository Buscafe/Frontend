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
`

export const ComparitionTable = styled.table`
    td{
        padding: 10px;
        border: 1px solid #B9B9B920;
        width: 400px;
    }

    margin-top: 5%;
    margin-bottom: 5%;

    .communityRow{
        background-color: #33CC9540;
        font-weight: bolder;
        text-align: center;
        color: #17855E;
        border-radius: 0.5rem 0 0 0;
    }
    .comercialRow{
        background-color: #33A7CC40;
        font-weight: bolder;
        text-align: center;
        color: #2993B5;
        border-radius: 0 0.5rem 0 0;
    }
    

    .actions{
        font-size: 16px;
        font-weight: bolder;
        color: #434343;
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
`

export const InfoField = styled.section`
    background-color: var(--primary-color);
    width: 100%;
    padding: 3% 7% 3% 7%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

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
            margin: 5% 3%;

            h1{
                font-weight: bolder; 
            }
            p {
                color: #BD9620;
            }
        }
    }
`

export const PlanInfo = styled.section`
    margin-top: 5%;

    h1 {
        color: #434343;
        width: 30%;
        margin-bottom: 3%;

        span {
            color: var(--blue)
        }
    }

    .container{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
        gap: 3rem 4rem;
    }
`
export const Info = styled.div`
    border: 1px solid #B9B9B9;
    padding: 1.5rem;
    width: 100%;
    border-radius: 0.5rem;

    span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 1rem;
       

        h3 { color: #434343; margin: 0; }
        p {  margin: 0; }
    }

    p {
        color: #B9B9B9;
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

export const ModalStyles = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    flex-direction: column;


    width: 50%;
    height: 35%;

    color: black;
    background: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.5rem;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    padding: 1.5rem 3rem;

    p{
        text-align: center;
        color: #3E5060;
        font-size: 1rem;
    }

    h3 {
        text-align: center;
        color: var(--primary-color);
        font-size: 1.7rem;
    }

    form {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 100%;

        span {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            gap: 3rem;

            button{
                border-radius: 0.25rem;
                background-color: transparent;
                padding: 1rem;
                width: 100%;

                transition: 0.3s;
            }
            #next{
                border: 2px solid var(--green);
                color: var(--green);
                background-color: transparent;

                &:hover{
                    background-color: var(--green);
                    color: #fff;
                }
            }
            #cancel{
                border: 2px solid var(--red);
                color: var(--red);

                &:hover{
                    background-color: var(--red);
                    color: #fff;
                }
            }
        }
    }
`