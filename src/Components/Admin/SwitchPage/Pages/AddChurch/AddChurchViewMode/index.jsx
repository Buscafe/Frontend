import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { AddChurchViewModeStyles } from "./styles"

export function AddChurchViewMode(){
    const { user, setUser } = useAuth();  
    const [coords, setCoords] = useState(user.coordinate);
  
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    })
  
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
                  <div className="info-title">UM POUCO SOBRE "IGREJA EXEMPLO"</div>
                  <div className="info-item">
                      descricao da igreja 
                  </div>
              </div>
            </div>
        </AddChurchViewModeStyles>
        
    ): <h1>Carregando...</h1>
}
