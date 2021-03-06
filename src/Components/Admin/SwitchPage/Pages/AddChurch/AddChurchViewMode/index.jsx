import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { AddChurchViewModeStyles } from "./styles"
import { Alert, Skeleton, Stack, IconButton} from '@mui/material';
import { EditSharp } from '@mui/icons-material';
import { Button } from 'semantic-ui-react'

import { toast } from 'react-toastify';
import sign from 'jwt-encode';

export function AddChurchViewMode(){
    const { user, setUser } = useAuth();  
    const { church, getChurch, updateChurch, setChurch } = useChurches();
    const [coords, setCoords] = useState(user.coordinate);
    const [isLoading, setIsLoading]   = useState(false);
    const [room, setRoom] = useState({
      name: church.corpName, description: church.corpDesc
    })
    // Modificando steppers
   
    useEffect(async () => {
      await getChurch(user.church ? user.church.id_corp : 0);
    }, [])
    
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
    async function handleUpdateRoom(e){
      e.preventDefault();

      const data = await updateChurch({
        roomId:      user.church.roomId,
        id_doc:      church.tbl_doc.id_doc,
        id_corp:     church.id_corp,
        name:        room.name ? room.name : church.corpName,
        description: room.description ? room.description : church.corpDesc, 
        coords:      coords,
        color:       user.church.color
      })

      if(data.code === 1){
        const updatedChurch = {
          ...church, 
          corpName: room.name ? room.name : church.corpName,
          corpDesc: room.description ? room.description : church.corpDesc
        }

        setUser({...user, church: data.room });
        localStorage.setItem(
          "Token", 
          sign({...user, church: data.room }, process.env.REACT_APP_SECRET_JWT)
        )
        
        setChurch(updatedChurch)
        toast.success(data.msg);
        setIsLoading(false)
      } else {
        setIsLoading(false)
        throw new Error(data.err)
      }
    }

    return isLoaded && church.length != 0 ? (
      <>
        {church.code === 2 ? (
            <Alert severity="info">{church.msg}</Alert>
        ):(
          <AddChurchViewModeStyles>
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
                        draggable: true,
                    }}
                    onDragEnd={(e) => setCoords(() => ({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    }))}
                  />
              </GoogleMap>
              
              <div className="churchInfo-container">
                <div className="info-section">
                    <form onSubmit={handleUpdateRoom}>
                      <div className="info-title"> 
                        <textarea 
                          type="text" 
                          id="corpName"
                          maxLength= "50"
                          value={(room.name) != undefined ? room.name : church.corpName}
                          onChange={e => setRoom(prevRoom=>{
                            return {...prevRoom, name: e.target.value}
                          })} 
                        />
                        <IconButton className='edit-button' onClick={() => document.getElementById('corpName').focus()} size="small">
                            <EditSharp color='primary'/>
                        </IconButton>
                      </div>
                     
                      <div className="info-item">
                        <textarea 
                          type="text" 
                          id="corpDescription"
                          value={(room.description) != undefined ? room.description : church.corpDesc}
                          maxLength= "300"
                          onChange={e => setRoom(prevRoom=>{
                            return {...prevRoom, description: e.target.value}
                          })} 
                        />
                        <IconButton className='edit-button' onClick={() => document.getElementById('corpDescription').focus()} size="small">
                            <EditSharp color='primary'/>
                        </IconButton>
                      </div>
                      <Button 
                          type="submit" id="updateChurch" 
                          onClick={() => setIsLoading(true)}
                          className={isLoading && 'loading'}
                          disabled={
                            ((((room.name ? room.name.toLowerCase() : room.name) === church.corpName.toLowerCase()) 
                            || (room.name === undefined)) &&
                            (((room.description ? room.description.toLowerCase() : room.description) === church.corpDesc.toLowerCase()) 
                            || (room.description === undefined))) ? true : false
                          }
                      >
                          Atualizar Meu templo
                      </Button>
                    </form>
                </div>
              </div>
          </AddChurchViewModeStyles>
        )}    
      </>
    ): (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={120} />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
      </Stack>  
    )
}