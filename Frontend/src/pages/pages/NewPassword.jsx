import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import publicIp from "public-ip";
import { api } from '../services/api';

import { DefaultPage } from '../Components/DefaultPage/DefaultPage'
import { ChangePage } from '../Components/ChangePage';

import { ToastContainer, toast } from 'react-toastify';
import { Input } from 'semantic-ui-react';


export function NewPassword(){
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [pass, setPass]   = useState('');
    const [cPass, setCPass] = useState(''); //cPass = confirm Pass

    async function handleVerification(event){
        event.preventDefault();

        if(pass === cPass){
            try {
                const ip = await publicIp.v4();
    
                const { data } = await api.post('/user/update', {
                    email     : email,
                    pass      : pass,
                    ip        : ip,
                });

                if(data.code === 1){
                    toast.success('Senha alterada com sucesso');
                } else if(data.code === 2) {
                    toast.info('Senha já está sendo utilizada');
                } else if(data.code === 7){
                    history.push({
                        pathname: '/NewDevice',
                        state: { email, ip, route: 'Password' }
                    });
                } else {
                    toast.error('Usuário Inexistente');
                }
            } catch (error) {
                toast.error('Erro ao acessar o servidor');
            }
        } else {
            toast.error('As senhas não são iguais');
        }
    }

    return(
        <>
            <DefaultPage
                title="Alterar Senha"
                description="Para alterar a sua senha, precisamos saber o email da conta desejada"
            >
                <form onSubmit={handleVerification}>
                    <div className="row data-form">
                        <div>
                            <label id="codDevice">Email</label>
                            <Input 
                                type="email" placeholder='email@exemplo.com' 
                                icon='at' iconPosition='left' required
                                onChange={event => setEmail(event.target.value)}
                            />
                            <div id="passwords">
                                <div>
                                    <label id="codDevice">Nova Senha</label>
                                    <Input
                                        type="password" placeholder='********'
                                        icon='lock' iconPosition='left' required
                                        onChange={event => setPass(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <label id="codDevice">Repetir a Senha</label>
                                    <Input
                                        type="password" placeholder='********'
                                        icon='lock' iconPosition='left' required
                                        onChange={event => setCPass(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" id="cadastrar">Alterar</button>                
                </form>
            </DefaultPage>

            <ChangePage 
                label="Fazer Login"
                onClick={() => history.push('/Login')}
            />
        </>
    );
}