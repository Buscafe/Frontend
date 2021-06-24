let map, infoWindow;

function initMap(){
   //Criando o objeto MAPS
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -23.64126257101139, lng: -46.83582709802497},
        zoom: 18,
        mapId: '45eea3ff54ef6a59',
      });
      
      //Marker ETEC EMBU
      new google.maps.Marker({
        position: { lat: -23.64126257101139, lng: -46.83582709802497 },
        map,
        title: "ETEC EMBU",
      });

      //Localização do Usuário
      infoWindow = new google.maps.InfoWindow();
      const locationButton = document.createElement("button");
      locationButton.textContent = "Ir para Localização Atual";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

      // Localização ETEC EMBU
      //-23.64126257101139, -46.83582709802497

      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Localização Encontrada");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
}

//Erro de localização
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: O serviço de Geolocalização falhou."
      : "Error: O seu navegador não suporta o serviço de Geolocalização."
  );
  infoWindow.open(map);
}