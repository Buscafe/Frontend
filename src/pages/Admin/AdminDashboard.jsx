import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { Dashboard } from '../../Components/Dashboard/index.jsx';

export function AdminDashboard(){
    const [clicked, setClicked] = useState(false);
    const { signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }

    return(
        <>
            <Helmet>
                <title>Admin | Buscafé</title>
            </Helmet>
            <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={true}/>
            <Dashboard marginLeft={clicked ? 12 : 22} isAdmin/>
        </>
    )
}