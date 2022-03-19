import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import { useState } from "react";


import { Container } from "./style";

const coordsArr = [
    {lat: -23.689010614630288, lng: -46.85289204945984},
    {lat: -23.68977694840398, lng: -46.85468912949982},
    {lat: -23.691221180599513, lng: -46.853514321951295},
    {lat: -23.68814602753812, lng: -46.85419023862305}
];

export const MarkersChurches = () => {
    const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
    const [infoWindowCoords, setInfoWindowCoords] = useState({
        lat: 0,
        lng: 0
    });

    const handleOpenInfoWindow = (currentCoords) => {
        setInfoWindowCoords(currentCoords)
        setInfoWindowIsOpen(true)
    }

    const allChurches =  coordsArr.map((coord, index) => {
        return (
            <>
                <Marker
                    key={index + 1}
                    position={coord}
                    icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                    options={{
                        label: {
                            text: `Igreja ${index + 1}`,
                        },
                        clickable: true,
                    }}
                    onClick={() => handleOpenInfoWindow(coord)}
                />

                { infoWindowIsOpen && (
                    <InfoWindow
                        onCloseClick={() => setInfoWindowIsOpen(false)}
                        position={infoWindowCoords}
                    >
                        <Container>
                            <h1>Nome igreja</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim inventore beatae, rerum illum minus? Culpa consequuntur</p>
                            <img src="https://potricharquitetura.com/wp-content/uploads/igreja-santa-terezinha.jpg" alt="Imagem da igreja" />
                            <Button variant="contained">Filiar</Button>
                        </Container>
                    </InfoWindow>
                )}
            </>
        )
    });

    return allChurches;
}