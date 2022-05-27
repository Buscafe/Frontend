import styled from 'styled-components';

export const FooterStyles = styled.div`

  .underMobile{
    display: flex;
    justify-content: center; 

  }
  #logo-buscafe{
    width: 10%;
    height: 10%;
    margin-top: 80px;
  } 

  #buttonTop{
    margin-top: 36px;

    width: 49%;
    text-align: center;

    font-weight: 500;
    font-size: 20px;
    color: #F5B726;
  }

  .FooterTxt{
    display: flex;
    justify-content: center;
    margin-top: 2px;
    margin-bottom: 10px;
  }

  #buttonTop{
    font-weight: bold;
  }

  .buttonLocation{
    display: flex;
    justify-content: center;
  }

  .btnLocaliza{
    background-color: #F5B726;
    color: #Fff;

    text-transform: capitalize;
    font-size: 45px;
    text-align: center;
    padding: 10px 50px;

    border-radius: 50px 10px 50px 10px;
    border-color: white;
  }
    

  .footerFinal{
    
    margin-top: 6rem;
    display: flex;
    justify-content: center;
    /* align-items: top; */

    background-color: var(--primary-color-dark);
    color: #BC8D1E;

    h1 {
      font-size: 5rem;
    }
    
    div{
      margin-left: 2%;
      margin-right: 2%;
    }

    h3{
      color: white;
      text-align: center;
    }

    p{
      color: white;
      text-align: center;
    }
    
    li{
      text-align: center;
    }
  }

  .footerStyled{
    margin-top: 2%;
    margin-bottom: 2%;
    
    a{
      font-weight: bold; 
    }
  }


`

export const Final = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2.5rem;
  margin-top: 4rem;
  width: 100%;
  color: #FFF;
  background-color:#2D2C2C;
  
  div {
    h3 {
      display: inline-block;
      position: relative;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      color: #FFF;
      width: 60%;

      padding: 1rem;
      border-radius: 0.25rem;
      background-color: var(--primary-color-dark);

      /* effect-underline */
      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        left: 0;
        height: 1em;
        width: 90%;
        border-bottom: 5px solid;
        margin-top: 1rem;
        color: var(--primary-color-light);
      }
    }

    p {
      text-align: justify;
      font-size: 1rem;
      width: 85%;

      padding: 1rem 1.5rem;
      border-radius: 0.25rem;
      height: 65%;
      margin-bottom: 2rem;
      background-color: var(--primary-color-dark);;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1rem;

      padding-top: 1rem;
      border-radius: 0.25rem;
      height: 65%;
      margin-bottom: 2rem;
      background-color: var(--primary-color-dark);;

      li {
        list-style-type: none;
        
        a{
          color: #FFF;
          text-decoration: underline;
        }
      }
    }
  }
`

export const Reference = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2D2C2C;
  width: 100%;
  padding: 1rem 0;
  
  a {
    color: #FFF;
  }
`