import { useState } from "react";
import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth';

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"


import { ModalConfirmation } from "../ModalConfirmation";

import { ChatsStyles } from './style'

export function RenderChats({ chats, isAdmin = false }){   
    const {socket, setConversation, setCurrentChat, setErrors, deleteChat, getChats} = useChat();
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
    const { user } = useAuth();



    // Renderiza Chats
    async function handleLoadConversation(selectChat){
        setConversation([]);
        setCurrentChat(selectChat);

        socket.current.emit('getMensages', selectChat._id, response => {
            if(response.code === 2){
                setErrors(response)
            }else{
                setConversation(response)
            }
        })
    }
    // Delete Chat
    async function handleDeleteChat(id_chat, name){
        const chatDeleted = await deleteChat(id_chat)
        
        // Recebe no ChatContext
        socket.current.emit('deleteChat', {chatName: name, churchName: user.church.name, roomId: user.church.roomId})
        getChats(user.id_user, user.church.roomId)

        setModalConfirmationIsOpen(false)
    }
    
    // ARRUMAR 
    const allChats = chats.map(chat => {
        return (
            <>
                <ChatsStyles onClick={() => handleLoadConversation(chat)} key={chat._id}>
                    <h3>{chat.name}</h3>
                
                    {isAdmin ? (
                        <>
                            <IconButton onClick={() => setModalConfirmationIsOpen(true)} aria-label="delete" size="small" color="error">
                                <DeleteIcon color="error"/>
                            </IconButton>
                            <ModalConfirmation 
                                modalConfirmationIsOpen={modalConfirmationIsOpen} 
                                setModalConfirmationIsOpen={setModalConfirmationIsOpen}
                                onSuccess={() => handleDeleteChat(chat._id, chat.name)}
                                nameChat={chat.name}
                            />
                        </>
                    ): ''}
                </ChatsStyles>
            </>
        )
    })

    return allChats;
}