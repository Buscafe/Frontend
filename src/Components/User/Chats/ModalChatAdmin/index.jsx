import { useEffect, useState } from 'react'
import { Modal, Select, OutlinedInput, Box, Chip, MenuItem, InputLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import { toast } from 'react-toastify';
import { LetterAvatar } from '../../../LetterAvatar';
import { ModalConfirmation } from "../ModalConfirmation";

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles, Members } from './style'
import { api } from '../../../../services/api';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function ModalChatAdmin({ modalChatAdminIsOpen, setModalChatAdminIsOpen }){
    const { socket, getChats, updateChat, deleteUserChat, currentChat, setCurrentChat, conversation, setConversation, options, setOptions } = useChat();
    const { user } = useAuth();
    const [chatMembers, setChatMembers] = useState([]);
    const [chatName, setChatName] = useState('');
    const [chatDescription, setChatDescription] = useState('');
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(async () => {
        await getChats(user?.id_user, user.church.roomId);
    }, [chatName]);

    
    async function handleUpdateChat(e){
        e.preventDefault();
        
        const updatedChat = await updateChat({
            chatId: currentChat._id,
            name:  chatName.length === 0 ? currentChat.name : chatName,
            description:  chatDescription.length === 0 ? currentChat.description : chatDescription,
            users: chatMembers
        })

        if(updatedChat.code === 2) {
            toast.error(updatedChat.msg)
        } else {
            toast.error(updatedChat.err)
        }
        chatMembers.map(member => {
            const message = {
                chatId: currentChat._id,
                value: `${member.name} foi adicionado ao grupo`,
                senderId: user.id_user,
                sender: user.nome, 
                status: 'updateUser'
            }
    
            socket.current.emit('sendMessage', message, data=>{
                if (conversation.length === 0){
                    setConversation([data.message])
                }else{
                    setConversation([...conversation, data.message])
                }
            })

            currentChat.users.push({
                idUser: member.idUser, name: member.name
            })
        })
        socket.current.emit('updateChat', {})

        setChatMembers([])
        setChatName('')
        setChatDescription('')
        setModalChatAdminIsOpen(false)
    }
    
    async function handleDeleteUser(idUser, username){
        const deletedUser = await deleteUserChat(currentChat._id, idUser) 
        setCurrentChat({...currentChat, users: currentChat.users.filter(user =>user.idUser !== idUser) })
        const message = {
            chatId: currentChat._id,
            value: `${username} foi expulso do grupo`,
            senderId: user.id_user,
            sender: user.nome, 
            status: 'deleteUser'
        }

        socket.current.emit('sendMessage', message, data=>{
            if (conversation.length === 0){
                setConversation([data.message])
            }else{
                setConversation([...conversation, data.message])
            }
        })
        
        setOptions([...options, {idUser, name:username}])
        setModalConfirmationIsOpen(false)
    }

    function handleDeleteMember(removedUser){
        setCurrentUser(removedUser)
        setModalConfirmationIsOpen(true)
    }

    const usersChat = currentChat.users?.map(user => ({
        name: user.name,
        idUser: user.idUser
    }))

    return (
        <>
            <Modal
                open={modalChatAdminIsOpen}
                onClose={() => setModalChatAdminIsOpen(false)}
            >
                <ModalStyles>
                    <header>
                        <h1>{currentChat.name}</h1>

                        <div>
                            <h3>{currentChat.users?.length} participante(s)</h3>
                            <h3>
                                { new Date(currentChat.createdAt).toLocaleDateString("pt-BR", {
                                    day: '2-digit', month: 'long', year: 'numeric'
                                }) }
                            </h3>
                        </div>
                        <p>{currentChat.description}</p>
                    </header>
                    
                    <form onSubmit={handleUpdateChat}>
                        <label>Membros</label>
                        <Members> 
                            {usersChat?.map(userInChat => {
                                return (
                                    <div id='member'>
                                        <LetterAvatar name={userInChat.name}/>
                                        <p>{userInChat.name}</p>
                                        {userInChat.idUser == user.id_user ? (
                                            'Administrador'
                                        ): (
                                            <IconButton onClick={()=> handleDeleteMember(userInChat)} aria-label="delete" size="small" color="error">
                                                <DeleteIcon color="error"/>
                                            </IconButton>
                                        )}
                                    </div>
                                )
                            })} 
                        </Members>

                        <span id='infos'>
                            <label>Mudar nome</label>
                            <input
                                type="text"
                                value={chatName}
                                maxLength={25}
                                placeholder={currentChat.name}
                                onChange={e => setChatName(e.target.value)}
                            />
                        </span>
                        <span id='infos'>
                            <label>Mudar Descrição</label>
                            <input
                                type="text"
                                value={chatDescription}
                                maxLength={100}
                                placeholder={currentChat.description}
                                onChange={e => setChatDescription(e.target.value)}
                            />
                        </span>

                        <span>
                            {options.length === 0 ? (
                                <p>Não há membros para serem colocados no grupo</p>
                            ) : (
                                <>
                                    <InputLabel id="demo-multiple-chip-label" style={{color: '#fff'}}>Adicionar Membros</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        className='personSelection'
                                        multiple
                                        value={chatMembers}
                                        onChange={e => setChatMembers(e.target.value)}
                                        input={<OutlinedInput label="Chip" placeholder='Adicione membros ao grupo' color='primary'/>}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value.idUser} label={value.name} color='primary'/>
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {options.map((option) => (
                                            <MenuItem
                                                key={option.idUser}
                                                value={option}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                                )}
                        </span>

                        <button type='submit'>Atualizar Grupo</button>
                    </form>
                </ModalStyles>
            </Modal>
            <ModalConfirmation 
                modalConfirmationIsOpen={modalConfirmationIsOpen} 
                setModalConfirmationIsOpen={setModalConfirmationIsOpen}
                onSuccess={() => handleDeleteUser(currentUser.idUser, currentUser.name)}
                title={`Tem certeza que quer deletar o usuário ${currentUser.name} do grupo?`}
            />
        </>
    )
}