import { useState } from 'react';

import { Button } from 'semantic-ui-react'
import { FormControl, InputLabel, TextField, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Select, MenuItem } from '@mui/material';

import { DonateStyles } from './styles.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3B72B',
    },
  },
});

export function Donate(){
  const [room, setRoom] = useState(
    {pixKey: '', accountName: '', accountType: '', agency: '', account: '', cardHolderName: '', cnpj: ''})
  const [isLoading, setIsLoading]   = useState(false);
  const [transferType, setTransferType]   = useState('Pix');

  return (
    <DonateStyles>
      <FormLabel id="demo-row-radio-buttons-group-label">Tipo de transferência</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={transferType}
        onChange={e => setTransferType(e.target.value)} 
      >
        <FormControlLabel 
          value="Pix" 
          control={<Radio />} 
          label="Pix" 
        />
        <FormControlLabel 
          value="Doc/Tec"
          control={<Radio />} 
          label="Doc/Tec" 
        />
      </RadioGroup>

      {transferType === "Pix" ? (
        <form>
          <TextField 
              id="standard-basic" 
              label="Chave" 
              placeholder="999-999-999-99"
              value={room.pixKey}
              color="primary"
              inputProps={{ maxLength: 14 }}
              variant="standard"
              type="number"
              onChange={e => setRoom(prevRoom=>{
                return {...prevRoom, pixKey: e.target.value}
              })} 
          />
          <Button 
            type="submit" id="createDonate" 
            onClick={() => setIsLoading(true)}
            className={isLoading && 'loading'}
            disabled={
              (room.pixKey === '') ? true : false
            }
          >
            Cadastrar Culto
          </Button>
        </form>
      ): (
        <form>
          <ThemeProvider theme={theme}>
            <TextField 
                id="standard-basic" 
                label="Nome da Conta" 
                placeholder="Caixa Econômica Federal"
                value={room.accountName}
                color="primary"
                inputProps={{ maxLength: 25 }}
                variant="standard"
                type="text"
                onChange={e => setRoom(prevRoom=>{
                  return {...prevRoom, accountName: e.target.value}
                })} 
            />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-select-small">Tipo de Conta</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo de Conta"
                value={room.accountType}
                autoWidth
                onChange={e => setRoom(prevRoom=>{
                  return {...prevRoom, accountType: e.target.value}
                })} 
              >
                <MenuItem value="Corrente">Conta Corrente</MenuItem>
                <MenuItem value="Poupança">Conta Poupança</MenuItem>
              </Select>
            </FormControl>

            <TextField 
                id="standard-basic"
                label="Agência" 
                value={room.agency}
                color="primary"
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                onChange={e => setRoom(prevRoom => {
                  return {...prevRoom, agency: e.target.value}
                })}
            />
            <TextField 
                id="standard-basic"
                label="Conta" 
                value={room.account}
                color="primary"
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                onChange={e => setRoom(prevRoom => {
                  return {...prevRoom, account: e.target.value}
                })}
            />
            <TextField 
                id="standard-basic"
                label="Nome do Titular" 
                value={room.cardHolderName}
                color="primary"
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                onChange={e => setRoom(prevRoom => {
                  return {...prevRoom, cardHolderName: e.target.value}
                })}
            />
            <TextField 
                id="standard-basic"
                label="CNPJ"
                value={room.cnpj}
                color="primary"
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                onChange={e => setRoom(prevRoom => {
                  return {...prevRoom, cnpj: e.target.value}
                })}
            />
          </ThemeProvider>
          <Button 
              type="submit" id="createDonate" 
              onClick={() => setIsLoading(true)}
              className={isLoading && 'loading'}
              disabled={
                (room.accountName === '')    || 
                (room.accountType === '')    ||
                (room.agency === '')         ||
                (room.account === '')        ||
                (room.cardHolderName === '') ||
                (room.cnpj === '') ? true : false
              }
          >
              Cadastrar Culto
          </Button>
        </form>
      )}
    </DonateStyles>
  )
}