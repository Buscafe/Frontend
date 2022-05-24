import styled from "styled-components";

export const ModalStyles = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 40%;
    height: fit-content;

    background-color: var(--background-dark);
    color: #fff;

    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    padding: 1.5rem;

    header {
        background-color: var(--primary-color);
        padding: 1rem;
        border-radius: 0.5rem;

        h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
        }

        div {
            display: flex;
            justify-content: space-between;

            background-color: var(--primary-color-dark);
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;

            h3 {
                font-size: 1.1rem;
                margin: 0;
            }
        }
        p{
            padding: 5px;
            text-align: center;
            word-break: break-word;
            max-width: 500px
        }
    }
    #leaveChat {
        display: flex;
        justify-content: center;
        align-items: center;

        background: var(--primary-color);
        border: none;
        border-radius: 0.5rem;
        color: #fff;

        font-size: 1.2rem;
        font-weight: 500;

        width: 100%;
        height: 3rem;
        
        margin-top: 1rem;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.95);
        }
    }
`

export const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    overflow-y: scroll;
    max-height: 150px;

    #member {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;  
        
        border: 2px solid #29292e;
        background-color: transparent;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;

        margin-right: 0.5rem;

        p{
            margin: 0;
        }
    }
`