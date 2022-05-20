import { useState } from "react";
import { useChat } from '../../../../hooks/useChat'

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export function Message(message, sender = false){
    const { socket, setConversation, deleteMessage, currentChat} = useChat();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    // Delete Chat
    async function handleMessageChat(messageId, chatId){
        const messageDeleted = await deleteMessage(chatId, messageId)
        socket.current.emit('getMensages', chatId, response => {
            setConversation(response)
        })
        socket.current.emit('updateMessages', messageDeleted)
    }
    console.log(message)
    // Setting date
    const date = new Date(message.createdAt)
    const time = date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()

    return(
        <>
            {message.status === "deleteMensagem" || 
             message.status === "updateUser"      || 
             message.status === "deleteUser"      ? (
                <div>
                    <p className="messageText">{message.value}</p>
                    <time>{time}</time>
                </div>
            ): sender ? (
                    <>
                        <span>{sender}</span> 
                        <div>
                            <p className="messageText">{message.value}</p>
                            <time>{time}</time>
                        </div>
                    </>
            ): (
                <div>
                    <p className="messageText">{message.value}</p>
                    <time>{time}</time>
                        <>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>     
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleMessageChat(message._id, currentChat._id)}>
                                    Apagar Mensagem
                                </MenuItem>
                            </Menu>  
                        </>
                </div>
            )}         
        </>
    )
}