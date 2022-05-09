import { useEffect, useState } from 'react'
import { Modal, Select, OutlinedInput, Box, Chip, MenuItem, InputLabel } from "@mui/material";

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles } from './style'
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';


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
    const { getChats, insertChat } = useChat();
    const { user } = useAuth();
    const [chatMembers, setChatMembers] = useState([]);
    const [chatName, setChatName] = useState('');
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
            toast.error('É necessário dar nome ao chat')
            return;
        }

        const status = await insertChat({
            roomId: user.church.roomId,
            name:  chatName,
            users: [...chatMembers, { idUser: String(user.id_user), name: user.nome }]
        })

        if(status.code === 1){
            toast.success(status.msg)
        } else if(status.code === 2) {
            toast.error(status.msg)
        } else {
            toast.error(status.err)
        }

        setChatMembers([])
        setChatName('')
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
                            onChange={e => setChatName(e.target.value)}
                        />
                    </span>

                    <span>
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
                    </span>

                    <button type='submit'>Criar</button>
                </form>
            </ModalStyles>
        </Modal>
    )
}