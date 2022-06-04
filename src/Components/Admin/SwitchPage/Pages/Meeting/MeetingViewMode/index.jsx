import DateRangeIcon from '@mui/icons-material/DateRange';
import { MeetingViewModeStyles } from "./styles"

export function MeetingViewMode(){
    return (
        <MeetingViewModeStyles>
            <div className="programation-container">
                <div className="day-container">

                    <div className="day-title">
                        <DateRangeIcon id="dateIcon"/>
                        Sábados
                    </div>
                    <div className="cult-container">
                        <div className="cult-box">
                            <div className="cult-title">
                                Reuniao de oracao 
                            </div>
                            <div className="cult-description">
                                Nos encontramos para orar
                            </div>
                            <div className="cult-time">
                                <strong>Horário:</strong> 09:00
                            </div>
                            <div className="cult-duration">
                                <strong>Duração:</strong> 1 hora e 30 minutos
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </MeetingViewModeStyles>
        
    )
}
