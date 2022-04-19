import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

import Message  from '../../../Messages/index.jsx';

import userIMG from '../../../../Assets/images/PersonImage.svg';
import { ChatsStyles } from './styles.js';

export default function Chats({ marginLeft }){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = useRef();
    
    useEffect(() => {
        socket.current = io('http://localhost:3333');  
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
          text: newMessage,
        }

        socket.current.emit('sendMessage', {
            mensagem: message
        })
    }


    function renderMessage(message){
        return <Message message={message} />
    }

    socket.current.on('receivedMessage', (message) => {
        console.log(message)
    })

    return(
        <ChatsStyles marginLeft={marginLeft}>
            
            <div className='content'>

                <h1>Conecte com sua Igreja, Igor.</h1>

                <div className='chat'>

                    <div className='users col-3'>
                        <div className='searchPeople'> <h2>Buscar contato</h2> </div>

                        <div className='eachUser'>
                            <img className='userImageSearch' src={userIMG} alt="" />
                            <div className='userName'><h3>Clodovildo Santana</h3></div>
                            <span>1</span>
                        </div>
                        <div className='eachUser'>
                            <img className='userImageSearch' src={userIMG} alt="" />
                            <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                            <span>5</span>
                        </div>
                       
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