import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { Home } from '../../Components/Admin/Home/index.jsx';
import { WithoutChurch } from '../../Components/Admin/WithoutChurch/WithoutChurch.jsx';

import { Content } from '../../styles/adminHome.js';

export function AdminHome(){
    const [clicked, setClicked] = useState(false);
    const { signed, user } = useAuth();
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
            {user.isPayed ? (
                <Content marginLeft={clicked ? 8.5 : 18.2}>
                    <Home/>
                </Content>
            ) : (
                <WithoutChurch marginLeft={clicked ? 12 : 22}>
                    <h1>Atualize seu plano para utilizar o<br/><span>Cadastro</span></h1>
                </WithoutChurch>
            )}
        </>
    )
}