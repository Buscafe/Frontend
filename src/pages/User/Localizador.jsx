import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export function MapContainer({ google }) {
  return (
    <Map
      google={google}
      containerStyle={{
          position: "static",
          width: "100%",
          height: "100%"
      }}
      style={{
          width: "100%",
          height: "100%"
      }}
      center={{lat: -23.64126257101139, lng: -46.83582709802497}}
      initialCenter={{lat: -23.64126257101139, lng: -46.83582709802497}}
      zoom={18}
      disableDefaultUI={true}
      
    >
      <Marker position={{lat: -23.64126257101139, lng: -46.83582709802497}}/>
    </Map>
  )
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_KEY,
})(MapContainer)

