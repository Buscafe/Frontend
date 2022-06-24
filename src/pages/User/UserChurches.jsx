import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { Helmet } from 'react-helmet';
import { useState } from 'react';

import { useWindowDimensions } from '../../hooks/useWindowDimensions.js';

import { Churches } from '../../Components/User/Churches/index';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';

export function UserChurches(){
    const [clicked, setClicked] = useState(false);
    const { signed } = useAuth();
    const { width } = useWindowDimensions();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }
    
    return(
        <>
            <Helmet>
                <title>Home | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked}/>
            <Churches marginLeft={clicked ? (width >= 650 ? 12 : 0) : 22} />
        </>
    )
}

