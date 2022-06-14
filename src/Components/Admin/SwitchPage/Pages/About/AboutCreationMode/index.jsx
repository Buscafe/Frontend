import { useState } from 'react';

import { Alert, TextField, Checkbox } from '@mui/material';
import { Button } from 'semantic-ui-react'
import { ThemeProvider } from '@mui/material/styles';

import { api } from '../../../../../../services/api';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";
import { toast } from 'react-toastify';

import validator from 'validator'

import { formatCellphone } from '../../../../../../helper/formatCellphone.js';

import { AboutCreationModeStyles } from './styles.js'

// Setting CheckBox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function AboutCreationMode(){
    const { user, setUser } = useAuth();
    const { theme, churchAbout, setCurrentPage } = useChurches();
    const [room, setRoom] = useState({seats: '', parking: false, accessibility: false, cellphone: '', email: '', facebook: ''})
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    
    async function handleAddAbout(e){
        e.preventDefault();
        setIsLoading(true)
        try {
            const { data } = await api.post('/admin/home/aboutChurch/insert', {
                seats: room.seats,
                parking: room.parking,
                accessibility: room.accessibility,
                cellphone: room.cellphone.length > 0 ? room.cellphone : 'Sem celular',
                email: room.email,
                facebook: room.facebook.length > 0 ? room.facebook : 'Facebook não cadastrado',
                roomId: user.church.roomId
            })
            if(data.code === 1){
                toast.success(data.msg);
                setIsLoading(false)
            } else if(data.code === 2){
                toast.info(data.msg);
                setIsLoading(false)
            }else{
                setIsLoading(false)
                throw new Error(data.err)
            }
            setCurrentPage('Reuniões');
            return data;
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }

    function urlValidate(url) {
        setRoom(prevRoom=>{
            return {...prevRoom, facebook: url}
        })
        if (url === ''){
            setErrorMessage('')
        } else if (validator.isURL(url)) {
            setErrorMessage('Url válida')
        } else {
            setErrorMessage('Url inválida')
        }
    }

    return (
        <>
        {churchAbout.code != 2 ? (
            <Alert severity="info">Informações básicas já foram cadastradas!</Alert>
        ): (
            <AboutCreationModeStyles>
                <Alert severity="info">Cadastre algumas informações básicas sobre seu templo!</Alert>
                <form onSubmit={handleAddAbout}>
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
                            onChange={e => setRoom(prevRoom=>{
                                return {...prevRoom, parking: e.target.checked}
                            })} 
                        />
                        <label>Tem estacionamento próprio?</label>

                        <Checkbox {...label} 
                            color="primary"
                            checked={room.accessibility}
                            onChange={e => setRoom(prevRoom=>{
                                return {...prevRoom, accessibility: e.target.checked}
                            })} 
                        />
                        <label>Comporta Acessibilidade?</label>
                    </div>

                    <TextField 
                        id="standard-basic" 
                        label="Celular" 
                        value={formatCellphone(room.cellphone)}
                        placeholder="(99) 99999-9999"
                        color="primary"
                        type="text"
                        inputProps={{ maxLength: 15 }}
                        variant="standard" 
                        onChange={e => setRoom(prevRoom=>{
                            return {...prevRoom, cellphone: e.target.value}
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
                        onChange={e => urlValidate(e.target.value)}
                    />
                    <span className={errorMessage === 'Url inválida' ? 'notValid' : 'valid' }>
                        {errorMessage}
                    </span>
                        
                    </ThemeProvider>
                    <Button 
                        type="submit" id="createAbout" 
                        className={isLoading && 'loading'}
                        disabled={((room.seats === '') || (room.email === ''))
                        || ((errorMessage === 'Url inválida')) ? true : false}
                    >
                        Cadastrar Informações
                    </Button>
                </form>
            </AboutCreationModeStyles>
        )}
        </>
    )
}