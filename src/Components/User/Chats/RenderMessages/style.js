import styled from "styled-components";

const handleStyleMessage = color => {
    switch (color) {
      case "removeUser":
        return "#E52E40";
      case "updateUser":
        return "#33cc95";
      default:
        return "#4F4F4F";
    }
  };
  

export const ContainerMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem; 

    background-color: ${({ color }) => handleStyleMessage(color)};
    border-radius: 0.25rem;
    padding: 0.4rem 1rem;
    
    width: fit-content;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 4rem;

        p {
            margin-bottom: 0 !important;
        }
    }

    span {
        color: var(--primary-color-light);
        font-weight: bold;
    }
`;

const handleLoadAdvice = status => {
  switch(status){
    case "removeUser": 
      return {
        color: '#33cc95',
        alignItems: 'center',
      }
    case "updateUser": 
      return {
        color: '#33cc95',
        alignItems: 'center',
      }
  }
}

export const MessageOtherUser = styled(ContainerMessage)`
    align-self: flex-start;
    background-color: ${({ color }) => handleStyleMessage(color)};
    text-align: left;

    ${({ status }) =>  status && handleLoadAdvice(status)};
`

export const ErrorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    background-color: var(--background-light);
    border-radius: 0.25rem;
    padding: 1.5rem;
`