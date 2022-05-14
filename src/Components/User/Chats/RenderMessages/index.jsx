import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth'
import { Message } from '../Message';

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"


import { ContainerMessage, MessageOtherUser, ErrorBox } from './style';

export function RenderMessage(){   
    const { user } = useAuth();
    const { conversation, socket, setConversation, deleteMessage, currentChat} = useChat();
    
    // Delete Chat
    async function handleMessageChat(id_message){
        const messageDeleted = await deleteMessage(id_message)

        socket.current.emit('getMensages', currentChat._id, response => {
            setConversation(response)
        })
    }

    if (conversation.length == 0){
        return (
            <ErrorBox>
               O chat não tem nenhuma mensagem, seja o primeiro !
            </ErrorBox>
        )
    } else{
        const allMessages = conversation.map(message => {
            const date = new Date(message.createdAt)
            const time = date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()
            
            if(message.senderId == user.id_user){  
                return (
                    //Arrumar -----------------------------------------------
                    <ContainerMessage color={message.status && 'removeUser' && 'updateUser'}>
                        {Message(time, message.value)}
                        {message.status === "deleteMensagem" ? (''):(
                            <IconButton onClick={() => handleMessageChat(message._id)} aria-label="delete" size="small" color="error">
                                <DeleteIcon color="error"/>
                            </IconButton>
                        )}
                    </ContainerMessage>
                )
            }else{
                return (
                    <MessageOtherUser status={message.status && 'removeUser' && 'updateUser'}>
                        {Message(time, message.value, message.sender)}
                    </MessageOtherUser>
                )
            }
        })
        return allMessages;
    }
}