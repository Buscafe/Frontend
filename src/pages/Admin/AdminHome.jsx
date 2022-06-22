import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { Home } from '../../Components/Admin/Home/index.jsx';
import { WithoutChurch } from '../../Components/Admin/WithoutChurch/WithoutChurch.jsx';
import { SidebarMobile } from '../../Components/User/Sidebar/SidebarMobile.jsx';

import { Content } from '../../styles/adminHome.js';
import { api } from '../../services/api.js';
import sign from 'jwt-encode';

export function AdminHome(){
    const { width } = useWindowDimensions();
    const { signed, user, setUser } = useAuth();
    const [clicked, setClicked] = useState(false);
    const [hasPayed, setHasPayed] = useState(user.isPayed);
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }

    useEffect(() => {
      const fetchData = async () => {
        if(localStorage.getItem('CheckoutSession')){
          const stripeSession = JSON.parse(localStorage.getItem('CheckoutSession'));
      
          const { data } = await api.get(`checkout/session/${stripeSession.id}/${user.id_user}`)

          if(data.err){
            throw new Error(data.err);
          }
          
          if(data.session.status == 'complete'){
            setHasPayed(true);
            setUser({...user, isPayed: true});
            
            localStorage.setItem('Token', sign({...user, isPayed: true }, process.env.REACT_APP_SECRET_JWT))
            localStorage.removeItem('CheckoutSession')
          } 
        }
      }
      
      fetchData();
    }, [])

    return(
      <>
        <Helmet>
          <title>Admin | Buscafé</title>
        </Helmet>
        
        {width >= 650 ? (
          <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={true}/>
        ) : (
          <SidebarMobile clicked={clicked} setClicked={setClicked} isAdmin={true}/>
        )}
       

        {hasPayed ? (
          <Content marginLeft={clicked ? (width >= 650 ? 8.5 : 0) : 18.2}>
            <Home/>
          </Content>
        ) : (
          <WithoutChurch marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22}>
            <h1>Atualize seu plano para utilizar o<br/><span>Cadastro</span></h1>
          </WithoutChurch>
        )}
      </>
    )
}