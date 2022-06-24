import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  height: 100%;
  padding: 0 2rem;

  color: white;

  img {
    height: 20rem;
  }
  
  h1 {
    text-align: center;

    span {
      color: #FFBE00;
    }
  }
`;