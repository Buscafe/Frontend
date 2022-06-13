import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useChurches } from "../../../hooks/useChurches";
import { useAuth } from "../../../hooks/useAuth";

import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import churchImg from '../../../Assets/images/maps-icon.png'

import { Container } from "./style";
import { toast } from "react-toastify";
import { Alert } from '@mui/material'


export const MarkersChurches = ({isAdmin = false}) => {
    const { getAllChurches, joinChurch, churchesMap, relations } = useChurches();
    const { user } = useAuth(); 
    const history = useHistory();
    const [hasAffiliated, setHasAffiliated] = useState(false);
    const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
    const [isLoading, setIsLoading]   = useState(false)
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
        setIsLoading(true)
        try {
            const { code } = await joinChurch(user.id_user, user.nome, infoWindowChurch.id_corp, infoWindowChurch.roomId );

            if(code === 1){
                toast.success(`Filiado a ${infoWindowChurch.corpName} com sucesso`)
                toast.info(`Você entrou no Grupo Geral da Instituição!`)
                setHasAffiliated(true)
                setIsLoading(false)
            } else if (code === 4) {
                toast.info('Usuário já filiado')
                setIsLoading(false)
            } else {
                toast.error(`Houve um erro ao filiar-se com à igreja`)
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
        }
    }
  
    function handleChurch(church){
        history.push({
            pathname: `/User/Igrejas/${church.corpName}`,
            state: { isAdmin, church }
        });
    }
    function handleChurchAdmin(church){
        history.push({
            pathname: `/Admin/Map/${church.corpName}`,
            state: { isAdmin, church }
        });
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
                        {isAdmin ? (
                            <div className="churchDetails">
                                <h1>{infoWindowChurch.corpName}</h1>
                                <p>{infoWindowChurch.corpDesc}</p>
                                <div className="Afilliate">
                                    <Button 
                                        className="btnAfilliate"
                                        variant="contained"
                                        onClick={() => handleChurchAdmin(infoWindowChurch)}
                                    >
                                            Página da igreja
                                    </Button>
                                </div>
                            </div>
                        ):(
                            <>
                                {hasAffiliated ? (
                                    <>
                                        <div className="churchDetails">
                                            <h1>{infoWindowChurch.corpName}</h1>
                                            <p>{infoWindowChurch.corpDesc}</p>
                                            <Alert severity="success">Você está filiado neste templo!</Alert>
                                            <div className="Afilliate">
                                                <Button 
                                                    className="btnAfilliate"
                                                    variant="contained"
                                                    onClick={() => handleChurch(infoWindowChurch)}
                                                >
                                                        Página da igreja
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        <div className="churchDetails">
                                            <h1>{infoWindowChurch.corpName}</h1>
                                            <p>{infoWindowChurch.corpDesc}</p>
                                            <div className="NotAfilliate">
                                                <Button 
                                                    variant="contained" 
                                                    onClick={() => handleChurch(infoWindowChurch)}>Página da igreja
                                                </Button>
                                                <Button 
                                                    variant="contained" 
                                                    onClick={handleJoin}>Filiar
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
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