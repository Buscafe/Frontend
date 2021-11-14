import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Logo } from '../Components/Logo/Logo'
import { Input } from 'semantic-ui-react'

import { api } from '../services/api'

import googleIconImg from '../Assets/images/google-icon.svg'
import facebookIcon from '../Assets/images/facebook.svg'

import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/cadastro.css';

export function Login(){
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    
    async function handleLoginUser(event){
        event.preventDefault();

        try {
            const response = await api.post('/login/logar', {
                email : email,
                pass  : pass,
            })

            if(response.data.code === 1){
                history.push({
                    pathname: '/Home/User',
                    data: response
                })
            } else if(response.data.code === 2){
                history.push('/Home/Admin')
            } else if(response.data.code === 8){
                toast.error(`Dispositivo Diferente`);
            } else {
                toast.error(`Email ou senha inválidos`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="row"> 
            <main className="cadastro col">
                <h1>Fazer login</h1>
                <h3>Para ter acesso a plataforma, faça login</h3>
                <form id="form-auth" onSubmit={handleLoginUser}>
                    <div className="row data-form">
                        <div>
                            <label>Email</label>
                            <Input 
                                type="email" icon='at' iconPosition='left' placeholder='email@exemplo.com' required
                                onChange={event => setEmail(event.target.value)}
                            />

                            <label>Senha</label>
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
            </aside>

            <ToastContainer
                position="top-center"
                theme="colored"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}


