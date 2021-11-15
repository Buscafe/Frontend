import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Navbar } from '../../Components/User/Navbar/Navbar.jsx';

export function Localizador(){
    const { signed, Logout } = useAuth();
    const history = useHistory();

    if(!signed){
        history.push('/Login');
    }

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