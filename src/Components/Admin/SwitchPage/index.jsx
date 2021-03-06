import { AddChurchCreationMode } from "./Pages/AddChurch/AddChurchCreationMode"
import { AddChurchViewMode } from "./Pages/AddChurch/AddChurchViewMode"
import { AboutCreationMode } from "./Pages/About/AboutCreationMode"
import { AboutViewMode } from "./Pages/About/AboutViewMode"
import { MeetingCreationMode } from "./Pages/Meeting/MeetingCreationMode"
import { MeetingViewMode } from "./Pages/Meeting/MeetingViewMode"
import { EventsCreationMode } from './Pages/Events/EventsCreationMode'
import { EventsViewMode } from './Pages/Events/EventsViewMode'
import { DonateCreationMode } from "./Pages/Donate/DonateCreationMode"
import { DonateViewMode } from "./Pages/Donate/DonateViewMode"

export function SwitchPage({ page, checked}){
  switch (page){
    case 'Meu templo':
      return checked ? <AddChurchViewMode /> : <AddChurchCreationMode />
    case 'Sobre':
      return checked ? <AboutViewMode /> : <AboutCreationMode />
    case 'Reuniões':
      return checked ? <MeetingViewMode/> : <MeetingCreationMode />
    case 'Eventos':
      return checked ? <EventsViewMode/> : <EventsCreationMode />
    case 'Doações':
      return checked ? <DonateViewMode /> : <DonateCreationMode />
    default:
      return 
  } 
}