import { createContext, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../services/api";

export const ChatContext = createContext({});

export function ChatContextProvider({ children }){
    const [chats, setChats] = useState([]);
    const [churches, setChurches] = useState([])

    async function getChats(id_user, church){
        try {
            const { data } = await api.get(`/social/getRooms/${id_user}/${church}`);
          
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

    return(
        <ChatContext.Provider value={ { chats, getChats, churches, getChurches}}>
            {children}
        </ChatContext.Provider>
    );
}


//  const socket = useRef();
//  socket.current = io(process.env.REACT_APP_API_URL || 'http://localhost:3333');