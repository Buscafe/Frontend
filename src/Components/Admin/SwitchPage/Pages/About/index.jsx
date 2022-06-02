import { useState } from 'react';

import { Checkbox } from '@mui/material';
import { Button } from 'semantic-ui-react'
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AboutStyles } from './styles.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3B72B',
    },
  },
});

// Setting CheckBox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export function About(){
  const [room, setRoom] = useState({seats: '', parking: false, accessibility: false, smartphone: '', email: '', facebook: ''})
  const [isLoading, setIsLoading] = useState(false);
  
  const handleParkingChange = (e) => {
    setRoom(prevRoom=>{
      return {...prevRoom, parking: e.target.checked}
    }) 
  }
  const handleAccessibilityChange = (e) => {
    setRoom(prevRoom=>{
      return {...prevRoom, accessibility: e.target.checked}
    }) 
  }
  return (
      <AboutStyles>
          <form>
            <ThemeProvider theme={theme}>
              <div>
                <TextField 
                    id="standard-basic" 
                    label="Quantidade de assentos" 
                    value={room.seats}
                    color="primary"
                    type="number"
                    inputProps={{ min: 0 }}
                    variant="standard" 
                    onChange={e => setRoom(prevRoom=>{
                      return {...prevRoom, seats: e.target.value}
                    })} 
                />

                <Checkbox {...label} 
                  color="primary"
                  checked={room.parking}
                  onChange={handleParkingChange}
                />
                <label>Tem estacionamento próprio?</label>

                <Checkbox {...label} 
                  color="primary"
                  checked={room.accessibility}
                  onChange={handleAccessibilityChange}
                />
                <label>Comporta Acessibilidade?</label>
              </div>

              <TextField 
                  id="standard-basic" 
                  label="Celular" 
                  value={room.smartphone}
                  placeholder="(99) 99999-9999"
                  color="primary"
                  type="text"
                  inputProps={{ maxLength: 15 }}
                  variant="standard" 
                  onChange={e => setRoom(prevRoom=>{
                    return {...prevRoom, smartphone: e.target.value}
                  })} 
              />
              <TextField 
                  id="standard-basic" 
                  label="Email" 
                  value={room.email}
                  placeholder="exemplo@exemplo.com"
                  color="primary"
                  type="email"
                  variant="standard" 
                  onChange={e => setRoom(prevRoom=>{
                    return {...prevRoom, email: e.target.value}
                  })} 
              />
              <TextField 
                  id="standard-basic" 
                  label="Página do Facebook" 
                  value={room.facebook}
                  placeholder="Copie e cole o endereço da página"
                  color="primary"
                  type="url"
                  variant="standard" 
                  onChange={e => setRoom(prevRoom=>{
                    return {...prevRoom, facebook: e.target.value}
                  })} 
              />
            </ThemeProvider>
            <Button 
                type="submit" id="createAbout" 
                onClick={() => setIsLoading(true)}
                className={isLoading && 'loading'}
                disabled={(room.seats === '') || (room.email === '') ? true : false}
            >
                Criar
            </Button>
          </form>
      </AboutStyles>
  )
}