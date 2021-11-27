import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Navbar } from '../../Components/User/Navbar/Navbar.jsx';


export function Localizador(){
    const { user, signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }
    console.log(user)


    return(
        <div>
            <Navbar/>
        </div>
    )
}