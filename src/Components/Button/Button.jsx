import { useHistory } from 'react-router-dom';

import './button.css'

export function Button({id, className, location, children, src, alt}){
    const history = useHistory();

    function destiny(){
        history.push(`${location}`)
    }
    
    return (
        <button id={id} className={className} onClick={destiny}>
            { src && (<img src={src} alt={alt}/>)}
            {children}
        </button>
    );
}