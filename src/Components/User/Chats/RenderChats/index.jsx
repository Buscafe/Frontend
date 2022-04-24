import chatImg from '../../../../Assets/images/PersonImage.svg'

import { Chat } from './style'

export function RenderChats({ chats }){
    const allChats = chats.map(chat => {
        return (
            <Chat>
                <img src={chatImg} alt=""/>
                <h3>{chat.name}</h3>
                <span>1</span>
            </Chat>
        )
    })

    return allChats;
}