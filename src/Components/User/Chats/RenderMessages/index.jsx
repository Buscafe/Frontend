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
            const [dataDias, dataHoras] = message.createdAt.split('T')
            const [horario, timezone] = dataHoras.split('.')
            const [hora, minuto, segundo] = horario.split(':')
            
            if(message.senderId == user.id_user){  
                return (
                    <ContainerMessage>
                        {Message(hora, minuto, message.value)}
                    </ContainerMessage>
                )
            }else{
                return (
                    <MessageOtherUser>
                        {Message(hora, minuto, message.value, message.sender)}
                    </MessageOtherUser>
                )
            }
        })
        return allMessages;
    }
}