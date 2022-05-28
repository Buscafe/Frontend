import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import publicIp from "public-ip";
import { api } from '../services/api';

import { DefaultPage } from '../Components/DefaultPage/DefaultPage.jsx'
import { ChangePage } from '../Components/ChangePage/index.jsx';
import { Helmet } from 'react-helmet'

import { toast } from 'react-toastify';
import { Button, Input } from 'semantic-ui-react';

import { FormStyles } from '../styles/DefaultPage.js'

export function NewPassword(){
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [pass, setPass]   = useState('');
    const [cPass, setCPass] = useState(''); //cPass = confirm Pass
    const [isLoading, setIsLoading] = useState(false); 

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
                    setIsLoading(false)
                } else if(data.code === 2) {
                    toast.info('Senha já está sendo utilizada');
                    setIsLoading(false)
                } else if(data.code === 7){
                    history.push({
                        pathname: '/NewDevice',
                        state: { email, ip, route: 'Password' }
                    });
                } else {
                    toast.error('Usuário Inexistente');
                    setIsLoading(false)
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
            <Helmet>
                <title>Recuperação de senha | Buscafé</title>
            </Helmet>
            <DefaultPage
                title="Alterar Senha"
                description="Para alterar a sua senha, precisamos saber o email da conta desejada"
            >
                <FormStyles onSubmit={handleVerification}>
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

                    <Button 
                        type="submit" id="cadastrar" 
                        onClick={() => setIsLoading(true)}
                        className={isLoading && 'loading'}
                        disabled={(email === '') || (pass === '') || (cPass === '') ? true : false}
                    >
                        Alterar
                    </Button>               
                </FormStyles>
            </DefaultPage>

            <ChangePage 
                label="Fazer Login"
                onClick={() => history.push('/Login')}
            />
        </>
    );
}