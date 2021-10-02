import { Button } from '../Button/Button.jsx';

import './title.css';

export function Title(props){
    return(
        <div className="intro-text col">
            <h1>{props.titulo}</h1>
            <p>{props.paragrafo}</p>

            <Button 
                className="btn"
                id="cadastro"
                location="/Cadastrar"
            >
                {props.buttonText}
            </Button>
        </div>
    );
}