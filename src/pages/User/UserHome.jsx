import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar.jsx';
import { Helmet } from 'react-helmet'

import { Content } from '../../styles/Localizador.js';

export function UserHome(){
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
            <Sidebar/>
            <Content>
                
            </Content>
        </>
    )
}

