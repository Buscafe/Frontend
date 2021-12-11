import { useAuth } from '../../hooks/useAuth.js';
import { useHistory } from 'react-router-dom';

import { ChangePage } from '../../Components/ChangePage/index.jsx';
import { DataBox } from '../../Components/User/DataBox/DataBox.jsx';

import '../../styles/Profile.css'

export function Profile(){
    const { user, signed } = useAuth();
    const history = useHistory();

    if(!signed){
        history.push('/Login');
    }

    return(
        <>
            
            <main className='profile-main'>
                <div className='profile-box profile-menu'>
                    <a href="#meuAcesso">Meu Acesso</a>
                    <a href="#endereco">Endereço</a>
                    <a href="#igrejas">Igrejas</a>
                    <a href="#histLogin">Histórico de Login</a>
                    
                    <ChangePage
                        onClick={() => history.push('/User/Home')}
                        label="Voltar"
                    />
                </div>

                <div>
                    <DataBox
                        title="Meu Acesso"
                        label={['Nome Completo', 'E-mail de cadastro']}
                        data={[user.nome, user.email]}
                        id="meuAcesso"
                    />
                    <DataBox
                        title="Endereço"
                        label={['Estado', 'Cidade']}
                        data={['Estado Teste', 'Cidade Teste']}
                        id="endereco"
                    />
                    <DataBox
                        title="Igrejas"
                        label={['Principal Igreja', 'Teste']}
                        data={['Nome igreja', 'Teste']}
                        id="igrejas"
                    />
                    <DataBox
                        title="Histórico de Login"
                        label={['Ips']}
                        data={['31.204.150.76', '36.72.212.123', '36.72.215.148']}
                        id="histLogin"
                    />
                </div>
            </main>
        </>
    );
}