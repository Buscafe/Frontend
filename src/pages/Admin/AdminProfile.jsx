import { useState } from 'react';
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

import { ChangePage } from '../../Components/ChangePage/index.jsx';
import { DataBox } from '../../Components/User/DataBox/DataBox.jsx';
import { ModalConfirmation } from '../../Components/User/Chats/ModalConfirmation';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"

import { ProfileStyles, IpBox } from '../../styles/Profile.js'

export function AdminProfile(){
    const { user, signed, setUser } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentIp, setCurrentIp] = useState(false);
    const history = useHistory();
    const chat = JSON.parse(localStorage.getItem('Chats'));
    
    if(!signed){
        history.push('/Login');
    }

    async function handleRemoveIp(device){
        if(device.status === 1){
            toast.error('Não é possível remover o dispositivo principal');
            return;
        }

        try {
            const { data } = await api.delete(`/user/delete/device/${device.id_device}`)

            if(data.err){
                throw new Error(data.err)
            }
    
            setUser({...user, devices: user?.devices.filter(userDevice => userDevice.id_device !== device.id_device)})
            toast.success('Dispositivo removido');
            setModalIsOpen(false)
        } catch (err) {
            console.error(err)   
        }
    }

    function openModal(currentDevice){
        setCurrentIp(currentDevice)
        setModalIsOpen(true)
    }

    return(
        <>  
            <Helmet>
                <title>Informações da conta | Buscafé</title>
            </Helmet>
            <ProfileStyles className='profile-main'>
                <div className='profile-box profile-menu'>
                    <a href="#meuAcesso">Meu Acesso</a>
                    <a href="#church">Sua Igreja</a>
                    <a href="#endereco">Endereço</a>
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
                        title="Sua Igreja"
                        subTitle={`${chat?.length} grupo(s)`}
                        label={['Nome']}
                        data={[user?.church?.name]}
                        id="church"
                    />
                    <DataBox
                        title="Endereço"
                        label={['Estado', 'Cidade']}
                        data={[user?.localizacao.estado, user?.localizacao.cidade]}
                        id="endereco"
                    />
                    <IpBox id='histLogin'>
                        <h2>Histórico de Login</h2>
                        <p>{user?.devices.length} dispositivo(s)</p>

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
                                            <td>
                                                <IconButton onClick={()=> openModal(device)} aria-label="delete" size="small" color="error">
                                                    <DeleteIcon color="error"/>
                                                </IconButton>
                                            </td>
                                        </tr>       
                                    )
                                })} 
                            </tbody>
                        </table>
                    </IpBox>
                </div>

                <ModalConfirmation
                    modalConfirmationIsOpen={modalIsOpen}
                    setModalConfirmationIsOpen={setModalIsOpen}
                    onSuccess={() => handleRemoveIp(currentIp)}
                    title='Tem certeza que deseja remover o dispositivo ?'
                />
            </ProfileStyles>
        </>
    );
}