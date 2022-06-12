import { toast } from 'react-toastify';

import { Alert, TextField, Skeleton, Stack } from '@mui/material';
import { Button } from 'semantic-ui-react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BlockPicker } from 'react-color'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { api } from '../../../../../../services/api';

import { AddChurchCreationModeStyles } from './styles.js'
import sign from 'jwt-encode';

export function AddChurchCreationMode(){
  const { user, setUser } = useAuth();
  const { setCurrentPage, setStepCompleted } = useChurches();
  const [room, setRoom] = useState({name: '', description: ''})
  const [isLoading, setIsLoading]   = useState(false);
  const [theme, setTheme] = useState('null');
  const [coords, setCoords] = useState(user.coordinate);
  
  setStepCompleted(0)

  // Setting Theme Color 
  const colorPage = getComputedStyle(document.documentElement)
  .getPropertyValue('--admin-color')
  .trim();
  const [adminColor, setAdminColor] = useState(colorPage);
  
  useEffect(() => {
    setTheme(
      createTheme({
        palette: {
          primary: {
            main: adminColor
          }
        }
      })
    );
  }, [adminColor]);
  
  
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
  async function handleAddRoom(e){
    e.preventDefault();

    try {
      const { data } = await api.post(`/admin/home/church/insert`, {
        name:  room.name,
        description: room.description,
        cpf: '242.798.200-82',
        cnpj: '32.493.091/0001-30',
        users: [{ idUser: String(user.id_user), name: user.nome }],
        idUser: user.id_user,
        username: user.nome,
        coords,
        color: adminColor
      });

      if(data.code === 1){
        setUser({...user, church: data.room });
        localStorage.setItem(
          "Token", 
          sign({...user, church: data.room }, process.env.REACT_APP_SECRET_JWT)
        )
       
        toast.success(data.msg);
        toast.info("O Grupo Geral foi criado na aba SOCIAL");
        setIsLoading(false)
      } else {
        setIsLoading(false)
        throw new Error(data.err)
      }

      setCurrentPage('Sobre');
      setStepCompleted(1)
      return data;
    } catch (err) {
      console.log('oi', err)
      setIsLoading(false)
    }
  }

  function handleChangeColor(color){
    setAdminColor(color.hex)
    document.body.style.setProperty('--admin-color', color.hex);
  }
 
  return isLoaded ? (
    <>
      {user.church ? (
          <Alert severity="info">Seu Templo já foi cadastrado!</Alert>
      ):(
        <AddChurchCreationModeStyles>
          <Alert severity="info">Arraste o marcador para a posição da sua igreja</Alert>

          <GoogleMap
            center={coords}
            zoom={15}
            options={{
              mapId: process.env.REACT_APP_GOOGLE_MAPS_ID
            }}
            mapContainerClassName="containerGoogleMaps"
          >
            {/* Current users position */}
            <Marker 
              position={coords}
              options={{
                label: {
                  text: 'Minha Igreja',
                },
                clickable: true,
                draggable: user.church === null,
              }}
              onDragEnd={(e) => setCoords(() => ({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              }))}
            />
          </GoogleMap>

          <form onSubmit={handleAddRoom}>
            <ThemeProvider theme={theme}>
              <TextField 
                  id="standard-basic" 
                  label="Nome da Instituição" 
                  value={room.name}
                  color="primary"
                  inputProps={{ maxLength: 25 }}
                  variant="standard"
                  type="text"
                  onChange={e => setRoom(prevRoom=>{
                    return {...prevRoom, name: e.target.value}
                  })} 
              />
              <TextField 
                  id="standard-multiline-flexible"
                  multiline
                  inputProps={{ maxLength: 300 }}
                  maxRows="4"
                  label="Descrição" 
                  value={room.description}
                  color="primary"
                  variant="standard"
                  type="text"
                  onChange={e => setRoom(prevRoom => {
                    return {...prevRoom, description: e.target.value}
                  })}
              />
            </ThemeProvider>
            <span>
              <Alert severity="info">Escolha uma cor para a sua igreja</Alert>
              <BlockPicker 
                color={adminColor}
                onChangeComplete={handleChangeColor}
                width={'100%'}
              />
            </span>
            <Button 
                type="submit" id="createChurch" 
                onClick={() => setIsLoading(true)}
                className={isLoading && 'loading'}
                disabled={(room.name === '') || (room.description === '') ? true : false}
            >
                Cadastrar Meu templo
            </Button>
          </form>
        </AddChurchCreationModeStyles>
      )}
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