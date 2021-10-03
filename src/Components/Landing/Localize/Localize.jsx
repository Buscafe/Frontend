import LogoWithImage from '../../../Assets/images/Logo-with-image.png';
import BibleIcon from '../../../Assets/images/bible.svg'

import { Title } from '../../Title/Title';

import './localize.css';

export function Localize(){
    return(
        <div className="row g-0 localize-content">
            <div className="col">
                <img id="LogoWithImage" src={LogoWithImage} alt="Imagem pessoa orando" />
            </div>
            <div className="col content">
                <Title
                    titulo="instituições religiosas mais próximas a sua região."
                    paragrafo1="Localize com Buscafé"
                    paragrafo2=" Talvez você esteja cansado de estar sempre buscando igrejas que não atendem a suas expectativas, estão longe da sua casa ou até mesmo procura melhorar sua conexão com sua igreja atual.
                    Agora é o momento para relaxar, respirar firme e resolver todos esses problemas com o Buscafé. Nunca foi mais fácil achar a sua  igreja ideal  com nossas funcionalidades:"

                    buttonText1="Funcionalidade 1"
                    buttonText2="Funcionalidade 2"
                    
                    src={BibleIcon}
                    alt="Icone da biblia"

                    isRight
                />
            </div>
        </div>
    );
}