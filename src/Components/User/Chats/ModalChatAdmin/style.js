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
    height: 95%;

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
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

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
        button[type=submit] {
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