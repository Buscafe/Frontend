import styled from 'styled-components'

export const Container = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    transition: 0.5s;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
    h1 {
        background-color: var(--background);
        text-align: center;
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 0.25rem;

        span {
            color: var(--primary-color);
        }
    }
`