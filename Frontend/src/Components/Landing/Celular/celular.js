import styled from 'styled-components';

export const MobileStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 36px;

  .col .content{
    padding: 0 0 0 0;
    display: flex;
    align-items: left;
  }

  .title-content{
    background-color: #F5B726;
    color: #Fff;

    text-transform: capitalize;
    font-size: 45px;
    text-align: left;
    padding: 10px 50px;
    border-radius: 00px 0px 50px 10px;
  }

  .paragraph2-content{
    color: #222;

    margin: 35px auto;
    width: 85%;

    line-height: 28px;
    font-weight: 400;

    text-align: justify;
  }

  .btn-playstore{
    border: 2.2px solid var(--primary-color);
    background-color: transparent;
    border-radius: 10px;
    color: var(--primary-color);
    font-weight: bold;
    padding: 1.2% 6.6%;
    text-transform: uppercase;
    font-size: 1.2rem;
    display: inline-block;
    margin-left: 7.5%;
    margin-right: 0%;
    transition: 0.7s;

    img {
      /* padding: 0 10px; */
    }

    &:hover{
      background-color: rgb(245, 245, 245);
      transition: 0.7s;
    }
  }

  .btn-appstore{
    border: 2.2px solid var(--primary-color);
    background-color: transparent;
    border-radius: 10px;
    color: var(--primary-color);
    font-weight: bold;
    padding: 1.2% 5.6%;
    text-transform: uppercase;
    font-size: 1.2rem;
    display: inline-block;
    margin-left: 5.5%;
    margin-right: 0%;
    transition: 0.7s;

    img {
      padding: 0 10px;
    }

    &:hover {
      background-color: rgb(245, 245, 245);
      transition: 0.7s;
    }
  }

  .buttons{
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .divBuscafeMobile{
    width: 40%;
    height: 40%;
  }
  #BuscafeMobile{
    margin-top: 10%;
  }

  .underIcon .paragraph1-content{
    margin-bottom: 36px;

    width: 49%;
    text-align: center;

    font-weight: 500;
    font-size: 20px;
    text-transform: uppercase;
    color: #F5B726;
  }

  @media(max-width: 650px){
    .paragraph1-content{
        width: 100%;
    }
  }
`