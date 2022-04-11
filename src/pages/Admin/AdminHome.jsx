import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { LocalizadorAdmin } from '../../Components/Admin/LocalizadorAdmin/index.jsx';

import { Content } from '../../styles/adminHome.js';


export function AdminHome(){
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
            <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={true}/>
            <Content marginLeft={clicked ? 10 : 23}>
                <LocalizadorAdmin/>
            </Content>
        </>
    )
}