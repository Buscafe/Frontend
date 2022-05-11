import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'
import { api } from '../../../../services/api';

import { AvatarGroup, Avatar } from '@mui/material'

import { Header } from './style'
import { LetterAvatar } from '../../../LetterAvatar';

export function NavbarMessages({isAdmin = false}){   
    const { user } = useAuth();
    const { currentChat, chats, setModalChatIsOpen, setOptions } = useChat();

    async function handleOpenModalChat(){
        setModalChatIsOpen(true);
        const { data } = await api.get(`admin/allUsers/${user.church.roomId}/${user.id_user}`)
        
        if(data.err){
            throw new Error(data.err)
        }
            
        const usersNotAddedChat = data.filter(memberRoom => {
            return !currentChat.users.some(memberChat => {
                return memberRoom.idUser === memberChat.idUser;
            });
        });

        setOptions(usersNotAddedChat)
    }

    const usersNames = currentChat.users.map(user => user.name)
    const nameChat = chats.map(chat=>{
        if (chat._id == currentChat._id){
            // Arrumar -----------------------------------------------
            return isAdmin ? (
                <Header onClick={handleOpenModalChat}>
                    {chat.name}
                    <LetterAvatar isGroup names={usersNames}/>
                </Header>
            ) : (
                <Header>
                    {chat.name}
                    <LetterAvatar isGroup names={usersNames}/>
                </Header>
            )
        }
    })

    return nameChat;
}