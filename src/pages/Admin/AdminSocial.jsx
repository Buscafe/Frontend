import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import Chats from '../../Components/User/Chats/Chats';
import { WithoutChurch } from '../../Components/Admin/WithoutChurch/WithoutChurch.jsx';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';
import { useWindowDimensions } from '../../hooks/useWindowDimensions.js';

export function AdminSocial(){
    const [clicked, setClicked] = useState(false);
    const { signed, user } = useAuth();
    const { width } = useWindowDimensions();
    const history = useHistory();
    
    if(!signed){
      history.push('/Login');
    }

    return(
        <>
            <Helmet>
                <title>Home | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked} isAdmin/>

            {user.church ? (
                <Chats marginLeft={clicked ? (width >= 650 ? 12 : 3) : 22} isAdmin/>
            ) : (
                <WithoutChurch marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22}>
                    <h1>Cadastre a sua igreja para ter acesso ao <br/><span>Social</span></h1>
                </WithoutChurch>
            )}
        </>
    )
}

