import styled from "styled-components";

export const DashboardStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };

    overflow: hidden;
    transition: 0.5s;
    h1{
        margin-top: 100px;
        align-items: center;
    }
`