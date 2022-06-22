import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

import { Churches } from '../../Components/User/Churches/index';

export function UserChurches(){
    const [clicked, setClicked] = useState(false);
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
            <Sidebar clicked={clicked} setClicked={setClicked}/>
            <Churches marginLeft={clicked ? 12 : 22} />
        </>
    )
}

