import BuscafeMobile from '../../../Assets/images/Buscafe-Mobile.png';
import playstoreorange from '../../../Assets/images/playstore-orange.svg';
import appleorange from '../../../Assets/images/apple-orange.svg';

import { Title } from '../../Title/Title';

import { MobileStyles } from './celular.js';

export function Celular(){
    return(
        <MobileStyles className="row g-0">
            <div className="col content">
                <Title
                    paragrafo2 = "A maneira mais prática para ir até a sua igreja, de maneira fácil e eficiente utilizando o Buscafé Mobile, disponível nas plataformas:"
                    titulo     = "Buscafé no seu celular"

                    //Botoões da jojas de aplicativos (IOS/Android)
                    buttonText1="Play Store"
                    buttonText2="App Store"

                    src={playstoreorange}
                    src2={appleorange}

                    alt="Icone da biblia"

                    isLeft
                />
            </div>

            <div className="col"> 
                <img id="BuscafeMobile" src={BuscafeMobile} alt="Aplicativo do Buscafé aberto em um celular" />
            </div>
        </MobileStyles>
    );
}