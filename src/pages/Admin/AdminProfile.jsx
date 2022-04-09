import { useAuth } from '../../hooks/useAuth.js';
import { useHistory } from 'react-router-dom';

import { ChangePage } from '../../Components/ChangePage/index.jsx';
import { DataBox } from '../../Components/User/DataBox/DataBox.jsx';
import { Helmet } from 'react-helmet'

import { ProfileStyles } from '../../styles/Profile.js'

export function AdminProfile(){
    const { user, signed } = useAuth();
    const history = useHistory();

    if(!signed){
        history.push('/Login');
    }

    return(
        <>  
            <Helmet>
                <title>Informações da conta | Buscafé</title>
            </Helmet>
            <ProfileStyles className='profile-main'>
                <div className='profile-box profile-menu'>
                    <a href="#meuAcesso">Meu Acesso</a>
                    <a href="#endereco">Endereço</a>
                    <a href="#igrejas">Igrejas</a>
                    <a href="#histLogin">Histórico de Login</a>
                    
                    <ChangePage
                        onClick={() => history.push('/Admin/Home')}
                        label="Voltar"
                    />
                </div>

                <div>
                    <DataBox
                        title="Meu Acesso"
                        label={['Nome Completo', 'E-mail de cadastro']}
                        data={[user?.nome, user?.email]}
                        id="meuAcesso"
                    />
                    <DataBox
                        title="Endereço"
                        label={['Estado', 'Cidade']}
                        data={[user?.localizacao.estado, user?.localizacao.cidade]}
                        id="endereco"
                    />
                    <DataBox
                        title="Igreja"
                        label={['Igreja Cadastrada', 'Religião']}
                        data={['Nome igreja', user?.religiao]}
                        id="igrejas"
                    />
                    <DataBox
                        title="Histórico de Login"
                        label={['Último ip utilizado']}
                        data={[user?.ip]}
                        id="histLogin"
                    />
                </div>
            </ProfileStyles>
        </>
    );
}