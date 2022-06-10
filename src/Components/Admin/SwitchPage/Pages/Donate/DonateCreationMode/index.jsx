import { useState } from 'react';

import { Button } from 'semantic-ui-react'
import { Alert, TextField, Radio, RadioGroup, FormControlLabel} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { api } from '../../../../../../services/api';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";
import { toast } from 'react-toastify';

import { formatCPF } from '../../../../../../helper/formatCPF.js';
import { formatCNPJ } from '../../../../../../helper/formatCNPJ.js';
import { formatCellphone } from '../../../../../../helper/formatCellphone.js'

import { DonateCreationModeStyles } from './styles.js'

export function DonateCreationMode(){
  const { user, setUser } = useAuth();
  const { theme, setStepCompleted } = useChurches();
  const [room, setRoom] = useState({pixKey: ''})
  const [isLoading, setIsLoading]   = useState(false);
  const [transferType, setTransferType]   = useState('CPF');

  setStepCompleted(4)

  async function handleAddDonate(e){
    e.preventDefault();

    try {
        const { data } = await api.post('/admin/home/donateChurch/insert', {
            keyType: transferType.replace(' ', '_').replace('ó', 'o'),
            keyValue: room.pixKey,
            roomId: user.church.roomId,
        })
        
        if(data.code === 1){
            toast.success(data.msg);
            setIsLoading(false)
        }  if(data.code === 2){
            toast.info(data.msg);
            setIsLoading(false)
        } else{
            setIsLoading(false)
            throw new Error(data.err)
        }
        setStepCompleted(5)
        return data;
    } catch (err) {
        console.error(err)
        setIsLoading(false)
    }
  }

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
          <form onSubmit={handleAddDonate}>
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
                value={formatCellphone(room.pixKey)}
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
                type="text"
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