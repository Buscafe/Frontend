import { useChat } from '../../../../hooks/useChat'

import { Chat } from './style'

export function RenderChats({ chats }){   
    const {socket, setConversation, setCurrentChat, setErrors} = useChat();
   
    async function handleLoadConversation(chatId){
        setConversation([]);
        setCurrentChat(chatId);

        socket.current.emit('getMensages', chatId, response => {
            if(response.code === 2){
                setErrors(response)
            }else{
                setConversation(response)
            }
        })
    }

    const allChats = chats.map(chat => {
        return (
            <Chat onClick={() => handleLoadConversation(chat._id)} key={chat._id}>
                <h3>{chat.name}</h3>
            </Chat>
        )
    })

    return allChats;
}