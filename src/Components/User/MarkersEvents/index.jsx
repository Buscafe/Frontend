import { Marker, InfoWindow } from "@react-google-maps/api"
import { useEffect, useState } from "react";
import { useChurches } from "../../../hooks/useChurches";
import { useAuth } from "../../../hooks/useAuth";
import eventImg from '../../../Assets/images/eventMap.png'
import churchImg from '../../../Assets/images/maps-icon.png'



import { Container } from "./style";


export const MarkersEvents = () => {
    const { getAllEvents, eventsMap } = useChurches();
    const { user } = useAuth(); 
    const [infoWindowIsOpen, setInfoWindowIsOpen] = useState(false);
    const [infoWindowEvent, setInfoWindowEvent] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(async () => {
        await getAllEvents(user.id_user, user.religiao);
    }, [])


    const handleOpenInfoWindow = async(currentEvent) => {
        setInfoWindowEvent(currentEvent)
        setInfoWindowIsOpen(true)
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
                        position={infoWindowEvent.event_coordenate}
                    >
                        <Container>
                            <div className="eventDetails">
                                <div className="event-container">
                                    <div className="event-box">
                                        <div className="event-title">
                                            {infoWindowEvent.title} 
                                        </div>
                                        <div className="event-description">
                                        {infoWindowEvent.event_desc}
                                        </div>
                                        <div className="event-time">
                                            <strong>Horário: </strong>
                                            {
                                                new Date(infoWindowEvent.event_date).getHours() + 
                                                ":" + (new Date(infoWindowEvent.event_date).getMinutes()<10?'0':'')+ new Date(infoWindowEvent.event_date).getMinutes()
                                            } 
                                        </div>
                                        <div className="event-duration">
                                            <strong>Duração: </strong>  
                                            {infoWindowEvent.event_duracao % 60 === 0 && infoWindowEvent.event_duration <= 60 ? (
                                                (`00${Math.floor(infoWindowEvent.event_duration / 60)}`).slice(-2) + ' hora'
                                            ): infoWindowEvent.event_duration % 60 === 0 ? (
                                                (`00${Math.floor(event.event_duration / 60)}`).slice(-2) + ' horas'
                                            ): infoWindowEvent.event_duration < 60 ? (
                                                (`00${infoWindowEvent.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                            ): infoWindowEvent.event_duration < 120 ? (
                                                (`00${Math.floor(infoWindowEvent.event_duration / 60)}`).slice(-2) + ' hora e ' + 
                                                (`00${infoWindowEvent.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                            ):  (
                                                (`00${Math.floor(infoWindowEvent.event_duration / 60)}`).slice(-2) + ' horas e ' + 
                                                (`00${infoWindowEvent.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                            )}
                                        </div>
                                    </div>+
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