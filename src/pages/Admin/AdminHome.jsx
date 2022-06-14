import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { Home } from '../../Components/Admin/Home/index.jsx';
import { WithoutChurch } from '../../Components/Admin/WithoutChurch/WithoutChurch.jsx';

import { Content } from '../../styles/adminHome.js';
import { api } from '../../services/api.js';

export function AdminHome(){
    const [clicked, setClicked] = useState(false);
    const [hasPayed, setHasPayed] = useState(false);
    const { signed, user, setUser } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }

    const stripeSession = JSON.parse(localStorage.getItem('CheckoutSession'));
    useEffect(async () => {
      const { data } = await api.get(`checkout/session/${stripeSession.id}/${user.id_user}`)

      if(data.err){
        throw new Error(data.err);
        }
      
      if(data.session.status == 'complete'){
        setUser({...user, isPayed: true});
        setHasPayed(true);
      } 
    }, [])
    return(
        <>
            <Helmet>
                <title>Admin | Buscafé</title>
            </Helmet>
            <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={true}/>
            {hasPayed ? (
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