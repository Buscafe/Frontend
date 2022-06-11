import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import { useEffect, useState } from "react";
import { useChurches } from "../../../hooks/useChurches";
import { useAuth } from "../../../hooks/useAuth";
import churchImg from '../../../Assets/images/maps-icon.png'

import { Container } from "./style";
import { toast } from "react-toastify";


export const MarkersChurches = () => {
    const { getAllChurches, joinChurch, churchesMap, relations } = useChurches();
    const { user } = useAuth(); 
    const [hasAffiliated, setHasAffiliated] = useState(false);
    const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
    const [infoWindowChurch, setInfoWindowChurch] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(async () => {
        await getAllChurches(user.id_user, user.religiao);
    }, [])

    const handleOpenInfoWindow = async(currentChurch) => {
        setHasAffiliated(relations.filter(relation => relation.FK_id_corp == currentChurch.id_corp).length > 0)
        setInfoWindowChurch(currentChurch)
        setInfoWindowIsOpen(true)
    }

    async function handleJoin(e){
        e.preventDefault();

        try {
            const { code } = await joinChurch(user.id_user, user.nome, infoWindowChurch.id_corp, infoWindowChurch.roomId );

            if(code === 1){
                toast.success(`Filiado a ${infoWindowChurch.corpName} com sucesso`)
                toast.success(`Você entrou no Grupo Geral da Instituição!`)
                setHasAffiliated(true)
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
                    icon={churchImg}
                    options={{ clickable: true }}
                    title={`${church.corpName}`}
                    onClick={() => handleOpenInfoWindow(church)}
                />

                { infoWindowIsOpen && (
                    <InfoWindow
                        onCloseClick={() => setInfoWindowIsOpen(false)}
                        position={infoWindowChurch.coordinate}
                    >
                        <Container>
                        {hasAffiliated ? (
                            <>
                                <div className="churchDetails">
                                    <h1>{infoWindowChurch.corpName}</h1>
                                    <p>{infoWindowChurch.corpDesc}</p>
                                    <div className="buttons">
                                        <Button 
                                            variant="contained"
                                        >
                                                Página da igreja
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                        >
                                                Ver no google maps
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ):(
                            <>
                                <h1>{infoWindowChurch.corpName}</h1>
                                <p>{infoWindowChurch.corpDesc}</p>
                                <img src="https://potricharquitetura.com/wp-content/uploads/igreja-santa-terezinha.jpg" alt="Imagem da igreja" />
                                <Button variant="contained" onClick={handleJoin}>Filiar</Button>
                            </>
                        )}
                        </Container>
                    </InfoWindow>
                )}
            </>
        )
    });

    return allChurches;
}