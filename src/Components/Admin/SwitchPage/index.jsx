import { AddChurchCreationMode } from "./Pages/AddChurch/AddChurchCreationMode"
import { AddChurchViewMode } from "./Pages/AddChurch/AddChurchViewMode"
import { AboutCreationMode } from "./Pages/About/AboutCreationMode"
import { AboutViewMode } from "./Pages/About/AboutViewMode"
import { CultsCreationMode } from "./Pages/Cults/CultsCreationMode"
import { CultsViewMode } from "./Pages/Cults/CultsViewMode"
import { DonateCreationMode } from "./Pages/Donate/DonateCreationMode"
import { DonateViewMode } from "./Pages/Donate/DonateViewMode"

export function SwitchPage({ page, checked}){
  switch (page){
    case 'Minha Igreja':
      return checked ? <AddChurchViewMode /> : <AddChurchCreationMode />
    case 'Sobre':
      return checked ? <AboutViewMode /> : <AboutCreationMode />
    case 'Cultos':
      return checked ? <CultsViewMode/> : <CultsCreationMode />
    case 'Eventos':
      return checked ? <CultsViewMode/> : <CultsCreationMode />
    case 'Doações':
      return checked ? <DonateViewMode /> : <DonateCreationMode />
    default:
      return <h1>Nenhuma página selecionada</h1>
  } 
}