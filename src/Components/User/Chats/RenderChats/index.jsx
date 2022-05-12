import { useState } from "react";
import { useChat } from '../../../../hooks/useChat'

import { ModalConfirmation } from "../ModalConfirmation";

import { ChatsStyles, ChatsStylesAdmin } from './style'


export function RenderChats({ chats, isAdmin = false }){   
    const {socket, setConversation, setCurrentChat, setErrors} = useChat();
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);


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
    
    const allChats = chats.map(chat => {
        return (
            <>
                <ChatsStyles onClick={() => handleLoadConversation(chat)} key={chat._id}>
                    <h3>{chat.name}</h3>
                </ChatsStyles>
                {isAdmin ? (
                    <ChatsStylesAdmin>
                        {console.log(modalConfirmationIsOpen)}
                        <button id="deleteChat" onClick={() => setModalConfirmationIsOpen(true)}>Deletar Chat</button>
                        <ModalConfirmation 
                            modalConfirmationIsOpen={modalConfirmationIsOpen} 
                            setModalConfirmationIsOpen={setModalConfirmationIsOpen}
                            chatId={chat._id}
                            chatName={chat.name}
                        />
                    </ChatsStylesAdmin>
                ): ''}
            </>
        )
    })

    return allChats;
}