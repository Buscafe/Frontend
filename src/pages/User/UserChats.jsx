import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import Chats from '../../Components/User/Chats/Chats';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';
import { useWindowDimensions } from '../../hooks/useWindowDimensions.js';

export function UserChats(){
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
                <title>Home | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked}/>
            <Chats marginLeft={clicked ? (width >= 650 ? 12 : 3) : 22}/>
        </>
    )
}

