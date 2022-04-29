import chatImg from '../../../../Assets/images/PersonImage.svg'
import { Chat } from './style'

import { useChat } from '../../../../hooks/useChat'

export function RenderChats({ chats }){   
    const {socket, setConversation, setCurrentChat, setErrors} = useChat();
   
    async function handleLoadConversation(chatId){
        setCurrentChat(chatId)
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
                <img src={chatImg} alt=""/>
                <h3>{chat.name}</h3>
                <span>1</span>
            </Chat>
        )
    })

    return allChats;
}