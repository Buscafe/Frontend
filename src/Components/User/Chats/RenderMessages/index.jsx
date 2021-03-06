import { useState, useEffect, useRef} from 'react';

import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth'
import { Message } from '../Message';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { ContainerMessage, MessageOtherUser, ErrorBox } from './style';

export function RenderMessage(){   
    const { user } = useAuth();
    const { conversation, currentChat, socket, setConversation, deleteMessage } = useChat();
    const [currentMessage, setCurrentMessage] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const scrollRef = useRef();

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Delete Message
    async function handleMessageChat(messageId, chatId){
        const messageDeleted = await deleteMessage(chatId, messageId)

        socket.current.emit('getMensages', chatId, response => {
            setConversation(response)
        })
        
        // Filting who will receive the message
        const receivers = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString()
        );
        // update the chat with delete message
        socket.current.emit('updateMessages', messageDeleted, receivers, chatId)
        setAnchorEl(null);
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [conversation]);

    if (conversation.length == 0){
        return (
            <ErrorBox>
               O chat não tem nenhuma mensagem, seja o primeiro !
            </ErrorBox>
        )
    } else {
        return (
            <>
                {conversation.map((message) => {
                    if(message.senderId == user.id_user){ 
                        return (
                            <ContainerMessage status={message.status} key={message._id} ref={scrollRef}>
                                {Message(message, false, anchorEl, setAnchorEl, setCurrentMessage)}
                            </ContainerMessage>  
                        )
                    } else{
                        return (
                            <MessageOtherUser status={message.status} ref={scrollRef}>
                                {Message(message, message.sender)}
                            </MessageOtherUser>
                        )
                    }
                })}

                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleMessageChat(currentMessage._id, currentChat._id)}>
                        Apagar Mensagem
                    </MenuItem>
                </Menu>
            </>
        )
    }
}