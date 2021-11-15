import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Navbar } from '../../Components/User/Navbar/Navbar.jsx';

export function Localizador({route}){
    const { user } = useAuth();
    const history = useHistory();

    if(!user){
        history.push('/Login');
    }

    console.log(user.data);

    console.log(route)
    return(
        <div>
            <Navbar/>
        </div>
    )
}