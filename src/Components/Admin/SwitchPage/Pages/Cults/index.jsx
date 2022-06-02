import { useState } from 'react';

import { Button } from 'semantic-ui-react'
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Box, Chip, Select, MenuItem, InputLabel, OutlinedInput} from '@mui/material';

import { CultsStyles } from './styles.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3B72B',
    },
  },
});

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
export function Cults(){
  const [room, setRoom] = useState({cultName: '', cultDays: [], time: '', duration: ''})
  const [isLoading, setIsLoading]   = useState(false);

  return (
    <CultsStyles>
      <form>
        <ThemeProvider theme={theme}>
          <TextField 
              id="standard-basic" 
              label="Nome do culto" 
              placeholder="Culto da Família"
              value={room.cultName}
              color="primary"
              inputProps={{ maxLength: 25 }}
              variant="standard"
              type="text"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, cultName: e.target.value}
              })} 
          />

          <InputLabel id="demo-multiple-chip-label">Dias de Culto</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={room.cultDays}
            onChange={e => setRoom(prevRoom => {
              return {...prevRoom, cultDays: e.target.value}
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
          <TextField 
              id="standard-basic"
              label="Horário" 
              value={room.time}
              color="primary"
              variant="standard"
              type="text"
              onChange={e => setRoom(prevRoom => {
                return {...prevRoom, time: e.target.value}
              })}
          />
          <TextField 
              id="standard-basic"
              label="Duração" 
              value={room.duration}
              color="primary"
              variant="standard"
              type="text"
              onChange={e => setRoom(prevRoom => {
                return {...prevRoom, duration: e.target.value}
              })}
          />
        </ThemeProvider>
        <Button 
            type="submit" id="createCults" 
            onClick={() => setIsLoading(true)}
            className={isLoading && 'loading'}
            disabled={
              (room.cultName === '') || 
              (room.time === '')     ||
              (room.duration === '') ? true : false
            }
        >
            Cadastrar Culto
        </Button>
      </form>
    </CultsStyles>
  )
}