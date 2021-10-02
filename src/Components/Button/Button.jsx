import { useHistory } from 'react-router-dom';

import './button.css'

export function Button(props){
    const history = useHistory();

    function destiny(location){
        history.push(`${destiny}`)
    }

    return (
        <button id={props.id} className={props.className} onClicK={() => destiny(props.location)}>{props.children}</button>
    );
}