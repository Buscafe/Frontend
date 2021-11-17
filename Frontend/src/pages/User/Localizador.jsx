import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Navbar } from '../../Components/User/Navbar/Navbar.jsx';
import { api } from '../../services/api.js';


export function Localizador(){
    const { signed, Logout, user } = useAuth();
    const history = useHistory();

    useEffect(() => {
      const { data } = api.post('/JWT/verificar', {
        email : user.email,
        nome  : user.nome,
        jwt   : user.token
      })

      if(data.code === 0){
        history.push('/Login')
      }
    })

    

    console.log(user)
    // if(storageJWT !== userJWT){
    //     history.push('/Login');
    // }

    function handleLogout() {
        Logout();
    }

    return(
        <div>
            <Navbar/>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}