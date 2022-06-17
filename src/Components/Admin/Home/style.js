import styled from 'styled-components'

export const Header = styled.header`
    width: 100%;
    height: fit-content;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.3rem;

    background: var(--admin-color, #ffc700);
    background: linear-gradient(to bottom, var(--admin-color, #ffc700) 0,#fff 100%);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;

    padding: 2rem;

    #profileButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;

        button {
            background: transparent;
            border: none;
            transition: 0.3s;

            svg {
                width: 15rem;
            }
            
            img {
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                box-shadow: 5px 5px 20px 0px var(--background-light);

                transition: 0.3s;

                &:hover{
                    filter: brightness(0.9)
                }
            }

            &:hover{
                filter: brightness(0.7);
            }
        }
    }

    h1, p {
        background-color: rgba(0,0,0,.35);
        border-radius: 1.5rem;
        color: #fff;
        padding: 0.5rem 1rem;
        text-align: center;
        width: fit-content;
        margin: 0;
    }
    h1 {
        font-weight: bold;
    }
    #tabsContainer{
        position: static;
        width: 100%;
    }
`

export const Content = styled.section`
    width: 90%;
    margin: 0 auto;
`