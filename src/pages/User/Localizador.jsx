import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GoogleMapsStyles } from './styles.js'

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -23.64126257101139,
  lng: -46.83582709802497
};

export function Localizador() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  })

  return isLoaded ? (
    <GoogleMapsStyles>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        options={{
          mapId: "45eea3ff54ef6a59"
        }}
      >
        <Marker 
          position={{lat: -23.64126257101139, lng: -46.83582709802497}}
          options={{
            label: {
              text: 'Estou aqui',
            },
            clickable: true,
            draggable: true
          }}
        />
        <></>
      </GoogleMap>
    </GoogleMapsStyles>
  ) : <></>
}

// export default React.memo(MyComponent)
