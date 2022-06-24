import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth.js';

import { DetailChurch } from '../../Components/User/DetailChurch/index.jsx';

import { Content } from '../../styles/adminHome.js';
import { RenderSidebar } from '../../Components/User/Sidebar/RenderSidebar.jsx';
import { useWindowDimensions } from '../../hooks/useWindowDimensions.js';

export function UserDetailChurch(){
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
                <title>Admin | Buscafé</title>
            </Helmet>
            <RenderSidebar clicked={clicked} setClicked={setClicked}/>
            <Content marginLeft={clicked ? (width >= 650 ? 8.5 : 0) : 18.2}>
                <DetailChurch/>
            </Content>
        </>
    )
}