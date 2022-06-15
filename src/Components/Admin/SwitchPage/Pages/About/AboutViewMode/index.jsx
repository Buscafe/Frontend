import { useState, useEffect } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { Button } from 'semantic-ui-react'
import { Alert, Skeleton, Stack, Checkbox, IconButton } from '@mui/material';
import { EditSharp } from '@mui/icons-material';

import { formatCellphone } from '../../../../../../helper/formatCellphone.js'
import validator from 'validator'

import { AboutViewModeStyles } from "./styles"
import { toast } from 'react-toastify';

// Setting CheckBox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function AboutViewMode(){
    const { user } = useAuth();  
    const { churchAbout, getChurchAbout, updateAbout, setChurchAbout } = useChurches();
    const [isLoading, setIsLoading]   = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [room, setRoom] = useState({
        cellphone: churchAbout.cellphone, email: churchAbout.email, link: churchAbout.link,
        seats: churchAbout.seats, parking: churchAbout.parking, accessibility: churchAbout.accessibility
    })  

    useEffect(async () => {
        await getChurchAbout(user.church ? user.church.id_corp : 0);
      }, [])
      
      async function handleUpdateAbout(e){
        e.preventDefault();
        const data = await updateAbout({
          id_info:       churchAbout.id_info,
          seats:         room.seats ? room.seats : churchAbout.seats,
          parking:       room.parking ? room.parking : churchAbout.parking,
          accessibility: room.accessibility ? room.accessibility: churchAbout.accessibility,
          cellphone:    room.cellphone ? room.cellphone : churchAbout.cellphone, 
          email:         room.email ? room.email : churchAbout.email,
          facebook:      room.link ? room.link : churchAbout.link
        })
        
        if(data.code === 1){
            const updatedChurchAbout = {
                ...churchAbout, 
                seats:         room.seats ? room.seats : churchAbout.seats,
                parking:       room.parking,
                accessibility: room.accessibility,
                cellphone:     room.cellphone ? room.cellphone : churchAbout.cellphone, 
                email:         room.email ? room.email : churchAbout.email,
                facebook:      room.link ? room.link : churchAbout.link,
            }
            setChurchAbout(updatedChurchAbout)
            toast.success(data.msg);
            setIsLoading(false)
        } else {
          setIsLoading(false)
          throw new Error(data.err)
        }  
      }

    function urlValidate(url) {
        setRoom(prevRoom=>{
            return {...prevRoom, link: url}
        })
        if (url === ''){
            setErrorMessage('')
        } else if(url === 'Rede Social não cadastrada'){
            setErrorMessage('')
        }else if (validator.isURL(url)) {
            setErrorMessage('Url válida')
        } else {
            setErrorMessage('Url inválida')
        }
    }

    return churchAbout.length != 0 ? (
        <AboutViewModeStyles>
            <div className="about-container">
                {churchAbout.code === 2 ? (
                        <Alert severity="info">{churchAbout.msg}</Alert>
                 ) : (
                        <>
                            <form onSubmit={handleUpdateAbout}>
                                <div className="info-section">
                                    <div className="info-title">CONTATO</div>
                                    <div className="info-item">
                                        <input 
                                            type="text" 
                                            id="cellphone"
                                            value={formatCellphone((room.cellphone) != undefined ? room.cellphone : churchAbout.cellphone)}
                                            maxLength={15}
                                            onChange={e => setRoom(prevRoom=>{
                                                return {...prevRoom, cellphone: e.target.value}
                                            })} 
                                        />
                                        <IconButton onClick={() => document.getElementById('cellphone').focus()} size="small">
                                            <EditSharp color='primary'/>
                                        </IconButton>
                                    </div>
                                    <div className="info-item">
                                        <input 
                                            type="email" 
                                            id="email"
                                            value={(room.email) != undefined ? room.email : churchAbout.email}
                                            onChange={e => setRoom(prevRoom=>{
                                                return {...prevRoom, email: e.target.value}
                                            })} 
                                        />
                                        <IconButton onClick={() => document.getElementById('email').focus()} size="small">
                                            <EditSharp color='primary'/>
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <div className="info-title">REDES SOCIAIS</div>
                                    <div className="info-item">
                                        <input 
                                            type="link" 
                                            id="link"
                                            value={(room.link) != undefined ? room.link : churchAbout.link}
                                            onChange={e => urlValidate(e.target.value)}
                                        />
                                        <span className={errorMessage === 'Url inválida' ? 'notValid' : 'valid' }>
                                            {errorMessage}
                                        </span>   
                                        
                                        <IconButton onClick={() => document.getElementById('link').focus()} size="small">
                                            <EditSharp color='primary'/>
                                        </IconButton>
                                        
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="info-title">INFORMAÇÕES DO TEMPLO</div>
                                    <div className="info-item">
                                        Número de assentos: 
                                        <strong>
                                        <input 
                                            type="number" 
                                            id="seats"
                                            value={(room.seats) != undefined ? room.seats : churchAbout.seats}
                                            onChange={e => setRoom(prevRoom=>{
                                                return {...prevRoom, seats: e.target.value}
                                            })} 
                                        />
                                        <IconButton onClick={() => document.getElementById('seats').focus()} size="small">
                                            <EditSharp color='primary'/>
                                        </IconButton>
                                        </strong>
                                    </div>

                                    <div className="info-item">
                                        <Checkbox {...label} 
                                            color="primary"
                                            checked={(room.parking) != undefined ? room.parking : churchAbout.parking}
                                            onChange={e => setRoom(prevRoom=>{
                                                return {...prevRoom, parking: e.target.checked}
                                            })} 
                                        />
                                        <label>Tem estacionamento próprio?</label>
                                    </div>

                                    <div className="info-item">
                                        <Checkbox {...label} 
                                            color="primary"
                                            checked={(room.accessibility) != undefined ? room.accessibility : churchAbout.accessibility}
                                            onChange={e => setRoom(prevRoom=>{
                                                return {...prevRoom, accessibility: e.target.checked}
                                            })} 
                                        />
                                        <label>Comporta Acessibilidade?</label>
                                    </div>
                                    <Button 
                                        type="submit" id="updateAbout" 
                                        onClick={() => setIsLoading(true)}
                                        className={isLoading && 'loading'}

                                        disabled={
                                            ((room.cellphone === churchAbout.cellphone) || (room.cellphone === undefined)) &&
                                            (((room.email ? room.email.toLowerCase() : room.email) === churchAbout.email.toLowerCase()) || (room.email === undefined)) &&
                                            (((room.link ? room.link.toLowerCase() : room.link) === churchAbout.link.toLowerCase()) || (room.link === undefined)) &&
                                            ((room.seats === churchAbout.seats) || (room.seats === undefined)) &&
                                            ((room.parking === churchAbout.parking) || (room.parking === undefined)) &&
                                            ((room.accessibility === churchAbout.accessibility) || (room.accessibility === undefined)) 
                                            || ((errorMessage === 'Url inválida') || (room.link.length === 0))                                          
                                             ? true : false                
                                        }
                                    >
                                        Atualizar Sobre
                                    </Button>
                                </div>
                            </form>
                        </>
                )}
            </div>
        </AboutViewModeStyles>
    ): (
        <Stack spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </Stack>  
    )
}
