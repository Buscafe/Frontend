import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api.js';
import { MarkersChurches } from '../MarkersChurches/index.jsx';
import { GoogleMapsStyles } from './styles.js'
import { useAuth } from '../../../hooks/useAuth.js';
import { toast } from 'react-toastify';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

export function Localizador({ clicked }) {
  const { user } = useAuth();
  const [coords, setCoords] = useState(user.coordinate);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

  useEffect(() => {
    if(!user.coordinate){
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

  async function handleUpdateLocation(e){
    try {
      const { data } = await api.post('/user/update/coordinate', {
        id_user: user.id_user,
        coordinate: `${e.latLng.lat()},${e.latLng.lng()}`
      });
  
      if(data.code === 2){
        toast.error('Houve um erro ao atualizar sua localização')
        return;
      }

      setCoords(() => ({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }));
    } catch (err) {
      console.error(err) 
    }
  }

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
          onDragEnd={handleUpdateLocation}
        />
        <MarkersChurches/>
      </GoogleMap>
    </GoogleMapsStyles>
  ) : <h1>Carregando...</h1>
}
