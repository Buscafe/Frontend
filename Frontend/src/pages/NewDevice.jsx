import { useState } from 'react';

import { Input } from 'semantic-ui-react';
import { DefaultPage } from '../Components/DefaultPage/DefaultPage';
import { Logo } from '../Components/Logo/Logo';


export function NewDevice(){
    const [cod, setCod] = useState('');

    async function handleVerification(event){
        event.preventDefault();
    }

    return(
        <DefaultPage
            title="Novo Dispositivo"
            description="A tentativa de login foi realizada por um novo dispositivo, um email foi enviado para o seu email com o código de verificação"
        >
            <form onSubmit={handleVerification}>
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
        </DefaultPage>
    );
}