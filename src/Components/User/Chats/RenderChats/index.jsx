import { useState } from "react";
import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { ModalConfirmation } from "../ModalConfirmation";

import { ChatsStyles } from './style'
import { toast } from "react-toastify";

export function RenderChats({ chats, isAdmin = false }){   
    const {socket, setConversation, setCurrentChat, currentChat, setErrors, 
        deleteChat, getChats,  setModalChatAdminIsOpen, setModalChatIsOpen} = useChat();
    const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Renderiza Chats
    async function handleLoadConversation(selectChat){
        setConversation([]);
        setCurrentChat(selectChat);

        socket.current.emit('getMensages', selectChat._id, response => {
            if(response.code === 2){
                setErrors(response)
            }else{
                setConversation(response)
            }
        })
    }
    // Delete Chat
    async function handleDeleteChat(id_chat, name){
        const chatDeleted = await deleteChat(id_chat, name)
        setCurrentChat('')
        setAnchorEl(null)
        setModalConfirmationIsOpen(false)
        
        if (chatDeleted.code === 2){
            return toast.info(chatDeleted.msg)
        }
        // Filting who will receive the message
        const receivers = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString()
        );
        // Recebe no ChatContext
        socket.current.emit('deleteChat', 
            {
                chatName: name, churchName: user.church.name, roomId: user.church.roomId, chatId: currentChat._id
            }, 
            receivers
        )
        getChats(user.id_user, user.church.roomId)

    }

    return(
        <>
            {chats.map(chat => {
                return (
                    <ChatsStyles onClick={() => handleLoadConversation(chat)} key={chat._id}>
                        <div>
                            <h3>{chat.name}</h3>
                        </div>
                        
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
                    </ChatsStyles>
                )
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
                {isAdmin ?(
                    <>
                        <MenuItem onClick={() => setModalConfirmationIsOpen(true)}>
                            Deletar grupo
                        </MenuItem>
                        <MenuItem onClick={() => {
                            setModalChatAdminIsOpen(true)
                            setAnchorEl(null)
                        }}>
                            Ver detalhes do Grupo
                        </MenuItem>
                    </>
                ): (
                    <MenuItem onClick={() => {
                        setModalChatIsOpen(true)
                        setAnchorEl(null)}
                    }>
                        Ver detalhes do Grupo
                    </MenuItem> 
                )}
            </Menu>        

            <ModalConfirmation 
                modalConfirmationIsOpen={modalConfirmationIsOpen} 
                setModalConfirmationIsOpen={setModalConfirmationIsOpen}
                onSuccess={() => handleDeleteChat(currentChat._id, currentChat.name)}
                title={`Tem certeza que quer deletar o grupo ${currentChat.name}?`}
            />  
        </>
    )
}