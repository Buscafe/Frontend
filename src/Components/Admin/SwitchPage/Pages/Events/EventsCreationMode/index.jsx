import { toast } from 'react-toastify';


import { Alert, TextField, Skeleton, Stack} from '@mui/material';
import { Button } from 'semantic-ui-react'
import { ThemeProvider } from '@mui/material/styles';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../../../../../../services/api';

import { EventsCreationModeStyles } from './styles.js'

export function EventsCreationMode(){
  const { user, setUser } = useAuth();
  const { theme, setCurrentPage, setStepCompleted } = useChurches();
  const [room, setRoom] = useState({title: '', event_desc: '', event_duration: '', event_date: null})
  const [isLoading, setIsLoading]   = useState(false);
  const [coords, setCoords] = useState(user.coordinate);
  
  setStepCompleted(3)

  useEffect(() => {
    if(!user.coordinate.lat || !user.coordinate.lng){
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(() => ({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }))
      });
    } else {
      setCoords(user.coordinate)
    }
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

  async function handleAddConvertion(e){
    e.preventDefault();

    try {
      const { data } = await api.post(`/admin/home/events/insert`, {
        title:      room.title,
        event_desc: room.event_desc,
        event_duration: room.event_duration,
        event_date: room.event_date,
        FK_id_corp: user.church.id_corp,
        coords,
      });

      if(data.code === 1){
        toast.success(data.msg);
        setIsLoading(false)
      } else {
        setIsLoading(false)
        throw new Error(data.err)
      }

      setCurrentPage('Doações');
      setStepCompleted(4)
      return data;
    } catch (err) {
      setIsLoading(false)
    }
  }
 
  return isLoaded ? (
    <>
        <EventsCreationModeStyles>
          <Alert severity="info">Arraste o marcador para a posição de um evento</Alert>

          <GoogleMap
            center={coords}
            zoom={15}
            options={{
              mapId: process.env.REACT_APP_GOOGLE_MAPS_ID
            }}
            mapContainerClassName="containerGoogleMaps"
          >
            <Marker 
              position={coords}
              options={{
                label: {
                  text: 'Novo evento',
                },
                clickable: true,
                draggable: true,
              }}
              onDragEnd={(e) => setCoords(() => ({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              }))}
            />
          </GoogleMap>

          <form onSubmit={handleAddConvertion}>
            <ThemeProvider theme={theme}>
              <TextField 
                  id="standard-basic" 
                  label="Nome do Evento" 
                  value={room.title}
                  color="primary"
                  inputProps={{ maxLength: 50 }}
                  variant="standard"
                  type="text"
                  onChange={e => setRoom(prevRoom=>{
                    return {...prevRoom, title: e.target.value}
                  })} 
              />
              <TextField 
                  id="standard-multiline-flexible"
                  multiline
                  inputProps={{ maxLength: 300 }}
                  maxRows="4"
                  label="Descrição" 
                  value={room.event_desc}
                  color="primary"
                  variant="standard"
                  type="text"
                  onChange={e => setRoom(prevRoom => {
                    return {...prevRoom, event_desc: e.target.value}
                  })}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <Stack spacing={3}>
                      <DateTimePicker
                          label="Dia e Horário do Evento"
                          value={room.event_date}
                          onChange={value => setRoom(prevRoom => {
                            return {...prevRoom, event_date: value}
                          })}
                          renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
              <TextField 
                id="standard-basic"
                label="Duração" 
                helperText="Informe a duração total em minutos"
                value={room.event_duration}
                color="primary"
                variant="standard"
                type="number"
                onChange={e => setRoom(prevRoom => {
                  return {...prevRoom, event_duration: e.target.value}
                })}
              />
            </ThemeProvider>
             
            <Button 
                type="submit" id="createChurch" 
                onClick={() => setIsLoading(true)}
                className={isLoading && 'loading'}
                disabled={(room.title === '') || (room.event_desc === '') ? true : false}
            >
                Cadastrar Novo Evento
            </Button>
          </form>
        </EventsCreationModeStyles>
    </>
  ) : (
    <Stack spacing={1}>
        <Skeleton variant="rectangular" height={120} />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
    </Stack>  
  )
}