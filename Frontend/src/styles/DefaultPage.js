import styled from "styled-components";

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

    #codDevice{
        font-weight: 500;
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