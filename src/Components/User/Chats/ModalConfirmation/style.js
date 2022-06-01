import styled from "styled-components";

export const ModalStyles = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: fit-content;
    height: 35%;
    max-width: 450px;

    background-color: var(--background-dark);
    color: #fff;

    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    padding: 1.5rem;

    button{
        border-radius: 0.25rem;
        background-color: transparent;
        padding: 1rem;
        transition: 0.3s;
    }
    #next{
        border: 2px solid var(--green);
        color: var(--green);
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
`