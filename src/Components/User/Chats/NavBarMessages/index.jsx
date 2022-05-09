import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'
import { api } from '../../../../services/api';

import { AvatarGroup, Avatar } from '@mui/material'

import { Header } from './style'
import { LetterAvatar } from '../../../LetterAvatar';

export function NavbarMessages(){   
    const { user } = useAuth();
    const { currentChat, chats, setModalChatIsOpen, setOptions } = useChat();

    async function handleOpenModalChat(){
        setModalChatIsOpen(true);

        const { data } = await api.get(`admin/allUsersChat/${user.church.roomId}/${currentChat._id}`)

        if(data.err){
            throw new Error(data.err)
        }

        setOptions(data)
    }

    const usersNames = currentChat.users.map(user => user.name)

    const nameChat = chats.map(chat=>{
        if (chat._id == currentChat._id){
            return(
                <Header onClick={handleOpenModalChat}>
                    {chat.name}

                    <LetterAvatar isGroup names={usersNames}/>
                </Header>
            )
        }
    })

    return nameChat;
}