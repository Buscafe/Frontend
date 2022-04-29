import React, { useState, useEffect } from "react";
import { useAuth } from '../../../../hooks/useAuth';
import Robot from '../../../../Assets/robot.gif';
import { Container } from './style.js';

export function Welcome() {
    const { user } = useAuth();
    return (
      <Container>
        <img src={Robot} alt="" /> 
        <h1>
          Bem vindo ao Chats, <span>{user.nome}!</span>
        </h1>
        <h3>Por favor selecione um chat para iniciar uma conversa.</h3>
      </Container>
    );
  }