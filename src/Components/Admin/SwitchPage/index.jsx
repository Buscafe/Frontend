import { useAuth } from "../../../hooks/useAuth"

import { About } from "./Pages/About"
import { Convention } from "./Pages/Convention"
import { Cults } from "./Pages/Cults"
import { Donate } from "./Pages/Donate"
import { AddChurch } from "./Pages/AddChurch"
import { MyChurch } from "./Pages/MyChurch"

export function SwitchPage({ page }){
  const { user } = useAuth();
  console.log(user.church)
  switch (page){
    case 'Minha Igreja':
      return user.church != null ? <MyChurch/> : <AddChurch/>
    case 'Sobre':
      return <About/>
    case 'Cultos':
      return <Cults/>
    case 'Eventos':
      return <Convention/>
    case 'Doações':
      return <Donate/>
    default:
      return <h1>Nenhuma página selecionada</h1>
  } 
}