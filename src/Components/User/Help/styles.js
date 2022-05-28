import styled from "styled-components";

export const HelpStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    margin-top: 2.5rem;
    transition: 0.5s;

    .helpTitle{
      text-align: center;
      font-size: 50px;
    }

    .accordion{
      background-color: var(--primary-color);
      color: var(--white);
      font-weight: bold;
      margin-right: 10%;
    }

`