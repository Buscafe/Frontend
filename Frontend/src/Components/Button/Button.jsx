import { useHistory } from 'react-router-dom';

import './button.css'

export function Button(props){
    const history = useHistory();

    function destiny(){
        history.push(`${props.location}`)
    }
    
    return (
        <button id={props.id} className={props.className} onClick={destiny}>
            { props.src && (<img src={props.src} alt={props.alt}/>)}
            {props.children}
        </button>
    );
}