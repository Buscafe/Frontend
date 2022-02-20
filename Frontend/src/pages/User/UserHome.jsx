import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar.jsx';

import { Content } from '../../styles/Localizador.js';

export function UserHome(){
    const { signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }
    
    return(
        <>
            <Sidebar/>
            <Content>
                
            </Content>
        </>
    )
}

