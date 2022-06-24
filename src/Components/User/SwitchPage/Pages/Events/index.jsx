import { useEffect } from 'react';
import { useChurches } from "../../../../../hooks/useChurches";

import { Alert, Skeleton, Stack  } from '@mui/material';
import { DateRange  } from "@mui/icons-material";
import { EventsViewModeStyles } from "./styles"

export function EventsViewMode(){
    const { church, churchEvents, getChurchEvents  } = useChurches();

    useEffect(async () => {
        await getChurchEvents(church.id_corp);
      }, [])
          
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
