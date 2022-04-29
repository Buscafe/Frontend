import { useChat } from '../../../../hooks/useChat'

export function NavbarMessages(){   
    const { currentChat, chats } = useChat();
    const nameChat = chats.map(chat=>{
        let users = []
        if (chat._id==currentChat){
            chat.users.map(user=>{
                users.push(user.name)
            })
            console.log(users)
            return(
                <div className='nav'>
                    <h2>{chat.name}</h2>
                    {users}
                </div>
            )
        }
    })
    return nameChat;
}