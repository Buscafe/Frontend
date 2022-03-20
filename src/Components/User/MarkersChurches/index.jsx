import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import { useEffect, useState } from "react";
import { useChurches } from "../../../hooks/useChurches";
import { useAuth } from "../../../hooks/useAuth";

import { Container } from "./style";



export const MarkersChurches = () => {
    const { getAllChurches, churches } = useChurches();
    const { user } = useAuth(); 
    const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
    const [infoWindowChurch, setInfoWindowChurch] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(async () => {
        await getAllChurches(user.religiao);
    }, [])

    const handleOpenInfoWindow = (currentChurch) => {
        setInfoWindowChurch(currentChurch)
        setInfoWindowIsOpen(true)
    }

    const allChurches = churches.map((church) => {
        return (
            <>
                <Marker
                    key={church.id_corp}
                    position={church.coordinate}
                    icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                    options={{
                        label: {
                            text: `Igreja ${church.id_corp}`,
                        },
                        clickable: true,
                    }}
                    onClick={() => handleOpenInfoWindow(church)}
                />

                { infoWindowIsOpen && (
                    <InfoWindow
                        onCloseClick={() => setInfoWindowIsOpen(false)}
                        position={infoWindowChurch.coordinate}
                    >
                        <Container>
                            <h1>{infoWindowChurch.corpName}</h1>
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