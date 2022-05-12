import styled from "styled-components";

export const ChatsStyles = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 5%;
    margin-top: 2%;
    width: 100%;
    
    background-color: #4F4F4F;
    border: 0;
    border-radius: 0.5rem;

    /* img {
        width: 40px;
    } */

    h3 {
        align-items: center;
        color: #FFF;
        margin: 0;
    }
    
    span{
        display: flex;
        align-items: center;
        justify-content: center;

        height: 9%;
        width: 9%;
        padding: 0.5rem;
        
        color: #FFF;
        background-color: var(--red);
        border-radius: 100%;
    }
`
// Arrumar ---------------------------------------------
export const ChatsStylesAdmin = styled.div`
    #deleteChat {
        display: flex;
        justify-content: center;
        align-items: center;

        background: var(--primary-color);
        border: none;
        border-radius: 0.5rem;
        color: #fff;

        font-size: 1.2rem;
        font-weight: 500;

        width: 100%;
        height: 3rem;
        margin-bottom: 1.5rem;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.95);
        }
    }
`