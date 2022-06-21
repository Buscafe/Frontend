import { useState } from 'react';
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Badge, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"

import { useAuth } from '../../hooks/useAuth.js';
import { api } from '../../services/api';

import { ChangePage } from '../../Components/ChangePage/index.jsx';
import { DataBox } from '../../Components/User/DataBox/DataBox.jsx';
import { ModalConfirmation } from '../../Components/User/Chats/ModalConfirmation';
import { ProgressiveImg } from '../../Components/ProgressiveImg/index.jsx';
import { ModalProfilePhoto } from '../../Components/Admin/ModalProfilePhoto/index.jsx';

import { ProfileStyles, IpBox, ProfilePhoto } from '../../styles/Profile.js'

export function UserProfile(){
    const { user, signed, setUser } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);
    const [currentIp, setCurrentIp] = useState(false);
    const history = useHistory();

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
                    <a href="#profilePhoto">Foto de Perfil</a>
                    <a href="#meuAcesso">Meu Acesso</a>
                    <a href="#endereco">Endereço</a>
                    <a href="#histLogin">Histórico de Login</a>
                    
                    <ChangePage
                        onClick={() => history.goBack()}
                        label="Voltar"
                    />
                </div>

                <div>
                    <ProfilePhoto className='profile-box' id='profilePhoto'>
                        <h2>Foto de Perfil</h2>

                        <div id='profileButton'>
                            <button onClick={() => setModalProfileIsOpen(true)}>
                                <Badge color="primary" overlap="circular" badgeContent='Mudar Foto'>
                                    <ProgressiveImg
                                        src={user.image_url && user.image_url}
                                        alt="User profile photo"
                                        loadingWidth={240}
                                        loadingHeight={240}
                                    />
                                </Badge>
                            </button>
                        </div>
                    </ProfilePhoto>
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
                <ModalProfilePhoto
                    isOpen={modalProfileIsOpen}
                    setIsOpen={setModalProfileIsOpen}
                    userId={user.id_user}
                />
            </ProfileStyles>
        </>
    );
}