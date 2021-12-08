import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logo } from '../Components/Logo/Logo'
import { Input } from 'semantic-ui-react'

import { useAuth } from '../hooks/useAuth';

import publicIp from "public-ip";

import {ReactComponent as Leave} from '../Assets/images/leave.svg'
import googleIconImg from '../Assets/images/google-icon.svg'
import facebookIcon from '../Assets/images/facebook.svg'

import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/cadastro.css';

export function Login(){
    const { LoginUser } = useAuth();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [pass, setPass]   = useState('');
    
    async function handleLogin(event){
        event.preventDefault();
        
        try {
            const ip = await publicIp.v4();
            console.log(ip)
            const { code } = await LoginUser({
                email : email,
                pass  : pass,
                ip    : ip
            });
            
            if(code === 1){
                history.push('/Home/User');
            } else if(code === 2){
                history.push('/Home/Admin');
            } else if(code === 9){
                history.push({
                    pathname: '/NewDevice',
                    state: { email, ip }
                });
            } else {
                toast.error('Usuário ou Senha Inválidos')
            }     
        } catch (error) {
            toast.error('Erro ao acessar o servidor')
        }
    }

    return(
        <div className="row"> 
            <main className="cadastro col">
                <h1>Fazer Login</h1>
                <h3>Para ter acesso a plataforma, faça login</h3>
                <form id="form-auth" onSubmit={handleLogin}>
                    <div className="row data-form">
                        <div>
                            <label>Email</label>
                            <Input 
                                type="email" icon='at' iconPosition='left' placeholder='email@exemplo.com' required
                                onChange={event => setEmail(event.target.value)}
                            />

                            <div className="password">
                                <label>Senha</label>
                                <Link to="/NewPassword" id="link">Esqueceu a senha ?</Link>
                            </div>
                            <Input 
                                type="password" icon='lock' iconPosition='left' placeholder='********' required
                                onChange={event => setPass(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" id="cadastrar">Login</button>

                    <div className="separator">ou</div>

                    <div className="row data-form">
                        <div className="col p-0">
                            <button className="room google">
                                <img src={googleIconImg} alt="Logo do Google" />
                                Entre com Google
                            </button>
                        </div>
                        <div className="col p-0">
                            <button className="room facebook">
                                <img src={facebookIcon} alt="Logo do Facebook" />
                                Entre com Facebook
                            </button>
                        </div>
                    </div>
                    
                </form>
            </main>

            <aside className="col">
                <Logo width="45%" fundo="#fff" cruz="#ffbf00"/>
                <button id="leaveBtn" onClick={() => history.push('/Cadastro')}>
                    <Leave/>
                    Não tenho Cadastro
                </button>
            </aside>
        </div>
    )
}


