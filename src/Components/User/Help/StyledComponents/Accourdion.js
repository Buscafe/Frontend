import styled from "styled-components";

export const AccordionStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    margin-top: 2.5rem;
    transition: 0.5s;

    .helpTitle{
      text-align: center;
      font-size: 50px;
    }

    .accordion{
      background-color: var(--primary-color);
      color: #000000;
      font-weight: bold;
      margin-right: 10%;
      margin-left: 3%;
      border-radius: 7px;
    }
    .accordionTitle{
      font-weight: bold;
      margin-left: 3%;
    }

    .logoBuscafe{
      width: 70px;
      margin-right: 20px;
    }

    .titleArea{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p{
      font-size: 18px;
    }

    .auxDataSearch{
      margin-left: 2.8%;
      margin-bottom: 2%;
    }


`