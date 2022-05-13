import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth'
import { Message } from '../Message';

import { ContainerMessage, MessageOtherUser, ErrorBox } from './style';

export function RenderMessage(){   
    const { user } = useAuth();
    const { conversation} = useChat();
    
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