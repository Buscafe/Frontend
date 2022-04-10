import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

import { Logo } from '../Components/Logo/Logo';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { ChangePage } from '../Components/ChangePage/index'
import { Helmet } from 'react-helmet'

import publicIp from "public-ip";

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Container, FormStyles, Aside } from '../styles/cadastro.js';


export function Cadastro(){
    const [isUser, setIsUser] = useState(1);
    const [name, setName]   = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass]   = useState('');
    const [cPass, setCPass] = useState(''); //cPass = confirm Pass
    const [religion, setReligion] = useState(''); 
    const [isLoading, setIsLoading]   = useState(false);

    const history = useHistory();

    const options = [
        { key: 1, text: 'Católico'  , value: 'Católico'},
        { key: 2, text: 'Evangélico', value: 'Evangélico'},
        { key: 3, text: 'Budista'   , value: 'Budista'},
        { key: 4, text: 'Judeu'     , value: 'Judeu'},
        { key: 5, text: 'Espírita'  , value: 'Espírita'},
    ]

    async function handleRegistration(event){
        event.preventDefault();
        
        if(pass === cPass){
            try {
                const ip = await publicIp.v4();

                const { data } = await api.post('/user/insert', {
                    name      : name,  
                    email     : email,
                    pass      : pass,
                    religion  : religion,
                    ip        : ip,
                    user_type : isUser
                });
    
                if(data.code === 1){
                    history.push('/Login');
                } else if (data.code === 6){
                    toast.error('Email utilizado em outra conta');
                    setIsLoading(false);
                } else {
                    toast.error('Houve algum problema no cadastro');
                    setIsLoading(false);
                }
            } catch(error){
                toast.error('Erro ao acessar o servidor');
                setIsLoading(false);
            }
        } else {
            toast.error('As senhas não são iguais');
            setIsLoading(false)
        }
    }

    return(
        <Container className="row"> 
              <Helmet>
                <title>Cadastro | Buscafé</title>
              </Helmet>

              <main className="cadastro col">
                <h1>Faça seu cadastro</h1>
                <h3>Escolha o tipo da conta</h3>
                <FormStyles id="form-auth" className="container-form" onSubmit={handleRegistration}>
                    <div className="row user-type">
                        <button
                            type="button"
                            id="btn1"
                            className="col"
                            onClick={() => setIsUser(2)}
                            style={{
                                borderColor: `${isUser === 2 ? 'var(--primary-color)' : 'var(--light-grey)'}`,
                                color: `${isUser === 2 ? 'var(--primary-color)' : 'var(--light-grey)'}`
                            }}
                        >
                            <svg width="76" height="76" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 60V48C24 46.4087 24.6321 44.8826 25.7574 43.7574C26.8826 42.6321 28.4087 42 30 42C31.5913 42 33.1174 42.6321 34.2426 43.7574C35.3679 44.8826 36 46.4087 36 48V60H48V30C47.9999 29.4823 47.8659 28.9735 47.6109 28.523C47.3559 28.0725 46.9887 27.6956 46.545 27.429L33 19.302V12H39V6H33V0H27V6H21V12H27V19.302L13.455 27.429C13.0113 27.6956 12.6441 28.0725 12.3891 28.523C12.1341 28.9735 12.0001 29.4823 12 30V60H24ZM3 60H9V35.646L1.659 39.318C1.16032 39.5664 0.740845 39.9491 0.44776 40.4229C0.154676 40.8967 -0.000391802 41.4429 7.43434e-07 42V57C7.43434e-07 57.7956 0.316071 58.5587 0.87868 59.1213C1.44129 59.6839 2.20435 60 3 60ZM58.341 39.315L51 35.646V60H57C57.7956 60 58.5587 59.6839 59.1213 59.1213C59.6839 58.5587 60 57.7956 60 57V42C60 40.863 59.358 39.825 58.341 39.315Z" fill={isUser === 2 ? 'var(--primary-color)' : 'var(--light-grey)'}/>
                            </svg>

                            Corporativa
                        </button>
                        <button
                            type="button"
                            id="btn2"
                            className="col"
                            onClick={() => setIsUser(1)}
                            style={{
                                borderColor: `${isUser === 1 ? 'var(--primary-color)' : 'var(--light-grey)'}`,
                                color: `${isUser === 1 ? 'var(--primary-color)' : 'var(--light-grey)'}`
                            }}
                        >
                            <svg width="76" height="76" viewBox="0 0 75 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.75 20.5834C23.75 28.4399 30.1435 34.8334 38 34.8334C45.8565 34.8334 52.25 28.4399 52.25 20.5834C52.25 12.7269 45.8565 6.33337 38 6.33337C30.1435 6.33337 23.75 12.7269 23.75 20.5834ZM63.3333 66.5H66.5V63.3334C66.5 51.1132 56.5535 41.1667 44.3333 41.1667H31.6667C19.4433 41.1667 9.5 51.1132 9.5 63.3334V66.5H63.3333Z" fill={isUser === 1 ? 'var(--primary-color)' : 'var(--light-grey)'}/>
                            </svg> 

                            Pessoal
                        </button>
                    </div>                    

                    <div className="row data-form">
                        <div className="col p-0">
                            <label>Nome Completo</label>
                            <Input 
                                type="text" placeholder='Seu nome aqui' 
                                icon='user' iconPosition='left' required 
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="col p-0"> 
                            <label>Email</label>
                            <Input 
                                type="email" placeholder='email@exemplo.com' 
                                icon='at' iconPosition='left' required
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row data-form">
                        <div className="col p-0">
                            <label>Senha</label>
                            <Input 
                                type="password" placeholder='********'  
                                icon='lock' iconPosition='left' required
                                onChange={event => setPass(event.target.value)}
                            />
                        </div>
                        <div className="col p-0">
                            <label>Confirmar Senha</label>
                            <Input 
                                type="password" placeholder='********'
                                icon='lock' iconPosition='left' required
                                onChange={event => setCPass(event.target.value)}    
                            />
                        </div>
                    </div>

                    <div className="row pt-4">
                        <Dropdown
                            options={options} selection placeholder='Religião'
                            onChange={(event, {value}) => setReligion(value)}    
                        />
                    </div>
                    
                    
                    <div className="row">
                        <Button 
                            type="submit"
                            id="cadastrar"
                            onClick={() => setIsLoading(true)}
                            className={isLoading && 'loading'}
                            disabled={(email === '') || (pass === '') ? true : false}
                        >
                            Cadastrar
                        </Button>
                    </div>
                </FormStyles>
            </main>

            <Aside className="col">
                <Logo width="45%" fundo="#fff" cruz="#ffbf00" id="logo" onClick={() => history.push('/')}/>
                <ChangePage
                    label="Já tenho Cadastro"
                    onClick={() => history.push('/Login')}
                />
            </Aside>
        </Container>
    )
}


