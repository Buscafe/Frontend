import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { Alert, Skeleton, Stack  } from '@mui/material';
import { DateRange  } from "@mui/icons-material";
import { EventsViewModeStyles } from "./styles"
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react'

export function EventsViewMode(){
    const { user } = useAuth();  
    const { churchEvents, getChurchEvents, setChurchEvents, deleteEvent } = useChurches();
    const [isLoading, setIsLoading]   = useState(false);


    useEffect(async () => {
        await getChurchEvents(user.church ? user.church.id_corp : 0);
      }, [])
      
    async function handleDeleteEvents(id_event){
        setIsLoading(true)
        const eventDeleted = await deleteEvent(id_event)
        setChurchEvents(churchEvents.filter(event => event.id_event != id_event ))
        setIsLoading(false)
        toast.success(eventDeleted.msg)
    }
    
    return churchEvents.length != 0 ? (
        <EventsViewModeStyles>
            <div className="programation-container">
                <div className="day-container">
                    {churchEvents.code === 2 ? (
                            <Alert severity="info">{churchEvents.msg}</Alert>
                    ) : (
                        <>
                            {(churchEvents).map(event=>{
                                return (
                                    <>
                                        <div className="day-title">
                                            <DateRange id="dateIcon"/>
                                            {event.event_date.split('T')[0]}
                                        </div>
                                        <div className="event-container">
                                            <div className="event-box">
                                                <div className="event-title">
                                                    {event.title} 
                                                </div>
                                                <div className="event-description">
                                                {event.event_desc}
                                                </div>
                                                <div className="event-time">
                                                    <strong>Horário: </strong>
                                                    {event.event_date.split('T')[1]}
                                                </div>
                                                <div className="event-duration">
                                                    <strong>Duração: </strong>  
                                                    {event.event_duracao % 60 === 0 && event.event_duration <= 60 ? (
                                                        (`00${Math.floor(event.event_duration / 60)}`).slice(-2) + ' hora'
                                                    ): event.event_duration % 60 === 0 ? (
                                                        (`00${Math.floor(event.event_duration / 60)}`).slice(-2) + ' horas'
                                                    ): event.event_duration < 60 ? (
                                                        (`00${event.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                                    ): event.event_duration < 120 ? (
                                                        (`00${Math.floor(event.event_duration / 60)}`).slice(-2) + ' hora e ' + 
                                                        (`00${event.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                                    ):  (
                                                        (`00${Math.floor(event.event_duration / 60)}`).slice(-2) + ' horas e ' + 
                                                        (`00${event.event_duration % 60}`).slice(-2) + ' minuto(s)'
                                                    )}
                                                </div>
                                                <Button 
                                                    type="submit" id="delete" 
                                                    onClick={() => handleDeleteEvents(event.id_event)}
                                                    className={isLoading && 'loading'}
                                                >
                                                    deletar
                                                </Button>                                               
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </>
                    )}                  
                </div>
            </div>

        </EventsViewModeStyles>
    ):(
        <Stack spacing={1}>
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </Stack>  
    ) 
}
