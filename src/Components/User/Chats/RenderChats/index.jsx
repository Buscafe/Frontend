import { useChat } from '../../../../hooks/useChat'

import { Chat } from './style'

export function RenderChats({ chats }){   
    const {socket, setConversation, setCurrentChat, setErrors} = useChat();

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
            <Chat onClick={() => handleLoadConversation(chat)} key={chat._id}>
                <h3>{chat.name}</h3>
            </Chat>
        )
    })

    return allChats;
}