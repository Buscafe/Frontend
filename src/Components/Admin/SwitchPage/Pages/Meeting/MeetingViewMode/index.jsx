import { useEffect } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { Alert } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { MeetingViewModeStyles } from "./styles"

export function MeetingViewMode(){
    const { user, setUser } = useAuth();  
    const { churchMeeting, getChurchMeeting } = useChurches();

    useEffect(async () => {
        await getChurchMeeting(user.church.id_corp);
      }, [])
      
    
    return (
        <MeetingViewModeStyles>
            <div className="programation-container">
                <div className="day-container">
                    {churchMeeting.code === 2 ? (
                            <Alert severity="info">{churchMeeting}</Alert>
                    ) : (
                        <>
                            {(churchMeeting).map(meeting=>{
                                return (
                                    <>
                                        <div className="day-title">
                                            <DateRangeIcon id="dateIcon"/>
                                            {meeting.meeting_days}
                                        </div>
                                        <div className="cult-container">
                                            <div className="cult-box">
                                                <div className="cult-title">
                                                    {meeting.meeting_name}
                                                </div>
                                                <div className="cult-description">
                                                {meeting.meeting_desc}
                                                </div>
                                                <div className="cult-time">
                                                    <strong>Horário: </strong>
                                                    {
                                                        new Date(meeting.meeting_time).getHours() + 
                                                        ":" + (new Date(meeting.meeting_time).getMinutes()<10?'0':'')+ new Date(meeting.meeting_time).getMinutes()
                                                    } 
                                                </div>
                                                <div className="cult-duration">
                                                    <strong>Duração: </strong>  
                                                    {meeting.meeting_duration % 60 === 0 && meeting.meeting_duration <= 60 ? (
                                                        (`00${Math.floor(meeting.meeting_duration / 60)}`).slice(-2) + ' hora'
                                                    ): meeting.meeting_duration % 60 === 0 ? (
                                                        (`00${Math.floor(meeting.meeting_duration / 60)}`).slice(-2) + ' horas'
                                                    ): meeting.meeting_duration < 60 ? (
                                                        (`00${meeting.meeting_duration % 60}`).slice(-2) + ' minuto(s)'
                                                    ): meeting.meeting_duration < 120 ? (
                                                        (`00${Math.floor(meeting.meeting_duration / 60)}`).slice(-2) + ' hora e ' + 
                                                        (`00${meeting.meeting_duration % 60}`).slice(-2) + ' minuto(s)'
                                                    ):  (
                                                        (`00${Math.floor(meeting.meeting_duration / 60)}`).slice(-2) + ' horas e ' + 
                                                        (`00${meeting.meeting_duration % 60}`).slice(-2) + ' minuto(s)'
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

        </MeetingViewModeStyles>
        
    )
}
