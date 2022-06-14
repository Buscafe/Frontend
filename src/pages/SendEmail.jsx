import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { send } from 'emailjs-com';
import { randomCode } from '../helper/RandomCode.js'; 
import md5 from 'md5';

import { DefaultPage } from '../Components/DefaultPage/DefaultPage.jsx'
import { ChangePage } from '../Components/ChangePage/index.jsx';
import { Helmet } from 'react-helmet'

import { toast } from 'react-toastify';
import { Button, Input } from 'semantic-ui-react';

import { FormStyles } from '../styles/DefaultPage.js'

export function SendEmail(){
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false);   
    const [code, setCode] = useState(() => randomCode(6));

    async function handleVerification(event){
        event.preventDefault();
        setIsLoading(true)
        const contactParamsSend = {
            to_email: email,
            link: `${window.location.origin}/NewPassword/${md5(email)}/${code}`,
            code,

        }
        // if(localStorage.getItem('code') ){
        //     return{
                
        //     }
        // }

        localStorage.setItem('code', code)
        send('buscafeEmail', 'template_64o257w', contactParamsSend, 'user_hJrWhDpi05vjpn21TjgOC')
        .then((result) => {
            toast.success('Email enviado com sucesso')
            setIsLoading(false)
        }, (error) => {
            toast.error('Houve um erro ao enviar o email')
            setIsLoading(false)
            console.log(error)
        });
    }

    return(
        <>
            <Helmet>
                <title>Recuperação de senha | Buscafé</title>
            </Helmet>
            <DefaultPage
                title="Alterar Senha"
                description="Para alterar a sua senha, precisamos saber o email da conta desejada !"
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
                        </div>
                    </div>

                    <Button 
                        type="submit" id="cadastrar" 
                        className={isLoading && 'loading'}
                        disabled={(email === '') ? true : false}
                    >
                        Enviar
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