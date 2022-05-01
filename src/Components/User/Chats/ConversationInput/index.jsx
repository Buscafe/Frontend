import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import { useState } from "react";
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from "react-icons/io";

import { ConversationInputStyled } from "./style";

const emojiCategoriesNames = {
    smileys_people: 'Smileys sorrindo',
    animals_nature: 'Animais e natureza',
    food_drink: 'Comidas e bebidas',
    travel_places: 'Viagens e lugares',
    activities: 'Atividades',
    objects: 'Objetos',
    symbols: 'Símbolos',
    flags: 'Bandeiras',
    recently_used: 'Recentemente usados',
}

export function ConversationInput(){  
    const { user } = useAuth();
    const { socket, currentChat, conversation, setConversation} = useChat();

    const [newMessage, setNewMessage] = useState(""); 
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isTyping, setTyping] = useState(false);
    const [userTyping, setUserTyping] = useState('');

    
    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
  
    const handleEmojiClick = (event, emojiObject) => {
      let message = newMessage;
      message += emojiObject.emoji;
      setNewMessage(message);
    };
    
    // Take the messages that user wrote
    function handleSenderMessage(e){
        e.preventDefault();
        
        const message = {
            chatId: currentChat,
            value: newMessage,
            senderId: user.id_user,
            sender: user.nome
        }
        setNewMessage('')

        socket.current.emit('sendMessage', message, data=>{
            console.log('sendMessage')
            if (conversation.length === 0){
                setConversation([data.message])
            }else{
                setConversation([...conversation, data.message])
            }
        })
    }
    function handleChange(e){
        setNewMessage(e.target.value)
        const text_msg = e.target.value;
        let data = {
            "text_msg" : text_msg,
            "username": user.nome
        }
        socket.current.emit('messageTyping', data)

        socket.current.on('newMessageTyping', (data)=>{

            if (data.text_msg.length > 0){
                setUserTyping(data.username)
                setTyping(true);
            }else{
                setTyping(false);
            }
        })      
    }


    return(
        <>
            <ConversationInputStyled>
                    {isTyping &&
                        <p className='typewriter'>
                            {userTyping} está digitando...
                        </p> 
                    }
                    
                    <div>
                        <div className="button-container">
                            <div className="emoji">
                                <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                                {   
                                    showEmojiPicker && 
                                    <Picker 
                                        onEmojiClick={handleEmojiClick} 
                                        groupNames={emojiCategoriesNames}
                                    />
                                }
                            </div>
                        </div>
                        <form className="input-container" onSubmit={(event) => handleSenderMessage(event)}>
                            <input 
                                type="text"
                                className="messageField"
                                placeholder="Escreve alguma coisa..."
                                onChange={handleChange}
                                value={newMessage} 
                            />
                            <button type="submit">
                                <IoMdSend />
                            </button>
                        </form>
                    </div>
            </ConversationInputStyled>
        </>
    )
}