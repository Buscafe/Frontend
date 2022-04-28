import { useState, useEffect } from "react";
import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import { RenderChats } from "../RenderChats";
import { RenderMessage } from "../RenderMessages";
import { NavbarMessages } from "../NavBarMessages";

import { Dropdown } from 'semantic-ui-react';

import { ChatsStyles } from './style.js';

export default function Chats({ marginLeft }){
    const { user } = useAuth();
    const { getChats, chats, getChurches, churches, socket, currentChat, conversation, setConversation} = useChat();
    const [newMessage, setNewMessage] = useState("");

    useEffect(async () => {
        await getChurches(user?.id_user);
    }, []);
    
    async function handleChangeRoom(roomId){
        await getChats(user?.id_user, roomId);
        
        socket.current.on('newMessage', data=> {
            if (conversation.length===0){
                setConversation([data.message])
            }else{
                console.log('segunda vez')
                setConversation([...conversation, data.message])
            }
        })
    }
    
    // Take the messages that user wrote
    function handleSenderMessage(e){
        e.preventDefault();
        const message = {
            chatId: currentChat,
            value: newMessage,
            senderId: user.id_user
        }
        socket.current.emit('sendMessage', message, data=>{
            if (conversation.length===0){
                setConversation([data.message])
            }else{
                setConversation([...conversation, data.message])
            }
        })

    }


    //Opções das igrejas que o usuário está filiado, 
    //está sendo utilizado no Dropdown, final da página
    const options = []
    //{code: 2, msg: 'User dont have any chunch affiliate'}
    if (churches.code !== 2){
        churches.map(church => {
            options.push({ 
                text: church.name, 
                value: church._id
            })
        })  
    }else{
        //Trazer mensagem de que o usuário não está filiado em nenhuma igreja
    }

    return(
        <>
            
            <ChatsStyles marginLeft={marginLeft}>
                <div className='content'>
                    <div className="header">
                        <h1>Conecte com sua Igreja, {user?.nome}.</h1>

                        <Dropdown
                            id='dropdownChurchs'
                            options={options} selection placeholder='Igreja filiada' 
                            onChange={(event, {value}) => {
                                handleChangeRoom(value)
                            }}    
                        />                   
                    </div>
                    
                    <div className='chat'>
                        <div className='users col-3'>
                            <div className='searchPeople'> <h2>Buscar contato</h2> </div>
                            <RenderChats chats={chats}/>
                        </div>
                      
                            <div className='conversation col-8'>
                                {currentChat.length ? (
                                    <>
                                        <NavbarMessages />

                                        <div className='backgroundConversation'>
                                            <div className='messages'>
                                            <RenderMessage/>
                                            </div>
                                            <br/>
                                            <input 
                                                type="text"
                                                className="messageField"
                                                placeholder="write something..."
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                value={newMessage} 
                                            />
                                            <button type='submit' className='sendButton' onClick={handleSenderMessage}>Enviar</button>
                                        </div>
                                    </>
                                    ):(
                                        <span className="noConversationText">
                                           <NavbarMessages msg="Abra um grupo para começar uma conversa" /> 
                                        </span>
                                    )
                                }
                            </div>
                    </div>
                </div>
            </ChatsStyles>
    </>
    );
}