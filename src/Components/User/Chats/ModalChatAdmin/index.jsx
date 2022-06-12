import { useEffect, useState } from 'react'
import { Modal, Select, OutlinedInput, Box, Chip, MenuItem, InputLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import { toast } from 'react-toastify';
import { LetterAvatar } from '../../../LetterAvatar';
import { ModalConfirmation } from "../ModalConfirmation";

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles, Members } from './style'

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
    const { socket, chats, getChats, setChats, updateChat, deleteUserChat, currentChat, setCurrentChat, conversation, setConversation, options, setOptions } = useChat();
    const { user } = useAuth();
    const [chatMembers, setChatMembers] = useState([]);
    const [chatName, setChatName] = useState('');
    const [chatDescription, setChatDescription] = useState('');
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    
    async function handleUpdateChat(e){
        e.preventDefault();
        
        const updatedChat = await updateChat({
            chatId: currentChat._id,
            name:  chatName.length === 0 ? currentChat.name : chatName,
            description:  chatDescription.length === 0 ? currentChat.description : chatDescription,
            users: chatMembers
        })

        // informs if the chat has been updated
        if(updatedChat.code === 2) {
            toast.error(updatedChat.msg)
        } else {
            toast.error(updatedChat.err)
        }

        // send a message to add to the group
        chatMembers.map(member => {
            const message = {
                chatId: currentChat._id,
                value: `${member.name} foi adicionado ao grupo`,
                senderId: user.id_user,
                sender: user.nome, 
                status: 'updateUser'
            }
            // Filting who will receive the message
            const receivers = currentChat.users.filter(
                (member) => member.idUser !== (user.id_user).toString()
            );
            // Sending message
            socket.current.emit('sendMessage', message, receivers, data=>{
                if (conversation.length === 0){
                    setConversation([data.message])
                }else{
                    setConversation([...conversation, data.message])
                }
            })

            // updating chat users
            currentChat.users.push({
                idUser: member.idUser, name: member.name
            })
        })
        const updatedCurrentChat = {
            ...currentChat, 
            name: chatName.length === 0 ? currentChat.name : chatName,
            description: chatDescription.length === 0 ? currentChat.description : chatDescription
        }
        getChats(user.id_user, user.church.roomId)
        setCurrentChat(updatedCurrentChat)

        // Filting who will receive 
        const receivers = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString()
        );
        socket.current.emit('updateChat', 
            {
                roomId: user.church.roomId,
                chat: updatedCurrentChat
            }, 
            receivers
        )

        setChatMembers([])
        setChatName('')
        setChatDescription('')
        setModalChatAdminIsOpen(false)
    }

    async function handleDeleteUser(idUser, username){
        // delete user in mongoDb
        await deleteUserChat(currentChat._id, idUser) 

        // Updating chat
        const newCurrentChat = {...currentChat, users: currentChat.users.filter(userChat =>userChat.idUser !== idUser) }
        setCurrentChat(newCurrentChat)
        
        // Preparing message 
        const message = {
            chatId: currentChat._id,
            value: `${username} foi expulso do grupo`,
            senderId: user.id_user,
            sender: user.nome, 
            status: 'deleteUser'
        }

        // Filting who will receive the message
        const receivers = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString()
        );
        // Sending message for everyone in the group
        socket.current.emit('sendMessage', message, receivers, data => {
            if (conversation.length === 0){
                setConversation([data.message])
            }else{
                setConversation([...conversation, data.message])
            }
        })

        // informing user that he has been deleted from the group
        const deletedUser = [{idUser, 'name': username}]
        // Filting who will receive the message
        const informationUserDeleted = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString() && member.idUser !== (idUser).toString()
        );
        
        const newChats = chats.filter(chat => chat._id !== currentChat._id)
        socket.current.emit('kickedOut', 
            {
                roomId: user.church.roomId, 
                username, chatId: currentChat._id, 
                chat: newCurrentChat
            }, 
            deletedUser, 
            informationUserDeleted
        )
        setChats([...newChats, newCurrentChat])
        setOptions([...options, {idUser, name:username}])
        setModalConfirmationIsOpen(false)
    }
    function handleDeleteMember(removedUser){
        setCurrentUser(removedUser)
        setModalConfirmationIsOpen(true)
    }

    const usersChat = currentChat.users?.map(userChat => {
        console.log(userChat)
        console.log(currentChat.adminUser.idUser)
        if (userChat.idUser != currentChat.adminUser.idUser){          
            return(
                {
                    name: userChat.name,
                    idUser: userChat.idUser,
                    status: 'Membro'
                }
            )
        } else{
            return(
                {
                    name: userChat.name,
                    idUser: userChat.idUser,
                    status: 'Administrador'
                }
            )
        }
    })
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
                                        {userInChat.status == 'Administrador' ? (
                                            userInChat.status
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