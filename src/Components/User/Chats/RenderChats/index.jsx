import { useChat } from '../../../../hooks/useChat'
import { toast } from 'react-toastify';

import { Chat } from './style'

import { useAuth } from '../../../../hooks/useAuth';

export function RenderChats({ chats, isAdmin = false }){   
    const { user } = useAuth();
    const {socket, getChats, setConversation, setCurrentChat, setErrors, deleteChat} = useChat();

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
    async function handleDeleteChat(id_chat){
        const chatDeleted = await deleteChat(id_chat)
        toast.success(chatDeleted.msg)
        
        // Arrumar -----------------------------------------------
        socket.current.emit('deleteChat', user.church.roomId)
        socket.current.on('deletedChat', (data) => {
            getChats(user.id_user, data)
        })
        getChats(user.id_user, user.church.roomId)
    }
    
    const allChats = chats.map(chat => {
        return (
            <>
                <Chat onClick={() => handleLoadConversation(chat)} key={chat._id}>
                    <h3>{chat.name}</h3>
                </Chat>
                {isAdmin ? (
                    <button id="deleteChat" onClick={() => handleDeleteChat(chat._id)}>Deletar Chat</button> 
                ): ''}
            </>
        )
    })

    return allChats;
}