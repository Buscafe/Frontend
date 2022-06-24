import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { useAuth } from '../../hooks/useAuth';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

import {Help} from "../../Components/User/Help/index"
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar';


export function UserHelp(){
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
      <RenderSidebar clicked={clicked} setClicked={setClicked}/>
      <Help marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22}/>
    </>
  )
}