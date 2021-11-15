import { useState } from 'react';

import { Input } from 'semantic-ui-react';
import { Logo } from '../Components/Logo/Logo';

import '../styles/newDevice.css';

export function NewDevice(){
    const [cod, setCod] = useState('');

    async function handleLogin(event){
        event.preventDefault();

    }

    return(
        <div className="deviceMain"> 
            <main className="newDevice">
                <h1>Novo Dispositivo</h1>
                <p>A tentativa de login foi realizada por um novo dispositivo, um email foi enviado para o seu email com o código de verificação</p>
                <form id="form-auth" onSubmit={handleLogin}>
                    <div className="row data-form">
                        <div>
                            <label id="codDevice">Código</label>
                            <Input 
                                type="text" icon='lock' iconPosition='left' placeholder='********' required
                                onChange={event => setCod(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" id="cadastrar">Login</button>                
                </form>
            </main>
        </div>
    );
}