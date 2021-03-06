import styled from "styled-components";

const handleStyleMessage = status => {
  switch (status) {
    case "deleteMensagem":
      return {
        backgroundColor: '#E52E40',
      }
    case "updateUser":
      return {
        backgroundColor: '#33cc95',
        alignSelf: 'center'
      }
    case "deleteUser":
      return {
        backgroundColor: '#ff58',
        alignSelf: 'center'
      }
    default:
      return {
        backgroundColor: "#4F4F4F"
      }
  }
};
  

export const ContainerMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: initial;
    gap: 0.5rem; 

    ${({ status }) => handleStyleMessage(status)};
    border-radius: 0.25rem;
    padding: 0.4rem 1rem;

    div {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      flex-wrap: wrap;
      align-items: center;
      gap: 4rem;
      width: fit-content;
      max-width: 500px;
      white-space: normal;      

      @media(max-width: 100px){
        background-color: red;
      }

      p { margin-bottom: 0 !important; word-break: break-word; text-align: left}
      time { margin: 0; font-size: 0.8rem; }
    }

    #sender {
      color: var(--primary-color-light);
      font-weight: bold;
    }
`;


export const MessageOtherUser = styled(ContainerMessage)`
    align-self: flex-start;
    text-align: left;

    ${({ status }) =>  status && handleStyleMessage(status)};
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