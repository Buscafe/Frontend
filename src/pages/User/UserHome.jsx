import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { useAuth } from '../../hooks/useAuth.js';

import { Localizador } from '../../Components/User/Localizador/index';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';


export function UserHome(){
    const [clicked, setClicked] = useState(false);
    const { signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }
    
    return(
        <>
            <Helmet>
                <title>Home | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked}/>
            <Localizador clicked={clicked}/>
        </>
    )
}

