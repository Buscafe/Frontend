import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar.jsx';


export function Localizador(){
    const { user, signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }


    return(
        <div>
            <Sidebar/>
        </div>
    )
}