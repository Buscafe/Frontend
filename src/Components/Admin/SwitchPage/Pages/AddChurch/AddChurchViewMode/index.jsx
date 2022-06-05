import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { AddChurchViewModeStyles } from "./styles"
import { Alert } from '@mui/material';

export function AddChurchViewMode(){
    const { user, setUser } = useAuth();  
    const { church, getChurch } = useChurches();
    const [coords, setCoords] = useState(user.coordinate);
   
    useEffect(async () => {
      await getChurch(user.church.id_corp);
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
    console.log(church)
    return isLoaded ? (
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
                    draggable: user.church === null,
                }}
                onDragEnd={(e) => setCoords(() => ({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                }))}
                />
            </GoogleMap>
            
            <div className="churchInfo-container">
              <div className="info-section">
                  {church.code === 2 ? (
                    <Alert severity="info">{church}</Alert>
                  ) : (
                    <>
                      <div className="info-title">UM POUCO SOBRE {church.corpName}</div>
                      <div className="info-item">
                        {church.corpDesc}
                      </div>
                    </>
                  )}

              </div>
            </div>
        </AddChurchViewModeStyles>
        
    ): <h1>Carregando...</h1>
}
