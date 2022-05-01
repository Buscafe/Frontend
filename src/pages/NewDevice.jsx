import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { send } from 'emailjs-com';
import { useAuth } from '../hooks/useAuth';
import { randomCode } from '../helper/RandomCode';

import { DefaultPage } from '../Components/DefaultPage/DefaultPage.jsx';
import { Logo } from '../Components/Logo/Logo';
import { Helmet } from 'react-helmet'

import { Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import { FormStyles } from '../styles/DefaultPage.js';


export function NewDevice(){
    const { UpdateUser } = useAuth();
    const { state } = useLocation();
    const history = useHistory();

    const [inputCode, setInputCode] = useState('');
    const [code, setCode] = useState(() => randomCode(6));
    
    useEffect(() => {
        const contactParams = {
            to_email: state.email,
            code: code,
        }

        send('buscafeEmail', 'template_qtfu2n9', contactParams, 'user_hJrWhDpi05vjpn21TjgOC')
        .then((result) => {
            toast.success('Email enviado com sucesso')
        }, (error) => {
            toast.error('Houve um erro ao enviar o email')
        });
    }, [state])

    async function handleVerification(event){
        event.preventDefault();
        
        if(code === inputCode){
            try {
                const { code } = await UpdateUser({
                    email : state.email,
                    pass  : '',
                    ip    : state.ip
                });
    
                if(code === 1){
                    if(state.route === 'Password'){
                        history.push('/NewPassword')
                    } else{
                        history.push('/Login')
                    }
                } else {
                    toast.error('Houve um erro ao atualizar o IP')
                }
            } catch (error) {
                toast.error('Erro ao conectar com servidor')
            }
        } else {
            toast.error('Código incorreto')
        }
    }

    return(
        <DefaultPage
            title="Novo Dispositivo"
            description="A tentativa de login foi realizada por um novo dispositivo, um email foi enviado para o seu email com o código de verificação"
        >
            <Helmet>
                <title>Novo dispositivo | Buscafé</title>
            </Helmet>
            <FormStyles onSubmit={handleVerification}>
                <div className="row data-form">
                    <div>
                        <label id="codDevice">Código</label>
                        <Input 
                            type="text" icon='lock' iconPosition='left' placeholder='********' required
                            onChange={event => setInputCode(event.target.value)}
                            value={inputCode}
                        />
                    </div>
                </div>
               
                <button type="submit" id="cadastrar">Login</button>           
            </FormStyles>
        </DefaultPage>
    );
}