import { useState, useEffect } from "react";
import { useAuth } from '../../../../hooks/useAuth';
import { useChat } from '../../../../hooks/useChat'

import { RenderChats } from "../RenderChats";
import { RenderMessage } from "../RenderMessages";
import { NavbarMessages } from "../NavBarMessages";
import { Welcome } from "../Welcome";
import { ConversationInput } from "../ConversationInput";


import { WelcomeAdmin } from "../WelcomeAdmin";
import { ModalNewChat } from "../ModalNewChat";
import { ModalChatAdmin } from "../ModalChatAdmin";
import { ModalChat } from "../ModalChat";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { WithoutChurch } from '../../../Admin/WithoutChurch/WithoutChurch.jsx';
import { Dropdown } from 'semantic-ui-react';

import { ChatsStyles, ChatsStylesAdmin } from './style.js';


export default function Chats({ marginLeft, isAdmin = false }){
    const { user } = useAuth();
    const { socket, getChats, chats, getChurches, churches, currentChat, setConversation, arrivalMessage, clearRoom, modalChatIsOpen, setModalChatIsOpen, modalChatAdminIsOpen, setModalChatAdminIsOpen} = useChat();
    const [currentRoom, setCurrentRoom] = useState(0);
    const [modalNewChatIsOpen, setModalNewChatIsOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [renderChatsOpen, setRenderChatsOpen] = useState(false)

    useEffect(async () => {
        await getChurches(user?.id_user);
        socket.current.emit('join', user.id_user)
    }, []);

    useEffect(() => {
        arrivalMessage &&
            setConversation((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    async function handleChangeRoom(e, roomId){
        e.preventDefault();
        setRenderChatsOpen(true)
        await getChats(user?.id_user, roomId);
        setCurrentRoom(options.filter(option => option.value === roomId));
        clearRoom();
    }
    
    
    const options = []
    churches.map(church => {
        options.push({ 
            text: church.name, 
            value: church._id
        })
    })  

    // Busca Grupos
    const lowerSearch = search.toLowerCase()
    const chatsSearch = chats.filter((chat)=> (chat.name).toLowerCase().includes(lowerSearch))

    // Configurando cor para componente de busca
    const theme = createTheme({
        palette: {
          primary: {
            main: '#F3B72B',
          }
        },
      });
    return !isAdmin ? ( 
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
                        {renderChatsOpen && (
                            <>
                                {chats.length > 0 ? (
                                    <div id="chatSearch">
                                    <ThemeProvider theme={theme}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label="Pesquise um grupo"
                                                InputProps={{
                                                    startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                    )
                                                }}
                                                variant="standard"
                                                value={search}
                                                color="primary"
                                                className="searchChats"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </ThemeProvider>
                                    </div>
                                ):('')}

                                <RenderChats chats={chatsSearch}/>
                            </>
                        )}
                        
                    </div>
                    
                    <div className='conversation col-8'>
                        { Object.keys(currentChat).length > 0 ? (
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
            <ModalChat modalChatIsOpen={modalChatIsOpen} setModalChatIsOpen={setModalChatIsOpen}/>
        </ChatsStyles>
    ) : (
        <ChatsStylesAdmin marginLeft={marginLeft}>
            <div>                    
                <div className='chat'>
                    <div className='users col-3'>
                        <button id="addChat" onClick={() => setModalNewChatIsOpen(true)}>Adicionar Grupo</button> 
                        {chats.length > 0 ? (
                            <div id="chatSearch">
                                <ThemeProvider theme={theme}>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        placeholder="Pesquise um grupo"
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                            )
                                        }}
                                        variant="standard"
                                        color="primary"
                                        value={search}
                                        className="searchChats"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </ThemeProvider>
                            </div>
                        ):('')}
                        <RenderChats chats={chatsSearch} isAdmin={isAdmin}/>
                        
                    </div>
                    
                    <div className='conversation col-8'>
                        { Object.keys(currentChat).length > 0 ? (
                            <>
                                <NavbarMessages isAdmin={isAdmin} />                                       
                                <div className='messages'>
                                    <RenderMessage/>
                                </div>
                                <ConversationInput />
                            </>
                            ):(
                                <WelcomeAdmin church={user.church}/>
                            )
                        }
                    </div>
                </div>
            </div>

            <ModalNewChat modalNewChatIsOpen={modalNewChatIsOpen} setModalNewChatIsOpen={setModalNewChatIsOpen}/>
            <ModalChatAdmin modalChatAdminIsOpen={modalChatAdminIsOpen} setModalChatAdminIsOpen={setModalChatAdminIsOpen}/>
        </ChatsStylesAdmin>
    )
}