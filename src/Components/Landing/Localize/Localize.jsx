import LogoWithImage from '../../../Assets/images/Logo-with-image.png';
import BibleIcon from '../../../Assets/images/bible.svg'

import { Title } from '../../Title/Title';

import { LocalizeStyles } from './localize.js';

export function Localize(){
    return(
        <LocalizeStyles>
            <div className="content">
                <div>
                    <img id="LogoWithImage" src={LogoWithImage} alt="Imagem pessoa orando" />
                </div>
                <Title
                    titulo="instituições religiosas mais próximas a sua região."
                    paragrafo1="Localize com Buscafé"
                    paragrafo2="Mudou de cidade, visitando um parente ou é novo em sua religião?     
                    Quer conversar com um lider, se aproximar dos irmãos ou saber mais sobre a igreja?
                    Encontre e se conecte a sua instituição com nossas 
                    funcionalidades:"

                    buttonText1="Localizador"
                    buttonText2="Sistema Social"
                    src={BibleIcon}
                    alt="Icone da biblia"

                    isRight
                />
            </div>
        </LocalizeStyles>
    );
}