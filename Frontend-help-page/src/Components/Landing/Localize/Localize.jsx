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
                    paragrafo2=" Talvez você esteja cansado de estar sempre buscando igrejas que não atendem a suas expectativas, estão longe da sua casa ou até mesmo procura melhorar a conexão com sua igreja atual.
                    Agora é o momento para relaxar, respirar fundo e resolver todos esses problemas com o BuscaFé. Ache e se conecte a sua igreja ideal com nossas funcionalidades:"

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