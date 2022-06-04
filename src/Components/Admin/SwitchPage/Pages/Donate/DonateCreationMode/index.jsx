import { useState } from 'react';

import { Button } from 'semantic-ui-react'
import { Alert, TextField, Radio, RadioGroup, FormControlLabel} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { formatCPF } from './formatCPF.jsx';
import { formatCNPJ } from './formatCNPJ.jsx';
import { formatSmartPhone } from './formatSmartPhone.jsx'

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

  console.log(room.pixKey)

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
              value="CPF" 
              control={<Radio />} 
              label="CPF" 
            />
            <FormControlLabel 
              value="CNPJ" 
              control={<Radio />} 
              label="CNPJ" 
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

        <ThemeProvider theme={theme}>
          <form>
            {transferType === "CPF" ? (
              <TextField 
                  id="standard-basic" 
                  label="Chave" 
                  placeholder="999.999.999-99"
                  helperText="Por favor digite apenas os números"
                  value={formatCPF(room.pixKey)}
                  color="primary"
                  inputProps={{ maxLength: 14 }}
                  variant="standard"
                  type="text"
                  onChange={e => setRoom(prevRoom=>{
                    return {...prevRoom, pixKey: e.target.value}
                  })} 
              />
            ): transferType === "CNPJ" ? (
              <TextField 
                  id="standard-basic" 
                  label="Chave" 
                  placeholder="XX.XXX.XXX/0001-XX"
                  helperText="Por favor digite apenas os números"
                  value={formatCNPJ(room.pixKey)}
                  color="primary"
                  inputProps={{ maxLength: 18 }}
                  variant="standard"
                  type="text"
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
                placeholder="(99) 99999-9999"
                helperText="Por favor digite apenas os números"
                value={formatSmartPhone(room.pixKey)}
                color="primary"
                inputProps={{ maxLength: 15 }}
                variant="standard"
                type="text"
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
                (room.pixKey.length < 5) ? true : false
              }
            >
              Cadastrar Meio de Oferta
            </Button>
          </form>
        </ThemeProvider>
    </DonateCreationModeStyles>
  )
}