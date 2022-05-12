import { useState } from 'react'
import { Modal } from "@mui/material";
import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles } from './style'

export function ModalConfirmation({ modalConfirmationIsOpen, setModalConfirmationIsOpen, chatId, chatName}){
    const { socket, getChats, deleteChat } = useChat();
    const { user } = useAuth();

    // Delete Chat
    async function handleDeleteChat(id_chat, name){
        const chatDeleted = await deleteChat(id_chat)
        
        // Recebe no ChatContext
        socket.current.emit('deleteChat', {chatName: name, churchName: user.church.name, roomId: user.church.roomId})
        getChats(user.id_user, user.church.roomId)

        setModalConfirmationIsOpen(false)
    }

    return (
        <Modal
            open={modalConfirmationIsOpen}
            onClose={() => setModalConfirmationIsOpen(false)}
        >
            <ModalStyles>
                <h3>Tem certeza que quer deletar o grupo {chatName}?</h3>
                <button id="next" onClick={()=>{handleDeleteChat(chatId, chatName)}}>Sim</button>
                <button id="cancel" onClick={()=>{setModalConfirmationIsOpen(false)}}>Não</button>
            </ModalStyles>
        </Modal>
    )
}