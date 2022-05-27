import { useState } from 'react'

import { Modal } from "@mui/material";
import { LetterAvatar } from '../../../LetterAvatar';

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles, Members } from './style'

import { ModalConfirmation } from "../ModalConfirmation";

export function ModalChat({ modalChatIsOpen, setModalChatIsOpen }){
    const { socket, getChats, currentChat, setCurrentChat, deleteUserChat, conversation, setConversation } = useChat();
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
    const { user } = useAuth();
    async function handleDeleteUser(){
        const deletedUser = await deleteUserChat(currentChat._id, user.id_user) 

        setModalChatIsOpen(false)
        getChats(user.id_user, currentChat.roomId)
        setCurrentChat('')
        
        const message = {
            chatId: currentChat._id,
            value: `${user.nome} saiu do grupo`,
            senderId: user.id_user,
            sender: user.nome, 
            status: 'deleteUser'
        }

        const id = (user.id_user).toString()        
        const dataChat = {...currentChat, users: currentChat.users.filter(userChat =>userChat.idUser !== id), chatId: currentChat._id}

        socket.current.emit('deleteUser', dataChat)
        socket.current.emit('sendMessage', message, data=>{
            if (conversation.length === 0){
                setConversation([data.message])
            }else{
                setConversation([...conversation, data.message])
            }
        })
        setModalConfirmationIsOpen(false)
    }

    const usersChat = currentChat.users?.map(user => {
        if (user.idUser != currentChat.adminUser.idUser){          
            return(
                {
                    name: user.name,
                    idUser: user.idUser,
                    status: 'Membro'
                }
            )
        } else{
            return(
                {
                    name: user.name,
                    idUser: user.idUser,
                    status: 'Administrador'
                }
            )
        }
    })

    return (
        <Modal
            open={modalChatIsOpen}
            onClose={() => setModalChatIsOpen(false)}
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
                
                <label>Membros</label>
                <Members> 
                    {usersChat?.map(userInChat => {
                        return (
                            <div id='member'>
                                <LetterAvatar name={userInChat.name}/>
                                <p>{userInChat.name}</p>
                                {userInChat.status}
                            </div>
                        )
                    })} 
                </Members>

                <button id='leaveChat' onClick={() => setModalConfirmationIsOpen(true)}>Sair do grupo</button>
                <ModalConfirmation 
                    modalConfirmationIsOpen={modalConfirmationIsOpen} 
                    setModalConfirmationIsOpen={setModalConfirmationIsOpen}
                    onSuccess={handleDeleteUser}
                    title='Tem certeza que quer sair do grupo?'
                />
            </ModalStyles>
        </Modal>
    )
}