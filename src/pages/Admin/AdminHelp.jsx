import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {Help} from "../../Components/User/Help/index"
import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { Helmet } from 'react-helmet';
import { useState } from 'react';


export function AdminHelp(){
  const [clicked, setClicked] = useState(false);
  const { signed } = useAuth();
  const history = useHistory();
  
  if(!signed){
    history.push('/Login');
  }

  return(
    <>
      <Helmet>
        <title>Ajuda | Buscafé</title>
      </Helmet>
        <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={true}/>
        <Help marginLeft={clicked ? 12 : 22}/>
    </>
  )
}