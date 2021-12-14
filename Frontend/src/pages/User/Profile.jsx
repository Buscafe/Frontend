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
                        data={[user.localizacao.estado, user.localizacao.cidade]}
                        id="endereco"
                    />
                    <DataBox
                        title="Igrejas"
                        label={['Principal Igreja', 'Religião']}
                        data={['Nome igreja', user.religiao]}
                        id="igrejas"
                    />
                    <DataBox
                        title="Histórico de Login"
                        label={['Último ip utilizado']}
                        data={[user.ip]}
                        id="histLogin"
                    />
                </div>
            </main>
        </>
    );
}