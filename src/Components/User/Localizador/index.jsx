import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { MarkersChurches } from '../MarkersChurches/index.jsx';
import { GoogleMapsStyles } from './styles.js'

const containerStyle = {
  width: '100%',
  height: '100vh'
};

export function Localizador({ clicked }) {
  const [coords, setCoords] = useState({
    lat: -23.64126257101139,
    lng: -46.83582709802497
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(() => ({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }))
    });
  }, [])

  return isLoaded ? (
    <GoogleMapsStyles marginLeft={clicked ? 9 : 20}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords}
        zoom={18}
        options={{
          mapId: process.env.REACT_APP_GOOGLE_MAPS_ID
        }}
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
        <MarkersChurches/>
      </GoogleMap>
    </GoogleMapsStyles>
  ) : <h1>Carregando...</h1>
}
