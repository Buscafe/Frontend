import { useEffect } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { Alert, IconButton, Skeleton, Stack  } from '@mui/material';
import { DateRange, HighlightOffSharp  } from "@mui/icons-material";
import { EventsViewModeStyles } from "./styles"
import { toast } from 'react-toastify';

export function EventsViewMode(){
    const { user, setUser } = useAuth();  
    const { setStepCompleted, churchEvents, getChurchEvents, deleteEvent } = useChurches();

    setStepCompleted(3)

    useEffect(async () => {
        await getChurchEvents(user.church ? user.church.id_corp : 0);
      }, [])
      
    async function handleDeleteEvents(id_event){
        const eventDeleted = await deleteEvent(id_event)
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
                                            {
                                                `${new Date(event.event_date).getDate().toString().padStart(2,0)}-${(new Date(event.event_date).getMonth() + 1).toString().padStart(2,0)}-${new Date(event.event_date).getFullYear().toString().padStart(2,0)}
                                            `}
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
                                                    {
                                                        new Date(event.event_date).getHours() + 
                                                        ":" + (new Date(event.event_date).getMinutes()<10?'0':'')+ new Date(event.event_date).getMinutes()
                                                    } 
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

                                                <IconButton onClick={()=> handleDeleteEvents(event.id_event)} aria-label="delete" size="small" color="error">
                                                    <HighlightOffSharp color='warning'/>
                                                </IconButton> 
                                                
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
