import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import publicIp from "public-ip";
import { api } from '../services/api';

import { DefaultPage } from '../Components/DefaultPage/DefaultPage.jsx'
import { ChangePage } from '../Components/ChangePage/index.jsx';
import { Helmet } from 'react-helmet'

import { Button, Input } from 'semantic-ui-react';

import { FormStyles } from '../styles/DefaultPage.js'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export function NewPassword(){
    const history = useHistory();
    const {email, code} = useParams();
    const [pass, setPass]   = useState('');
    const [cPass, setCPass] = useState(''); //cPass = confirm Pass
    const [isLoading, setIsLoading] = useState(false);  
    
    const [storageCode, setStorageCode] = useState(localStorage.getItem('code'))
    const [storageEmail, setStorageEmail] = useState(localStorage.getItem('email'))

    useEffect(() => {
      if(email != storageEmail ){
          toast.error('❌ O email de verificação foi alterado. Por favor insira o email da conta correta! ')
          history.push('/SendEmail')
      }

      else if(code != storageCode){
        toast.error('As credenciais não são iguais! Por favor insira o email novamente e reenviaremos o link... 🕒 ')
        history.push('/SendEmail')
      }
    }
    , [])

    async function handleVerification(event){
        event.preventDefault();
        setIsLoading(true)
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

                    history.push('/Login')
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
                setIsLoading(false)
            }
        } else {
            toast.error('As senhas não são iguais');
            setIsLoading(false)
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
                        className={isLoading && 'loading'}
                        disabled={code != storageCode && pass == '' || cPass == ''}
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