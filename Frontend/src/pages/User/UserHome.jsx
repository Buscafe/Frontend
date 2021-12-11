import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar.jsx';

import '../../styles/Localizador.css';

export function UserHome(){
    const { user, signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }

    return(
        <>
            <Sidebar name={user.nome}/>
            <div id='content'>
            </div>
        </>
    )
}

