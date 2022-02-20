import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export function Localizador(){
    const { user, signed } = useAuth();
    const history = useHistory();

    if(!signed){
      history.push('/Login');
    }


    return(
        <div>
            
        </div>
    )
}