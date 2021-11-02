import React from 'react'
import { useState } from 'react';
import { Logo } from '../Components/Logo/Logo'
import { Input } from 'semantic-ui-react'

import googleIconImg from '../Assets/images/google-icon.svg'
import facebookIcon from '../Assets/images/facebook.svg'

import 'semantic-ui-css/semantic.min.css'
import '../styles/cadastro.css';

export function Login(){
    const [ isUser, setIsUser] = useState(true);

    return(
        <div className="row"> 
              <main className="cadastro col">
                <h1>Fazer login</h1>
                <h3>Para ter acesso a plataforma, faça login</h3>
                <form id="form-auth">
                    <div className="row data-form">
                        <div>
                            <label>Nome</label>
                            <Input type="text" icon='user' iconPosition='left' placeholder='Seu nome aqui' />

                            <label>Email</label>
                            <Input type="email" icon='at' iconPosition='left' placeholder='email@exemplo.com' />
                        </div>
                    </div>

                    <button type="submit" id="cadastrar">Cadastrar</button>

                    <div className="row data-form">
                        <div className="col p-0">
                            <button className="room google">
                                <img src={googleIconImg} alt="Logo do Google" />
                                Entre com o Google
                            </button>
                        </div>
                        <div className="col p-0">
                            <button className="room facebook">
                                <img src={facebookIcon} alt="Logo do Facebook" />
                                Entre com o Facebook
                            </button>
                        </div>
                    </div>
                    
                </form>
            </main>

            <aside className="col">
                <Logo width="45%" fundo="#fff" cruz="#ffbf00"/>
            </aside>
        </div>
    )
}


