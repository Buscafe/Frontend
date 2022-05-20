import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth'
import { Message } from '../Message';

import { ContainerMessage, MessageOtherUser, ErrorBox } from './style';

export function RenderMessage(){   
    const { user } = useAuth();
    const { conversation } = useChat();
    if (conversation.length == 0){
        return (
            <ErrorBox>
               O chat não tem nenhuma mensagem, seja o primeiro !
            </ErrorBox>
        )
    } else{
        const allMessages = conversation.map((message) => {
            if(message.senderId == user.id_user){ 
                return (
                    <ContainerMessage status={message.status}>
                        <div key={message._id}>
                            {Message(message)}
                        </div>
                    </ContainerMessage>
                )
            } else{
                return (
                    <MessageOtherUser status={message.status} >
                        {Message(message, message.sender)}
                    </MessageOtherUser>
                )
            }
        })
        return allMessages
    }
}