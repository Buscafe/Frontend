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
import { toast } from "react-toastify";

export default function Chats({ marginLeft }){
    const { user } = useAuth();
    const { getChats, chats, getChurches, churches, currentChat, setConversation, arrivalMessage, clearRoom} = useChat();
    const [currentRoom, setCurrentRoom] = useState(0);
    useEffect(async () => {
        await getChurches(user?.id_user);
    }, []);

    useEffect(() => {
        arrivalMessage &&
            setConversation((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    async function handleChangeRoom(e, roomId){
        e.preventDefault();
        
        await getChats(user?.id_user, roomId);
        setCurrentRoom(options.filter(option => option.value === roomId));
        clearRoom();
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
        toast.info('Nehuma igreja encontrada, localize uma e se filia-se!')      
    }
    return(
        <>  
            <ChatsStyles marginLeft={marginLeft}>
                <div>                    
                    <div className='chat'>
                        <div className='users col-3'>
                            <Dropdown
                                id='dropDownChurches'
                                options={options} selection placeholder='Igreja filiada' 
                                onChange={(e, {value}) => {
                                    handleChangeRoom(e ,value)
                                }}    
                            />  
                            <RenderChats chats={chats}/>
                        </div>
                      
                        <div className='conversation col-8'>
                            {currentChat.length ? (
                                <>
                                    <NavbarMessages />                                       
                                    <div className='messages'>
                                        <RenderMessage/>
                                    </div>
                                    <ConversationInput />
                                </>
                                ):(
                                    <Welcome church={currentRoom[0]}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </ChatsStyles>
    </>
    );
}