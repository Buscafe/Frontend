import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useChurches } from "../../../hooks/useChurches";
import { useAuth } from "../../../hooks/useAuth";

import { Button } from "@mui/material";
import { Marker, InfoWindow } from "@react-google-maps/api"
import eventImg from '../../../Assets/images/eventMap.png'

import { Container } from "./style";


export const MarkersEvents = ({isAdmin = false}) => {
    const { getAllEvents, eventsMap, churchesMap } = useChurches();
    const { user } = useAuth(); 
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
    const [infoWindowChurchEvent, setInfoWindowChurchEvent] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(async () => {
        await getAllEvents(user.id_user, user.religiao);
    }, [])

    const handleOpenInfoWindow = async(currentEvent) => {
        setInfoWindowChurchEvent(currentEvent)
        setInfoWindowIsOpen(true)
    }

    function handleEvent(event){
        const currentChurch = churchesMap.find(churchMap => churchMap.id_corp == event.FK_id_corp)

        history.push({
            pathname: `/User/Igrejas/${currentChurch.corpName}`,
            state: { church: currentChurch }
        });
    }
    function handleEventAdmin(event){
        const currentChurch = churchesMap.find(churchMap => churchMap.id_corp == event.FK_id_corp)
        history.push({
            pathname: `/Admin/Map/${currentChurch.corpName}`,
            state: { church: currentChurch }
        });
    }
    
    
    const allEvents = eventsMap.map((event) => {
        return (
            <>
                <Marker
                    key={event.id_event}
                    position={event.event_coordenate}
                    icon={eventImg}
                    options={{ clickable: true }}
                    title={`${event.title}`}
                    onClick={() => handleOpenInfoWindow(event)}
                />    
                { infoWindowIsOpen && (
                    <InfoWindow
                        onCloseClick={() => setInfoWindowIsOpen(false)}
                        position={infoWindowChurchEvent.event_coordenate}
                    >
                        <Container>
                            <div className="eventDetails">
                                <div className="event-container">
                                    <div className="event-box">
                                        <div className="event-title">
                                            {infoWindowChurchEvent.title} 
                                        </div>
                                        <div className="event-description">
                                            {infoWindowChurchEvent.event_desc}
                                        </div>
                                        <div className="event-time">
                                            <strong>Horário: </strong>
                                            {
                                                new Date(infoWindowChurchEvent.event_date.split('T')).getHours() + 
                                                ":" + (new Date(infoWindowChurchEvent.event_date.split('T')).getMinutes()<10?'0':'')
                                                + new Date(infoWindowChurchEvent.event_date.split('T')).getMinutes()
                                            } 
                                        </div>
                                        <div className="event-duration">
                                            <strong>Duração: </strong>  
                                            {infoWindowChurchEvent.event_duracao % 60 === 0 && infoWindowChurchEvent.event_duration <= 60 ? (
                                                (`00${Math.floor(infoWindowChurchEvent.event_duration / 60)}`).slice(-2) + ' hora'
                                            ): infoWindowChurchEvent.event_duration % 60 === 0 ? (
                                                (`00${Math.floor(event.event_duration / 60)}`).slice(-2) + ' horas'
                                            ): infoWindowChurchEvent.event_duration < 60 ? (
                                                (`00${infoWindowChurchEvent.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                            ): infoWindowChurchEvent.event_duration < 120 ? (
                                                (`00${Math.floor(infoWindowChurchEvent.event_duration / 60)}`).slice(-2) + ' hora e ' + 
                                                (`00${infoWindowChurchEvent.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                            ):  (
                                                (`00${Math.floor(infoWindowChurchEvent.event_duration / 60)}`).slice(-2) + ' horas e ' + 
                                                (`00${infoWindowChurchEvent.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                            )}
                                        </div>
                                        <div className="btnEvent">
                                            
                                            {isAdmin ? (
                                                <Button 
                                                     className="btnEventPosition"
                                                     variant="contained"
                                                     onClick={() => handleEventAdmin(infoWindowChurchEvent)}
                                                 >
                                                         Página da igreja
                                                 </Button>
                                            ):(
                                                <Button 
                                                    className="btnEventPosition"
                                                    variant="contained"
                                                    onClick={() => handleEvent(infoWindowChurchEvent)}
                                                >
                                                        Página da igreja
                                                </Button>
                                            )}

                                        </div>  
                                    </div>
                                </div>   
                            </div>        
                        </Container>             
                    </InfoWindow>
                )}       
            </>
        )
    });
    return allEvents;
}