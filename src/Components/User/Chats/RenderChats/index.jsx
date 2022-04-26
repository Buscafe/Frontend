import { useChat } from '../../../../hooks/useChat'

import chatImg from '../../../../Assets/images/PersonImage.svg'

import { Chat } from './style'

export function RenderChats({ chats }){    
    const { socket } = useChat();

    async function handleLoadConversation(chatId){
        socket.current.emit('getMenssages', chatId, response => {
            console.log(response)
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