import styled from "styled-components";

export const ContainerMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem; 

    background-color: var(--background-light);
    border-radius: 0.25rem;
    padding: 0.4rem 1rem;

    width: fit-content;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 4rem;

        p {
            margin-bottom: 0 !important;
        }
    }

    span {
        color: var(--primary-color-light);
        font-weight: bold;
    }
`;

export const MessageOtherUser = styled(ContainerMessage)`
    align-self: flex-start;
    background-color: var(--background-dark);
    text-align: left;
`

export const ErrorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    background-color: var(--background-light);
    border-radius: 0.25rem;
    padding: 1.5rem;
`