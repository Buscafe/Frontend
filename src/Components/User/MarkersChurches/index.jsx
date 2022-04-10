import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import { useEffect, useState } from "react";
import { useChurches } from "../../../hooks/useChurches";
import { useAuth } from "../../../hooks/useAuth";

import { Container } from "./style";
import { toast } from "react-toastify";


export const MarkersChurches = () => {
    const { getAllChurches, joinChurch, churchesMap } = useChurches();
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

    async function handleJoin(e){
        e.preventDefault();

        try {
            const { code } = await joinChurch(user.id_user, infoWindowChurch.id_corp);

            if(code === 1){
                toast.success(`Filiado a ${infoWindowChurch.corpName} com sucesso`)
            } else if (code === 4) {
                toast.info('Usuário já filiado')
            } else {
                toast.error(`Houve um erro ao filiar-se com à igreja`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const allChurches = churchesMap.map((church) => {
        return (
            <>
                <Marker
                    key={church.id_corp}
                    position={church.coordinate}
                    icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                    options={{
                        label: {
                            text: `${church.corpName}`,
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
                            <p>{infoWindowChurch.corpDesc}</p>
                            <img src="https://potricharquitetura.com/wp-content/uploads/igreja-santa-terezinha.jpg" alt="Imagem da igreja" />
                            <Button variant="contained" onClick={handleJoin}>Filiar</Button>
                        </Container>
                    </InfoWindow>
                )}
            </>
        )
    });

    return allChurches;
}