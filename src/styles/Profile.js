import styled from 'styled-components'

export const ProfileStyles = styled.main`
    display: flex;
    justify-content: center;

    gap: 4rem;
    width: 100vw;
    height: auto;

    background-color: #121214;
    color: #fff;

    .profile-box{
        width: fit-content;
        min-width: 576px;
        height: fit-content;
        padding: 20px;
        margin: 5rem 0;
        border-radius: 0.25rem;

        background-color: #202024;

        h2{
            font-weight: 600;
            font-size: 2.3rem;
        }

        h4{
            color: #585862;
            font-weight: 400;
            font-size: 1rem;
        }

        input{
            background-color: #29292e;
            padding: 1rem;
            border-radius: 0.25rem;
            border: none;
            color: #fff;
            width: 100%;
            opacity: 1 !important;
        }

        div {
            display: flex;
            justify-content: space-between;
            flex-direction: row;

            button {
                padding: 0.5rem 1rem;
                margin-bottom: 1rem;
                border: none;
                border-radius: 0.25rem;
                background-color: var(--primary-color);
                color: #fff;
                font-weight: bold;
            }
        }
    }

    .profile-menu{
        display: flex;
        flex-direction: column;

        top: 100px;
        width: 352px;
        position: sticky;
        overflow: hidden;
        padding: 0;

        & a + a{
            margin-top: 1rem;  
        }

        a{
            padding: 1rem;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            color: #fff;

            transition: 0.2s;

            &:hover{
                background-color: #3a3a3f;
                border-left: 2px solid var(--primary-color);

                transition: 0.2s;
            }
        }
    }
`