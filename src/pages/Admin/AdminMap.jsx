import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';

import { Localizador } from '../../Components/Admin/Localizador/index';

export function AdminMap(){
    const [clicked, setClicked] = useState(false);
    const { signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }

    return(
        <>
            <Helmet>
                <title>Admin | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked} isAdmin/>
            <Localizador clicked={clicked} isAdmin/>
        </>
    )
}