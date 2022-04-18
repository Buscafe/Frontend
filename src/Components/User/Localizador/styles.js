import styled from "styled-components";

export const GoogleMapsStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };

    transition: 0.5s;

    .churchMaps{
        color: var(--grey) !important;
        font-size: 1rem !important;
        font-weight: bold;

        border-radius: 0.25rem;
        margin-bottom: 4.5rem;
    }
`