import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useChat } from '../../hooks/useChat.js'

import Chats from '../../Components/User/Chats/Chats';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { WithoutChurch } from '../../Components/Admin/WithoutChurch/WithoutChurch.jsx';

import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';
import { useWindowDimensions } from '../../hooks/useWindowDimensions.js';

export function UserChats(){
    const {churches, getChurches} = useChat();

    const [clicked, setClicked] = useState(false);
    const { user, signed } = useAuth();
    const { width } = useWindowDimensions();
    const history = useHistory();
    
    if(!signed){
      history.push('/Login');
    }
    useEffect(async () => {
        await getChurches(user?.id_user);
    }, []);

    return(
        <>
            <Helmet>
                <title>Home | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked}/>

            {churches.code !== 2 ? (
                <Chats marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22}/>
            ) : (
                <WithoutChurch marginLeft={clicked ? 12 : 22}>
                    <h1><span>Filie a uma igreja</span> para ter acesso ao Social!</h1>
                </WithoutChurch>
            )}     
        </>
    )
}