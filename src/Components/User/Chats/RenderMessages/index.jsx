import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth'
import { format } from "timeago.js";

export function RenderMessage(){   
    const { user } = useAuth();
    const { errors, conversation} = useChat();
    console.log(conversation)
    if (conversation.length===0){
        return (
            <div className='messageBox'>
                {errors.msg}
            </div>
        )
    } else{
        const allMessages = conversation.map(message => {
            if(message.senderId == user.id_user){
                return (
                    <>
                        <div className='messageBox'>
                            <p className="messageText">{message.value}</p>   
                        </div>
                        <div className="messageBottom">{format(message.createdAt)}</div>
                    </>
                )
            }else{
                return (
                    <div className='messageBox left'>
                        {message.value}
                        {message.date}
                    </div>
                )
            }
        })
        return allMessages;
    }
}