import { useState } from 'react';

import { Button } from 'semantic-ui-react'
import { Alert, TextField, FormLabel, Radio, RadioGroup, FormControlLabel} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DonateCreationModeStyles } from './styles.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3B72B',
    },
  },
});

export function DonateCreationMode(){
  const [room, setRoom] = useState({pixKey: ''})
  const [isLoading, setIsLoading]   = useState(false);
  const [transferType, setTransferType]   = useState('CPF ou CNPJ');

  return (
    <DonateCreationModeStyles>
        <Alert severity="info">Cadastre os meios de oferta PIX que sua igreja dispõe!</Alert>
        
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={transferType}
          onChange={e => setTransferType(e.target.value)} 
        >
            <FormControlLabel 
              value="CPF ou CNPJ" 
              control={<Radio />} 
              label="CPF ou CNPJ" 
            />
            <FormControlLabel 
              value="email"
              control={<Radio />} 
              label="email" 
            />
            <FormControlLabel 
              value="celular" 
              control={<Radio />} 
              label="celular" 
            />
            <FormControlLabel 
              value="chave aleatória"
              control={<Radio />} 
              label="chave aleatória" 
            />
        </RadioGroup>

        <form>
          {transferType === "CPF ou CNPJ" ? (
            <TextField 
                id="standard-basic" 
                label="Chave" 
                placeholder="999.999.999-99"
                helperText="Por favor digite apenas os números"
                value={room.pixKey}
                color="primary"
                inputProps={{ maxLength: 14 }}
                variant="standard"
                type="number"
                onChange={e => setRoom(prevRoom=>{
                  return {...prevRoom, pixKey: e.target.value}
                })} 
            />
          ): transferType === "email" ? (
            <TextField 
              id="standard-basic" 
              label="Chave" 
              placeholder="exemplo@exemplo@gmail.com"
              value={room.pixKey}
              color="primary"
              inputProps={{ maxLength: 50 }}
              variant="standard"
              type="email"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, pixKey: e.target.value}
              })} 
            />
          ): transferType === "celular" ? (
            <TextField 
              id="standard-basic" 
              label="Chave" 
              placeholder="99 99999-9999"
              helperText="Por favor digite apenas os números"
              value={room.pixKey}
              color="primary"
              inputProps={{ maxLength: 11 }}
              variant="standard"
              type="number"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, pixKey: e.target.value}
              })} 
            />
          ): (
            <TextField 
              id="standard-basic" 
              label="Chave" 
              placeholder="Copie e cole uma chave aleatória"
              value={room.pixKey}
              color="primary"
              inputProps={{ maxLength: 32 }}
              variant="standard"
              type="number"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, pixKey: e.target.value}
              })} 
            />
          )}

          <Button 
            type="submit" id="createDonate" 
            onClick={() => setIsLoading(true)}
            className={isLoading && 'loading'}
            disabled={
              (room.pixKey === '') ? true : false
            }
          >
            Cadastrar Meio de Oferta
          </Button>
        </form>
    </DonateCreationModeStyles>
  )
}