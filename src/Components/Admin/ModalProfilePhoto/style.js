import styled from 'styled-components'

export const ModalStyles = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 1.3rem;

    width: 55%;
    height: fit-content;

    background-color: var(--background-dark);
    color: #fff;

    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

    padding: 1.5rem;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: var(--admin-color);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;

        h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 0;
        }
        button {
            background: transparent;
            border: none
        }
    }
`

export const FormModal = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;

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

export const PageOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.3rem;

    button {
        width: 100%;
        height: 200px;
        background-color: var(--background);
        border-radius: 0.5rem;
        border: none;
        color: #fff;
    }
`

//Last Photos component
export const AllPhotos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;

        overflow-y: auto;
        height: 240px;
        
        .images {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            
            border: 1px solid transparent;
            border-radius: 0.25rem;
            background: var(--background);
            padding: 1rem;

            transition: border 0.3s;

            &:hover {
                border: 1px solid var(--admin-color);
            }

            img {
                object-fit: cover;  
                width: 100%;
                border-radius: 0.25rem;
            }
        }
        .clicked-image {
            border: 1px solid var(--admin-color);
        }
    }

    #buttonFile {
        background-color: var(--admin-color);
        border-radius: 0.25rem;
        border: none;
        padding: 1rem;
        width: 100%;

        transition: filter 0.3s;

        &:hover {
            filter: brightness(0.8);
        }
    }
`