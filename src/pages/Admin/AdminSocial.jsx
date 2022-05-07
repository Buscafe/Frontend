import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import Chats from '../../Components/User/Chats/Chats';

export function AdminSocial(){
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
            <Sidebar clicked={clicked} setClicked={setClicked} isAdmin/>
            <Chats marginLeft={clicked ? 12 : 22} isAdmin/>
        </>
    )
}

