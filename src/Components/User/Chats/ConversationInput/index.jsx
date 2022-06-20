import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import { useState } from "react";
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from "react-icons/io";
import { Image } from '@mui/icons-material';

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
    const { socket, currentChat, conversation, setConversation, isTyping, userTyping} = useChat();

    const [newMessage, setNewMessage] = useState(""); 
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
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
        
        if (newMessage.length === 0){
            return
        }
        const message = {
            chatId: currentChat._id,
            value: newMessage,
            senderId: user.id_user,
            sender: user.nome
        }
        setNewMessage('')

        // Filting who will receive the message
        const receivers = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString()
        );
        // Sending message for everyone in the group
        socket.current.emit('sendMessage', message, receivers, data=>{
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
            "username": user.nome,
            "chatId": currentChat._id
        }
        // Filting who will receive
        const receivers = currentChat.users.filter(
            (member) => member.idUser !== (user.id_user).toString()
        );
        socket.current.emit('messageTyping', data, receivers)   
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
                            <Image for="file" />
                            <input 
                                type="file"
                                name="file"
                                accept="image/png, image/jpeg"
                            />
                        </form>
                    </div>
            </ConversationInputStyled>
        </>
    )
}