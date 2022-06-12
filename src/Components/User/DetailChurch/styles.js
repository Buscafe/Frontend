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

    #affiliate {
        border-radius: 0.25rem;
        background-color: var(--admin-color);  
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
    .perfil{
        width: 13%;
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