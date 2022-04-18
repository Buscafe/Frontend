import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../../hooks/useAuth";
import { useChurches } from "../../../hooks/useChurches";

import Church from '../../../Assets/images/maps-icon.png'
import { Container } from "./style";
import { maxHeight } from "@mui/system";


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
                    icon={{
                        url: Church,
                        fillColor: '#fff'
                    }}
                    options={{
                        label: {
                            text: `${church.corpName}`,
                            className: 'churchMaps'
                        },
                        clickable: true,
                    }}
                    title={church.corpName}
                    onClick={() => handleOpenInfoWindow(church)}
                />

                { infoWindowIsOpen && (
                    <InfoWindow
                        onCloseClick={() => setInfoWindowIsOpen(false)}
                        position={infoWindowChurch.coordinate}
                        options={{
                            maxWidth: 500
                        }}
                    >
                        <Container>
                            <h1>{infoWindowChurch.corpName}</h1>
                            <p>{infoWindowChurch.corpDesc}</p>
                            <img src="https://potricharquitetura.com/wp-content/uploads/igreja-santa-terezinha.jpg" alt="Imagem da igreja" />

                            <div>
                                <Button variant="contained" onClick={handleJoin}>Filiar</Button>
                                <a href="/">Visualize no Google Maps</a>
                            </div>
                        </Container>
                    </InfoWindow>
                )}
            </>
        )
    });

    return allChurches;
}