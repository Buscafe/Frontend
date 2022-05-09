import { useEffect, useState } from 'react'
import { Modal, Select, OutlinedInput, Box, Chip, MenuItem, InputLabel, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import { toast } from 'react-toastify';
import { LetterAvatar } from '../../../LetterAvatar';

import { useChat } from '../../../../hooks/useChat';
import { useAuth } from '../../../../hooks/useAuth';

import { ModalStyles, Members } from './style'


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

export function ModalChat({ modalChatIsOpen, setModalChatIsOpen }){
    const { getChats, insertChat, options, currentChat } = useChat();
    const { user } = useAuth();
    const [chatMembers, setChatMembers] = useState([]);
    const [chatName, setChatName] = useState(currentChat.name);

    useEffect(async () => {
        await getChats(user?.id_user, user.church.roomId);
    }, [chatName]);

    async function handleAddChat(e){
        e.preventDefault();

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
        setModalChatIsOpen(false)
    }

    const usersNames = currentChat.users?.map(user => user.name)

    return (
        <Modal
            open={modalChatIsOpen}
            onClose={() => setModalChatIsOpen(false)}
        >
            <ModalStyles>
                <header>
                    <h1>{currentChat.name}</h1>

                    <div>
                        <h3>{currentChat.users?.length} participante(s)</h3>
                        <h3>
                            { new Date(currentChat.createdAt).toLocaleDateString("pt-BR", {
                                day: '2-digit', month: 'long', year: 'numeric'
                            }) }
                        </h3>
                    </div>
                </header>
                
                <form onSubmit={handleAddChat}>
                    <label>Membros</label>
                    <Members>   
                        {usersNames?.map(username => {
                            return (
                                <div id='member'>
                                    <LetterAvatar name={username}/>
                                    <p>{username}</p>
                                    <IconButton aria-label="delete" size="small" color="error">
                                        <DeleteIcon color="error"/>
                                    </IconButton>
                                </div>
                            )
                        })} 
                    </Members>

                    <span id='infos'>
                        <label>Mudar nome</label>
                        <input
                            type="text"
                            value={chatName}
                            onChange={e => setChatName(e.target.value)}
                            placeholder={currentChat.name}
                        />
                    </span>

                    <span>
                        <InputLabel id="demo-multiple-chip-label" style={{color: '#fff'}}>Adicionar Membros</InputLabel>
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

                    <button type='submit'>Atualizar Grupo</button>
                </form>
            </ModalStyles>
        </Modal>
    )
}