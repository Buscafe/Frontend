import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import { useState, useEffect } from "react";
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from "react-icons/io";
import { ConversationInputStyled } from "./style";

export function ConversationInput({handleSendMsg}){  
    const { user } = useAuth();
    const { socket, currentChat, conversation, setConversation} = useChat();

    const [newMessage, setNewMessage] = useState(""); 
    // const [msg, setMsg] = useState("");
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
        const message = {
            chatId: currentChat,
            value: newMessage,
            senderId: user.id_user,
            sender: user.nome
        }
        socket.current.emit('sendMessage', message, data=>{
            if (conversation.length===0){
                setConversation([data.message])
            }else{
                setConversation([...conversation, data.message])
            }
        })

    }

    return(
        <>
            <ConversationInputStyled>
                <div className="button-container">
                    <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                    </div>
                </div>
                <form className="input-container" onSubmit={(event) => handleSenderMessage(event)}>
                    <input 
                        type="text"
                        className="messageField"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage} 
                    />
                    <button type="submit">
                        <IoMdSend />
                    </button>
                </form>
            </ConversationInputStyled>
        </>
    )
}