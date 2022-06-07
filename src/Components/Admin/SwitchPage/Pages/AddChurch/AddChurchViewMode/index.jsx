import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { AddChurchViewModeStyles } from "./styles"
import { Alert, Skeleton, Stack } from '@mui/material';

export function AddChurchViewMode(){
    const { user, setUser } = useAuth();  
    const { setStepCompleted, church, getChurch } = useChurches();
    const [coords, setCoords] = useState(user.coordinate);

    setStepCompleted(0)
   
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
                      draggable: false,
                  }}
                  onDragEnd={(e) => setCoords(() => ({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng()
                  }))}
                  />
              </GoogleMap>
              
              <div className="churchInfo-container">
                <div className="info-section">
                        <div className="info-title">UM POUCO SOBRE {church.corpName}</div>
                        <div className="info-item">
                          {church.corpDesc}
                        </div>
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
