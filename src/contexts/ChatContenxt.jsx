import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../services/api";

export const ChatContext = createContext({});

export function ChatContextProvider({ children }){
    const [chats, setChats] = useState([]);
    const [churches, setChurches] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState({});
    const [errors, setErrors] = useState({});
    const socket = useRef();
    
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_URL || 'http://localhost:3333');

        socket.current.on('newMessage', data => {
            setArrivalMessage(data.message);
        });
    }, [])

    async function getChats(id_user, roomId){
        try {
            const { data } = await api.get(`/social/getRooms/${id_user}/${roomId}`);
            
            if(data.err){
                throw new Error(data.err)
            }            

            setChats(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function getChurches(id_user){
        try {
            const { data } = await api.get(`/social/getChurches/${id_user}`);

            if(data.err){
                throw new Error(data.err)
            }

            setChurches(data)
        } catch (err) {
            console.error(err)
        }
    }

    function clearRoom(){
        setConversation([]);
        setCurrentChat({});
        setArrivalMessage(null);
        setErrors({});
    }

    return(
        <ChatContext.Provider value={ { 
            chats, getChats, 
            churches, getChurches, 
            socket, 
            conversation, setConversation, 
            currentChat, setCurrentChat,
            errors, setErrors,
            arrivalMessage, clearRoom
        }}>
            {children}
        </ChatContext.Provider>
    );
}