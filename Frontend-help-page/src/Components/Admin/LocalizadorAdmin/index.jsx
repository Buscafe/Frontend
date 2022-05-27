import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react';

import { MapsAdminStyles } from './style'

export function LocalizadorAdmin(){
    const [coords, setCoords] = useState({
        lat: -23.7433,
        lng: -46.8523
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    })

    return isLoaded ? (
        <MapsAdminStyles>
            <GoogleMap
                center={coords}
                zoom={11}
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
                            text: 'Estou aqui',
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
        </MapsAdminStyles>
    ) : <h1>Carregando...</h1>
}