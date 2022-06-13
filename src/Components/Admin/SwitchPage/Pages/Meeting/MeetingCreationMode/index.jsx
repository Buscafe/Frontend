import { useState } from 'react';

import { Button } from 'semantic-ui-react'
import { ThemeProvider } from '@mui/material/styles';
import { Stack, TextField, Alert, Box, Chip, Select, MenuItem, InputLabel, OutlinedInput} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../../../../../../services/api';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";
import { toast } from 'react-toastify';

import { MeetingCreationModeStyles } from './styles.js'

// Setting Select
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
const weekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
];

export function MeetingCreationMode(){
  const { user } = useAuth();
  const { theme, setCurrentPage } = useChurches();
  const [room, setRoom] = useState({meetingName: '', meetingDescription: '', meetingDays: [], time: new Date(), duration: ''})
  const [isLoading, setIsLoading]   = useState(false);


  async function handleAddMeeting(e){
    e.preventDefault();
    try {        
        const { data } = await api.post('/admin/home/meetingsChurch/insert', {
          meetingName: room.meetingName,
          meetingDescription: room.meetingDescription,
          meetingDays: room.meetingDays,
          time: room.time,
          duration: room.duration, 
          roomId: user.church.roomId
        })
        
        if(data.code === 1){
            toast.success(data.msg);
            setIsLoading(false)
        } else{
            setIsLoading(false)
            throw new Error(data.err)
        }
        setCurrentPage('Eventos');
        return data;
    } catch (err) {
        console.error(err)
        setIsLoading(false)
    }
  }

  return (
    <MeetingCreationModeStyles>
      <Alert severity="info">Cadastre os reuniões que ocorrem em seu templo!</Alert>
      <form onSubmit={handleAddMeeting}>
        <ThemeProvider theme={theme}>
          <TextField 
              id="standard-basic" 
              label="Nome da reunião" 
              placeholder="Reunião da Família"
              value={room.meetingName}
              color="primary"
              inputProps={{ maxLength: 25 }}
              variant="standard"
              type="text"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, meetingName: e.target.value}
              })} 
          />
          <TextField 
              id="standard-basic" 
              label="Descrição da reunião" 
              placeholder="Nos reunimos para debates sobre a religião"
              value={room.meetingDescription}
              color="primary"
              inputProps={{ maxLength: 255 }}
              variant="standard"
              type="text"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, meetingDescription: e.target.value}
              })} 
          />

          <InputLabel id="demo-multiple-chip-label">Dias de Reunião</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={room.meetingDays}
            onChange={e => setRoom(prevRoom => {
              return {...prevRoom, meetingDays: e.target.value}
            })}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {weekDays.map((day) => (
              <MenuItem
                key={day}
                value={day}
              >
                {day}
              </MenuItem>
            ))}
          </Select>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Stack spacing={3}>
              <TimePicker
                label="Horário"
                value={room.time}
                onChange={value => setRoom(prevRoom => {
                  return {...prevRoom, time: value}
                })}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <TextField 
              id="standard-basic"
              label="Duração" 
              helperText="Informe a duração total em minutos"
              value={room.duration}
              color="primary"
              variant="standard"
              type="number"
              onChange={e => setRoom(prevRoom => {
                return {...prevRoom, duration: e.target.value}
              })}
          />
        </ThemeProvider>
        <Button 
            type="submit" id="createMeeting" 
            onClick={() => setIsLoading(true)}
            className={isLoading && 'loading'}
            disabled={
              (room.meetingName === '') || 
              (room.time === '')     ||
              (room.duration === '') ? true : false
            }
        >
            Cadastrar Reunião
        </Button>
      </form>
    </MeetingCreationModeStyles>
  )
}