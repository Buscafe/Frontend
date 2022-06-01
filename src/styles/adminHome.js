import styled from 'styled-components'

export const Content = styled.div`
    margin: 0 0 0 ${ props => `${props.marginLeft}rem` };

    transition: 0.5s;
`