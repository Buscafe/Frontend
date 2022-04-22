import { useState, useEffect } from "react";
import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import Message  from '../../../Messages/index.jsx';

import userIMG from '../../../../Assets/images/PersonImage.svg';
import { ChatsStyles } from './styles.js';

export default function Chats({ marginLeft }){
    const { user } = useAuth();
    const { getRooms, rooms } = useChat();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        getRooms(user?.id_user);
    }, []);
    
    console.log(rooms)
    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    return(
        <ChatsStyles marginLeft={marginLeft}>
            
            <div className='content'>

                <h1>Conecte com sua Igreja, Igor.</h1>

                <div className='chat'>

                    <div className='users col-3'>
                        <div className='searchPeople'> <h2>Buscar contato</h2> </div>

                        {/* ta dando erro aqui ó, tira o rooms.chats? que da erro*/}
                        { rooms.chats?.map(chat => {
                            return( 
                                <div className='eachUser'>
                                    <img className='userImageSearch' src={userIMG} alt="" />
                                    <div className='userName'>
                                        <h3>{chat.name}</h3>
                                    </div>
                                    <span>1</span>
                                </div>
                            )
                        }) }
                    </div>

                    <div className='conversation col-8'>
                        <div className='backgroundConversation'>
                            <div className='messages'>
                                <div className='messageBox'>
                                    Bom dia seus lindos!!!
                                    <img className='userImage' src={userIMG} alt="" />
                                </div>
                                <div className='messageBox left'>
                                    <img className='userImage' src={userIMG} alt="" />
                                    Bom dia seus feio!!!
                                </div>
                            </div>
                            <br />
                            <input 
                                type="text"
                                className="messageField"
                                placeholder="write something..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage} 
                            />

                            <button type='submit' className='sendButton' onClick={handleSubmit}>Enviar</button>
                        </div>
                    </div>

                </div>

            </div>
        </ChatsStyles>
    );
}