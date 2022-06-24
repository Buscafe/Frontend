import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logo } from '../Components/Logo/Logo'
import { ChangePage } from '../Components/ChangePage';
import { Helmet } from 'react-helmet'
import { Input, Button, Icon } from 'semantic-ui-react'

import { useAuth } from '../hooks/useAuth';

import publicIp from "public-ip";

import googleIconImg from '../Assets/images/google-icon.svg'
import facebookIcon from '../Assets/images/facebook.svg'

import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { Container, FormStyles, SocialLogin, Separator, Aside } from '../styles/cadastro';

export function Login(){
    const { LoginUser } = useAuth();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [pass, setPass]   = useState('');
    const [viewPassword, setViewPassword]   = useState(false);
    const [isLoading, setIsLoading]   = useState(false);
    
    async function handleLogin(event){
        event.preventDefault();
        setIsLoading(true)
        
        try {
            const ip = await publicIp.v4();
            const { data, user_data } = await LoginUser({
                email : email,
                pass  : pass,
                ip    : ip
            });

            if(data.code === 1){
                history.push('/User/Home');
            } else if(data.code === 2){
                if(user_data.isPayed){
                    history.push('/Admin/Home')
                } else {
                    history.push('/Plans');
                }
            } else if(data.code === 9){
                history.push({
                    pathname: '/NewDevice',
                    state: { email, ip }
                });
            } else {
                toast.error('Usuário ou Senha Inválidos');
                setIsLoading(false);
            }     
        } catch (error) {
            toast.error('Erro ao acessar o servidor');
            setIsLoading(false);
        }
    }

    return(
        <Container> 
            <Helmet>
                <title>Login | Buscafé</title>
            </Helmet>

            <main className="cadastro">
                <h1>Fazer Login</h1>
                <h3>Para ter acesso a plataforma, faça login</h3>
                <FormStyles onSubmit={handleLogin}>
                    <div className="data-form">
                        <div>
                            <label>Email</label>
                            <Input 
                                type="email" icon='at' iconPosition='left' placeholder='email@exemplo.com' required
                                onChange={event => setEmail(event.target.value)} 
                            />

                            <div className="passwordHeader">
                                <label>Senha</label>
                                <Link to="/SendEmail" id="link">Esqueceu a senha ?</Link>
                            </div>
                            <div className='passwordContent'>
                                <Input 
                                    type={viewPassword ? 'text' : 'password'}
                                    icon='lock' iconPosition='left'
                                    placeholder='********'   required
                                    onChange={event => setPass(event.target.value)} 
                                />
                                <Button 
                                    onClick={() => setViewPassword(!viewPassword)}
                                    type='button' icon
                                    className='passEyeButton'
                                >
                                    <Icon name={viewPassword ? 'eye slash' : 'eye'}/>
                                </Button>
                            </div>
                            
                        </div>
                    </div>

                    <Button 
                        type="submit" id="cadastrar" 
                        className={isLoading && 'loading'}
                        disabled={(email === '') || (pass === '') ? true : false}
                        animated='vertical'
                    >
                        <Button.Content visible>Login</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>

                    <Separator>Em breve</Separator>

                    <SocialLogin>
                        <button className="room google" disabled>
                            <img src={googleIconImg} alt="Logo do Google" />
                            Entre com Google
                        </button>
                        <button className="room facebook" disabled>
                            <img src={facebookIcon} alt="Logo do Facebook" />
                            Entre com Facebook
                        </button>
                    </SocialLogin>
                    
                </FormStyles>
            </main>

            <Aside>
                <Logo width="50%" fundo="#fff" cruz="#ffbf00" id="logo" onClick={() => history.push('/')}/>
                <ChangePage
                    onClick={() => history.push('/Cadastro')}
                    label="Não tenho Cadastro"
                />
            </Aside>
        </Container>
    )
}


