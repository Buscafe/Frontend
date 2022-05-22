import { useEffect, useState } from 'react'
import { Modal, Select, OutlinedInput, Box, Chip, MenuItem, InputLabel } from "@mui/material";
import { toast } from 'react-toastify';

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { api } from '../../../../services/api';

import { ModalStyles } from './style'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function ModalNewChat({ modalNewChatIsOpen, setModalNewChatIsOpen }){
    const { getChats, insertChat, socket } = useChat();
    const { user } = useAuth();
    const [chatMembers, setChatMembers] = useState([]);
    const [chatName, setChatName] = useState('');
    const [chatDescription, setChatDescription] = useState('');
    const [options, setOptions] = useState([]);
    
    useEffect(async () => {
        const { data } = await api.get(`admin/allUsers/${user.church.roomId}/${user.id_user}`)
        
        if(data.err){
            throw new Error(data.err)
        }

        setOptions(data)
    }, [])

    useEffect(async () => {
        await getChats(user?.id_user, user.church.roomId);
    }, [chatName]);

    async function handleAddChat(e){
        e.preventDefault();

        if(chatName.trim().length === 0){
            toast.error('É necessário informar o nome do grupo')
            return;
        }
        if(chatDescription.trim().length === 0){
            toast.error('É necessário informar a descrição do grupo')
            return;
        }
        const status = await insertChat({
            roomId: user.church.roomId,
            name:  chatName,
            description: chatDescription,
            users: [...chatMembers, { idUser: String(user.id_user), name: user.nome }]
        })

        if(status.code === 1){
            toast.success(status.msg)

            // Recebe no ChatContext
            socket.current.emit('addChat', {chatName, churchName: user.church.name,roomId:user.church.roomId}, status.room._id)
            getChats(user.id_user, user.church.roomId)
        } else if(status.code === 2) {
            toast.error(status.msg)
        } else {
            toast.error(status.err)
        }


        
        setChatMembers([])
        setChatName('')
        setChatDescription('')
        setModalNewChatIsOpen(false)
    }
    
    return (
        <Modal
            open={modalNewChatIsOpen}
            onClose={() => setModalNewChatIsOpen(false)}
        >
            <ModalStyles>
                <h1>Crie seu novo grupo</h1>
                
                <form onSubmit={handleAddChat}>
                    <span id='infos'>
                        <label>Nome do Grupo</label>
                        <input
                            type="text"
                            value={chatName}
                            maxLength={25}
                            onChange={e => setChatName(e.target.value)}
                        />
                    </span>
                    <span id='infos'>
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={chatDescription}
                            maxLength={100}
                            onChange={e => setChatDescription(e.target.value)}
                        />
                    </span>

                    <span>
                        {options.length === 0 ? (
                            <p>Não há membros em sua igreja para colocar no chat</p>
                        ):(
                            <>
                                <InputLabel id="demo-multiple-chip-label" style={{color: '#fff'}}>Membros</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    className='personSelection'
                                    multiple
                                    value={chatMembers}
                                    onChange={e => setChatMembers(e.target.value)}
                                    input={<OutlinedInput label="Chip" placeholder='Adicione membros ao grupo' color='primary'/>}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.idUser} label={value.name} color='primary'/>
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option.idUser}
                                            value={option}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    </span>

                    <button type='submit'>Criar</button>
                </form>
            </ModalStyles>
        </Modal>
    )
}