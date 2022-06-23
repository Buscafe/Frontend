import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {Help} from "../../Components/Admin/Help/index"
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';


export function AdminHelp(){
  const [clicked, setClicked] = useState(false);
  const { signed } = useAuth();
  const { width } = useWindowDimensions();
  const history = useHistory();
  
  if(!signed){
    history.push('/Login');
  }

  return(
    <>
      <Helmet>
        <title>Ajuda | Buscafé</title>
      </Helmet>
      <RenderSidebar clicked={clicked} setClicked={setClicked} isAdmin/>
      <Help marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22}/>
    </>
  )
}