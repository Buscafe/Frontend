import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'
import { api } from '../../../../services/api';
import { LetterAvatar } from '../../../LetterAvatar';
import { Avatar, AvatarGroup } from '@mui/material'

import { Header, HeaderAdmin } from './style'


export function NavbarMessages({isAdmin = false}){   
    const { user } = useAuth();
    const { currentChat, chats, setModalChatAdminIsOpen, setModalChatIsOpen, setOptions } = useChat();

    async function handleOpenModalChatAdmin(){
        setModalChatAdminIsOpen(true);
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
    const nameChat = chats.map(chat=>{
        if (chat._id == currentChat._id){
            return isAdmin ? (
                <HeaderAdmin onClick={handleOpenModalChatAdmin}>
                    {chat.name}

                    <AvatarGroup max={4}>
                        {currentChat.users.map(user => {
                            {console.log(user)} 
                            return user.image_url ? (    
                                       
                                <Avatar src={user.image_url} />               
                            ) : (<LetterAvatar name={user.name} />)
                        })}
                    </AvatarGroup>
                </HeaderAdmin>
            ) : (
                <Header onClick={() => setModalChatIsOpen(true)}>
                    {chat.name}

                    <AvatarGroup max={4}>
                        {currentChat.users.map(user => {
                            return user.image_url ? (            
                                <Avatar src={user.image_url} />               
                            ) : (<LetterAvatar name={user.name} />)
                        })}
                    </AvatarGroup>
                </Header>
            )
        }
    })

    return nameChat;
}