import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { Sidebar } from '../../Components/User/Sidebar/Sidebar';
import { DetailChurch } from '../../Components/User/DetailChurch/index.jsx';

import { Content } from '../../styles/adminHome.js';

export function AdminDetailChurch(){
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
            <Sidebar clicked={clicked} setClicked={setClicked} isAdmin={true} />
            <Content marginLeft={clicked ? 8.5 : 18.2}>
                <DetailChurch/>
            </Content>
        </>
    )
}