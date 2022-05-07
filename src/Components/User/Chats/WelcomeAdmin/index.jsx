import React from "react";
import Mapa from '../../../../Assets/mapa.gif'

import { Container } from '../Welcome/style.js';

export function WelcomeAdmin({ church }) {
  return (
    <Container>
      <img src={Mapa} alt="" /> 
      <h1>
        Bem vindo <span>{church.name}</span>
      </h1>
      <h3>Por favor selecione um Chat para gerenciar uma conversa.</h3>
    </Container>
  )
}