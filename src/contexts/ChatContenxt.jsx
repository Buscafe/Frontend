import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../services/api";
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export const ChatContext = createContext({});

export function ChatContextProvider({ children }){
    const { user } = useAuth();

    const [chats, setChats] = useState(() => {
        if(localStorage.getItem('Chats')){
          return JSON.parse(localStorage.getItem('Chats'));
        } 
    
        return [];
    });
    const [allUsersChurch, setAllUsersChurch] = useState([]);
    
    const [churches, setChurches] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [isTyping, setTyping] = useState(false);
    const [userTyping, setUserTyping] = useState('');
    const [errors, setErrors] = useState({});
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);
    const [modalChatAdminIsOpen, setModalChatAdminIsOpen] = useState(false);
    const [currentChat, setCurrentChat] = useState({});
    const [options, setOptions] = useState([]);
    
    const socket = useRef();
    
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_URL || 'http://localhost:3333');

        // New Message
        socket.current.on('newMessage', data => {
            setArrivalMessage(data.message);
            setTyping(false);
        });
        // Identify who is typing a message
        socket.current.on('newMessageTyping', (data)=>{
            if (data.text_msg.length > 0){
                setUserTyping(data.username)
                setTyping(true);
            }else{
                setTyping(false);
            }
        })
        // new group
        socket.current.on('newChat', (data) => {
            toast.success(`O grupo ${data.chatName} foi criado por ${data.churchName}`) 
            getChats(user.id_user, data.roomId)
        })
        // update group
        socket.current.on('updatedChat', (data) => {
            getChats(user.id_user, data.roomId)
            setCurrentChat(data.chat)
        })
        // When user leave the group
        socket.current.on('deletedUser', (data) => {
            setCurrentChat(data)
        })
        // When user is kicked out of the group
        socket.current.on('userKickedOut', (data) => {
            toast.info(`Você foi expulso do grupo ${data.chat.name}`)
            setCurrentChat('')
            getChats(user.id_user, data.roomId)
        })
        // Informing the group that a user has been deleted
        socket.current.on('kickedOutInformation', (data) => {
            setCurrentChat(data.chat)  
            const newChats = chats.filter(chat => chat._id !== currentChat._id)
            setChats([...newChats, data.chat])     
        })
        // When chat is deleted
        socket.current.on('deletedChat', (data) => {
            setCurrentChat('')
            getChats(user.id_user, data.roomId)
            toast.success(`${data.chatName} foi deletado por ${data.churchName}`)
        })
        
        socket.current.on('updatedMessages', (data) => {
            setConversation(data);
        })
    }, [])

    // Get all chats in a church room 
    async function getChats(id_user, roomId){
        try {
            const { data } = await api.get(`/social/getRooms/${id_user}/${roomId}`);

            if(data.err){
                throw new Error(data.err)
            }            

            console.log(data)
            setChats(data)
            localStorage.setItem('Chats', JSON.stringify(data))
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
                users: roomData.users,
                adminUser: roomData.adminUser
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
    async function deleteChat(id_chat, name){
        try {
            const { data } = await api.delete(`/admin/delete/chat/${id_chat}/${name}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }

    // Delete a Message  
    async function deleteMessage(chatId, messageId){
        try {
            const { data } = await api.post(`/social/delete/message/${chatId}/${messageId}`);
  
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }

    // ROOMS
    async function getAllUsers(_id, userId){
        try {
            const { data } = await api.get(`/admin/allUsers/${_id}/${userId}`);
            if(data.err){
                throw new Error(data.err)
            }
            setAllUsersChurch(data)
            return data;
        } catch (err) {
            console.error(err)
        }
    }


    return(
        <ChatContext.Provider value={ { 
            chats, getChats,
            setChats, 
            churches, getChurches, 
            socket, 
            conversation, setConversation, 
            currentChat, setCurrentChat,
            isTyping, setTyping,
            userTyping, setUserTyping,
            errors, setErrors,
            arrivalMessage, clearRoom,
            insertChat, updateChat,
            deleteUserChat,
            deleteChat,
            deleteMessage,
            modalChatIsOpen, setModalChatIsOpen,
            modalChatAdminIsOpen, setModalChatAdminIsOpen,
            options, setOptions, 
            allUsersChurch, getAllUsers, 
        }}>
            {children}
        </ChatContext.Provider>
    );
}