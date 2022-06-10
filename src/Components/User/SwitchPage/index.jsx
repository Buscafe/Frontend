import { AboutViewMode } from "./Pages/About"
import { MeetingViewMode } from "./Pages/Meeting"
import { EventsViewMode } from './Pages/Events'
import { DonateViewMode } from "./Pages/Donate"

export function SwitchPage({ page}){
  switch (page){
    case 'Sobre':
      return <AboutViewMode />
    case 'Reuniões':
      return <MeetingViewMode/>
    case 'Eventos':
      return <EventsViewMode/>
    case 'Doações':
      return <DonateViewMode />
    default:
      return 
  } 
}