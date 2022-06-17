import styled from 'styled-components'

export const FormModal = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 1.3rem;

    width: 40%;
    height: fit-content;

    background-color: var(--background-dark);
    color: #fff;

    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    padding: 1.5rem;

    h1 {
        font-size: 2rem;
        font-weight: bold;
        background-color: var(--admin-color);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    img {
        max-width: 250px;
    }
    #buttonFile {
        background-color: transparent;
        border: 2px solid var(--admin-color);
        border-radius: 0.5rem;
        color: #fff;
        padding: 0.8rem;

        transition: 0.3s;

        &:hover {
            background-color: var(--admin-color);
        }
    }
`