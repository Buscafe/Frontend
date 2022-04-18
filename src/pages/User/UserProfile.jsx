import { useAuth } from '../../hooks/useAuth.js';
import { useHistory } from 'react-router-dom';

import { ChangePage } from '../../Components/ChangePage/index.jsx';
import { DataBox } from '../../Components/User/DataBox/DataBox.jsx';
import { Helmet } from 'react-helmet'

import { ProfileStyles, IpBox } from '../../styles/Profile.js'
import { api } from '../../services/api.js';
import { toast } from 'react-toastify';

export function UserProfile(){
    const { user, signed, setUser } = useAuth();
    const history = useHistory();

    if(!signed){
        history.push('/Login');
    }
    console.log(user)
    async function handleRemoveDevice(device){
        const { data } = await api.delete(`/user/delete/device?id=${device.id_device}`)

        if(data.err){
            toast.error('Erro no servidor');
            return;
        }

        if(data.code === 1){
            toast.success(data.msg)
        } else {
            toast.error(data.msg)
        }
        
        setUser({
            ...user, 
            devices: user?.devices.filter(deviceFilter => deviceFilter.id_device !== device.id_device)
        });
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
                        onClick={() => history.goBack()}
                        label="Voltar"
                    />
                </div>

                <div>
                    <DataBox
                        title="Meu Acesso"
                        label={['Nome Completo', 'E-mail de cadastro', 'Religião']}
                        data={[user?.nome, user?.email, user?.religiao]}
                        id="meuAcesso"
                    />
                    <DataBox
                        title="Endereço"
                        label={['Estado', 'Cidade']}
                        data={[user?.localizacao.estado, user?.localizacao.cidade]}
                        id="endereco"
                    />
                    
                    <IpBox id='histLogin'>
                        <h2>Histórico de Login</h2>

                        <table>
                            <thead>
                                <th>Quando</th>
                                <th>IP</th>
                                <th>Prioridade</th>
                                <th>Ações</th>
                            </thead>
                            <tbody>
                                { user?.devices.map(device => {
                                    return (
                                        <tr>
                                            <td>{new Date(device.dtCreate).toLocaleDateString('Pt-BR')}</td>
                                            <td>{device.ip}</td>
                                            <td id={device.status === 1 && 'main'}>{device.status === 1 ? 'Principal' : 'Secundário'}</td>
                                            <td id='trash'>
                                                <button onClick={() => handleRemoveDevice(device)}>
                                                    <i class="trash alternate outline icon red"></i>
                                                </button>
                                            </td>
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