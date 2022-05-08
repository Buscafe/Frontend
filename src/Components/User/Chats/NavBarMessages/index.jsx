import { useChat } from '../../../../hooks/useChat'

import { Header } from './style'

export function NavbarMessages(){   
    const { currentChat, setCurrentChatName, setCurrentChatCreated, chats, setModalChatIsOpen } = useChat();


    const nameChat = chats.map(chat=>{
        let users = []
        if (chat._id==currentChat){
            chat.users.map(user=>{
                users.push(user.name)
            })
            // Setting Creating Chat
            const [dataDias, dataHoras] = chat.createdAt.split('T')
            const [ano, mes, dia] = dataDias.split('-')
            const created = `${dia}-${mes}-${ano}` 
            setCurrentChatName(chat.name)
            setCurrentChatCreated(created)

            return(
                <Header>
                    <button id="addChat" onClick={() => setModalChatIsOpen(true)}><h2>{chat.name}</h2></button> 
                </Header>
            )
        }
    })

    return nameChat;
}