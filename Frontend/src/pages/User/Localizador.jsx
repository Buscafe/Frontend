import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Navbar } from '../../Components/User/Navbar/Navbar.jsx';
import { api } from '../../services/api.js';


export function Localizador(){
    const { Logout, user } = useAuth();
    const history = useHistory();

    useEffect(() => {
      const JWT = localStorage.getItem('Token');
      if(!JWT){
        history.push('/Login');
        
      }
    })

    return(
        <div>
            <Navbar/>
        </div>
    )
}