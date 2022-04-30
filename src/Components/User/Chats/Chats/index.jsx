import { useState, useEffect } from "react";
import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import { RenderChats } from "../RenderChats";
import { RenderMessage } from "../RenderMessages";
import { NavbarMessages } from "../NavBarMessages";
import { Welcome } from "../Welcome";
import { ConversationInput } from "../ConversationInput";

import { Dropdown } from 'semantic-ui-react';

import { ChatsStyles } from './style.js';

export default function Chats({ marginLeft }){
    const { user } = useAuth();
    const { getChats, chats, getChurches, churches, socket, currentChat, conversation, setConversation} = useChat();

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
                    <div className='chat'>
                        <div className='users col-3'>
                            <Dropdown
                                id='dropDownChurches'
                                options={options} selection placeholder='Igreja filiada' 
                                onChange={(event, {value}) => {
                                    handleChangeRoom(value)
                                }}    
                            />  
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
                                        </div>
                                        
                                        <ConversationInput />
                                    </>
                                    ):(
                                        <Welcome/>
                                    )
                                }
                            </div>
                    </div>
                </div>
            </ChatsStyles>
    </>
    );
}