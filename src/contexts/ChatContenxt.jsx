import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../services/api";
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export const ChatContext = createContext({});

export function ChatContextProvider({ children }){
    const { user } = useAuth();

    const [chats, setChats] = useState([]);
    const [churches, setChurches] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);
    const [currentChat, setCurrentChat] = useState({});
    const [options, setOptions] = useState([]);

    const socket = useRef();
    
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_URL || 'http://localhost:3333');

        socket.current.on('newMessage', data => {
            setArrivalMessage(data.message);
        });

        socket.current.on('newChat', (data) => {
            getChats(user.id_user, data.roomId)
            toast.success(`O grupo ${data.chatName} foi criado por ${data.churchName}`)
        })

        socket.current.on('deletedChat', (data) => {
            getChats(user.id_user, data.roomId)
            toast.success(`${data.chatName} foi deletado por ${data.churchName}`)
        })
    }, [])

    // Get all chats in a church room 
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

    // Get all churches from a user
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
    // Clear all information when we change church
    function clearRoom(){
        setConversation([]);
        setCurrentChat({});
        setArrivalMessage(null);
        setErrors({});
    }

    // Insert a Chat
    async function insertChat(roomData){
        try {
            const { data } = await api.post(`/admin/chat/insert`, {
                roomId: roomData.roomId,
                name:  roomData.name,
                description: roomData.description,
                users: roomData.users
            });

            if(data.err){
                throw new Error(data.err)
            }

            return data
        } catch (err) {
            console.error(err)
        }
    }

    // Update a Chat
    async function updateChat(chatData){
        try {
            const { data } = await api.post(`/admin/chat/update`, {
                chatId: chatData.chatId,
                name:  chatData.name,
                description: chatData.description,
                users: chatData.users
            });

            if(data.err){
                throw new Error(data.err)
            }

            return data
        } catch (err) {
            console.error(err)
        }
    }

    // Delete a User in a Chat
    async function deleteUserChat(id_chat, id_user){
        try {
            const { data } = await api.delete(`/admin/delete/userChat/${id_chat}/${id_user}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }

    // Delete a Chat   
    async function deleteChat(id_chat){
        try {
            const { data } = await api.delete(`/admin/delete/chat/${id_chat}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <ChatContext.Provider value={ { 
            chats, getChats, 
            churches, getChurches, 
            socket, 
            conversation, setConversation, 
            currentChat, setCurrentChat,
            errors, setErrors,
            arrivalMessage, clearRoom,
            insertChat, updateChat,
            deleteUserChat,
            deleteChat,
            modalChatIsOpen, setModalChatIsOpen,
            options, setOptions
        }}>
            {children}
        </ChatContext.Provider>
    );
}