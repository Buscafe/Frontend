import styled from 'styled-components';

export const StyledReport = styled.div`


p{
 color: var(--primary-color) ;
 font-size: 32px;
 margin: auto;
}

.input {
    margin-left: 5% auto;

    width: 28.5%;
    padding: auto;

    border: 3px solid var(--primary-color);
    //background-color: var(--primary-color);
    border-radius: 5px;

    color: black;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.3s;

&:hover{
    filter: opacity(0.9);
    transition: 0.3s;
}
}

.margin{
    margin-left: 2.8%;
    margin-top: 2%;
}

.campo1{
    padding: auto ;
}

.textArea {
width: 89.5%;
padding: 10px 0;
margin-bottom: 1.5%;

border: 3px solid var(--primary-color);
//background-color: var(--primary-color);
border-radius: 5px;

color: black;
font-weight: bold;
text-transform: uppercase;
transition: 0.3s;

&:hover{
    filter: opacity(0.9);
    transition: 0.3s;
}
}

.sendReport{
    padding: 2px 15px 2px 15px;
    margin: 1% 1% 3% 1%;
    border:2.2px solid var(--primary-color);
    background-color: var(--primary-color);
    border-radius: 5px;
    font-weight: bold;
}
`