import styled from "styled-components";

export const ModalStyles = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    width: 40%;
    height: 73%;

    background-color: var(--background-dark);
    color: #fff;

    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    padding: 1.5rem;

    h1 {
        font-size: 2rem;
        font-weight: bold;
        background-color: var(--primary-color);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .personSelection{ width: 100% }

        #infos {
            display: flex;
            flex-direction: column;

            label {
                font-size: 1rem;
                margin-bottom: 0.5rem; 
                color: #fff;
            }
            input {
                background-color: #29292e;
                border: none;
                border-radius: 0.25rem;
                height: 2.5rem;
                padding: 0 1rem;
                color: #fff;

                &:focus{
                    outline: none;
                }
            }
        }
        button {
           border: 2px solid var(--primary-color);
           border-radius: 0.25rem;
           background-color: transparent;
           color: var(--primary-color);
           padding: 1rem;

           transition: 0.3s;

           &:hover{
                background-color: var(--primary-color);
                color: #fff;
            }
        }
    }
`