import { useState } from 'react'

import { Modal } from "@mui/material";
import { LetterAvatar } from '../../../LetterAvatar';

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles, Members } from './style'

import { ModalConfirmation } from "../ModalConfirmation";

export function ModalChat({ modalChatIsOpen, setModalChatIsOpen }){
    const { socket, options, setOptions, currentChat, setCurrentChat, deleteUserChat, conversation, setConversation } = useChat();
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
    const { user } = useAuth();

    async function handleDeleteUser(){
        const deletedUser = await deleteUserChat(currentChat._id, user.id_user) 
        setCurrentChat({...currentChat, users: currentChat.users.filter(user =>user.idUser !== user.id_user) })
        
        const message = {
            chatId: currentChat._id,
            value: `${user.nome} saiu do grupo`,
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
        
        setOptions([...options, {idUser: user.id_user, name: user.nome}])
        setModalConfirmationIsOpen(false)
    }

    const usersChat = currentChat.users?.map(user => ({
        name: user.name,
        idUser: user.idUser
    }))

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
                    {usersChat?.map(user => {
                        return (
                            <div id='member'>
                                <LetterAvatar name={user.name}/>
                                <p>{user.name}</p>
                            </div>
                        )
                    })} 
                </Members>

                <button onClick={() => setModalConfirmationIsOpen(true)}>Sair do grupo</button>
                <ModalConfirmation 
                    modalConfirmationIsOpen={modalConfirmationIsOpen} 
                    setModalConfirmationIsOpen={setModalConfirmationIsOpen}
                    onSuccess={handleDeleteUser}
                />
            </ModalStyles>
        </Modal>
    )
}