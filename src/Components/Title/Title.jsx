import { Button } from '../Button/Button.jsx';

import './title.css'

export function Title(props){
    return(
        <div className="intro-text col">
            {props.isRight ? (
                <>
                    { props.paragrafo1 && (
                        <p className={ props.isRight ? "paragraph1-content" : "paragraph"}>
                            {props.paragrafo1}
                        </p> 
                    )}
                    <h1 className={ props.isRight ? "title-content" : "title"}>
                        {props.titulo}
                    </h1>
                    <p className={ props.isRight ? "paragraph2-content" : "paragraph"}>
                        {props.paragrafo2}
                    </p>

                    <div className="buttons">
                        <Button 
                            className={ props.isRight ? "btn-localize" : "btn"}
                            id="cadastro"
                            location="/Cadastro"
                            src={props.src}
                            alt={props.alt}
                        >
                            {props.buttonText1}
                        </Button>

                        { props.isRight && (
                            <Button 
                                className={ props.isRight ? "btn-localize" : "btn"}
                                id="cadastro"
                                location="/Cadastro"
                                src={props.src}
                                alt={props.alt}
                            >
                                {props.buttonText2}
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1 className={ props.isLeft ? "title-content" : "title"}>
                        {props.titulo}
                    </h1>
                    { props.paragrafo2 && (
                        <p className={ props.isLeft ? "paragraph2-content" : "paragraph" }>
                            {props.paragrafo2}
                        </p> 
                    )}

                    <Button 
                        className={ props.isLeft ? "btn-playstore" : "btn"}
                        id="btnPlaystore"
                        location="*"
                        src={props.src}
                        alt={props.alt}
                    >
                        {props.buttonText1}
                    </Button>

                    { props.isLeft && (
                        <Button 
                            className={ props.isLeft ? "btn-appstore" : "btn"}
                            id="btnApple"
                            location="*"
                            src={props.src2}
                            alt={props.alt}
                        >
                            {props.buttonText2}
                        </Button>
                    )}
                </>
            )}


        </div>
    );
}