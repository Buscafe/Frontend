import { useChat } from '../../../../hooks/useChat'

import { Header } from './style'

export function NavbarMessages(){   
    const { currentChat, chats } = useChat();

    const nameChat = chats.map(chat=>{
        let users = []
        if (chat._id==currentChat){
            chat.users.map(user=>{
                users.push(user.name)
            })

            return(
                <Header>
                    <h2>{chat.name}</h2>
                </Header>
            )
        }
    })

    return nameChat;
}