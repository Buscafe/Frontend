import React from "react";
import { useAuth } from '../../../../hooks/useAuth';
import Mapa from '../../../../Assets/mapa.gif'

import { Container } from './style.js';

export function Welcome({ church }) {
    const { user } = useAuth();

    return church ? (
      <Container>
        <img src={Mapa} alt="" /> 
        <h1>
          Bem vindo a <span>{church.text}</span>
        </h1>
        <h3>Por favor selecione um Chat para iniciar uma conversa.</h3>
      </Container>
    ) : (
      <Container>
        <img src={Mapa} alt="" /> 
        <h1>
          Bem vindo ao Social, <span>{user.nome}!</span>
        </h1>
        <h3>Por favor selecione uma igreja para ter acesso aos chats.</h3>
      </Container>
    );
  }