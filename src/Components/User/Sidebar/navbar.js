import styled from 'styled-components';

export const Navbar = styled.nav`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    width: fit-content;
    height: 100%;
    position: fixed;
    z-index: 1000;
    padding: 0 1.5rem;
    top: 0;
    left: 0;

    background-color: var(--background);
    color: #fff;

    transition: 0.5s;

    .navbar-container{
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        justify-content: space-between;
        height: 90%;

        h2 {
            font-weight: 700;
            font-size: 1.7rem;
            text-transform: uppercase;
            letter-spacing: 0.3rem;
        }
    }

    .btn-sidebar{
        background-color: transparent;
        border: 0;
    }

    .navbar-box{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        padding: 0.5rem 1rem;

        color: var(--white);
        background-color: #464545;
        border-radius: 0.7rem;
        border: 0;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
            transition: 0.2s;
        }

        span {
            margin-left: 0.5rem;
            color: #fff;
            text-align: left;
        }

        h3 {
            font-weight: 500;
            font-size: 1.2rem;
            margin: 0;
        }

        p {
            font-weight: 300;
            font-size: 1rem;
        }
    }

    .menu {
        background-color: #F5B726;
        color: #fff;
        margin: 0;
        padding: 1rem;
        border-radius: 100%;
        border: 3px solid transparent;
        font-size: 2.3rem;
        box-shadow: 0px 0px 15px #ffbf0f79;

        transition: 0.4s;

        &:hover{
            color: #FFBE0F;
            background-color: #ffbf0f00;
            border: 3px solid #FFBE0F;

            transition: 0.4s;
        }
    }

    #logout{
        margin-top: 0.5rem;
        filter: brightness(0.9);
    }
    #logo-sidebar{
        flex: 0 !important;
    }
`

export const SidebarItems = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    width: 100%;
    padding: 0;
    margin: 0;
    
    a {
        background-color: transparent;
        border: 0;
        color: #fff;
        font-size: 1.3rem;

        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
    }

    li{
        margin: 1rem 0.2rem;
        border-radius: 0.7rem;
        padding: 1rem;

        cursor: pointer;
        transition: background-color 0.4s;

        &:hover{
            background-color: #F5B726;
            transition: 0.4s;
        }
    }

    i {
        margin-right: 1rem;
    }

    .item-clicked {
        margin-right: 0 !important;
        font-size: 1.9rem;
    }

    .navbar-box-clicked{
        width: fit-content;
        padding: 0.5rem;
    }
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 120%;
    margin-bottom: 1rem;

    button {
        background-color: transparent;
        border: 0;
    }
`