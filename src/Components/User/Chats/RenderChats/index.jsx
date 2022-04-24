

import chatImg from '../../../../Assets/images/PersonImage.svg'

import { Chat } from './style'

export function RenderChats({ chats }){    
    async function handleLoadConversation(chatId){
        //Connect with socket.io and load messages with chatId
        console.log(chatId)
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