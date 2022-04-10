import { useAuth } from '../../hooks/useAuth.js';
import { useHistory } from 'react-router-dom';

import { ChangePage } from '../../Components/ChangePage/index.jsx';
import { DataBox } from '../../Components/User/DataBox/DataBox.jsx';
import { Helmet } from 'react-helmet'

import { ProfileStyles, IpBox } from '../../styles/Profile.js'

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
                    <IpBox id='histLogin'>
                        <h2>Histórico de Login</h2>

                        <table>
                            <thead>
                                <th>Quando</th>
                                <th>IP</th>
                                <th>Prioridade</th>
                            </thead>
                            <tbody>
                                { user?.devices.map(device => {
                                    return (
                                        <tr>
                                            <td>{new Date(device.dtCreate).toLocaleDateString('Pt-BR')}</td>
                                            <td>{device.ip}</td>
                                            <td id={device.status === 1 && 'main'}>{device.status === 1 ? 'Principal' : 'Secundário'}</td>
                                        </tr>       
                                    )
                                })} 
                            </tbody>
                        </table>
                    </IpBox>
                </div>
            </ProfileStyles>
        </>
    );
}