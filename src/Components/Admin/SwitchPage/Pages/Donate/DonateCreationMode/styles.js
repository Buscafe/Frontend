import styled from "styled-components";

export const DonateCreationModeStyles = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        #createDonate {
            border: 2px solid var(--admin-color);
            border-radius: 0.25rem;
            background-color: transparent;  
            color: var(--black);;

            padding: 1rem;
            margin-bottom: 1rem;

            transition: 0.3s;

            text-transform: uppercase;
            &:hover{
                background-color: var(--admin-color);
                color: #fff;
            }
        }
    }
`