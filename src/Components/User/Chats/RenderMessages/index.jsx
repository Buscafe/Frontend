import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth'
import { Message } from '../Message';
import { ContainerMessage } from './style';

export function RenderMessage(){   
    const { user } = useAuth();
    const { errors, conversation} = useChat();
    if (conversation.length==0){
        return (
            <div className='messageBox'>
                {errors.msg}
            </div>
        )
    } else{
        const allMessages = conversation.map(message => {
            const [dataDias, dataHoras] = message.createdAt.split('T')
            const [horario, timezone] = dataHoras.split('.')
            const [hora, minuto, segundo] = horario.split(':')
            
            if(message.senderId == user.id_user){  
                return (
                    <ContainerMessage>
                        <div className='messageBox'>
                            {Message(message, hora, minuto)}
                        </div>
                    </ContainerMessage>
                )
            }else{
                return (
                    <ContainerMessage>
                        <div className='messageBoxOtherUser'>
                            {Message(message, hora, minuto)}
                        </div>
                    </ContainerMessage>
                )
            }
        })
        return allMessages;
    }
}