import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';
import { useWindowDimensions } from '../../hooks/useWindowDimensions'

import { Skeleton, Stack } from '@mui/material';
import { Home } from '../../Components/Admin/Home/index.jsx';
import { WithoutChurch } from '../../Components/Admin/WithoutChurch/WithoutChurch.jsx';

import { Content } from '../../styles/adminHome.js';
import { api } from '../../services/api.js';
import sign from 'jwt-encode';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';

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
            <RenderSidebar clicked={clicked} setClicked={setClicked} isAdmin/>
            {hasPayed ? (
                 <Content marginLeft={clicked ? (width >= 650 ? 8.5 : 0) : 18.2}>
                    <Home/>
                </Content>
            ) : hasPayed === 'false' ? (
                <WithoutChurch marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22}>
                   <h1>Atualize seu plano para utilizar o<br/><span>Cadastro</span></h1>
                </WithoutChurch>
            ): (
              <Content marginLeft={clicked ? 8.5 : 18.2}>
                  <Stack spacing={1}>
                    <div className='skeleton'>
                      <Skeleton variant="circular" height={250} width={250} />
                    </div>     
                    <Skeleton variant="rectangular" height={150} width={1500} animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                  </Stack>
              </Content>
            )}
        </>
    )
}