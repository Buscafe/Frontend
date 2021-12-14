import BuscafeMobile from '../../../Assets/images/Buscafe-Mobile-left.png';
import playstoreorange from '../../../Assets/images/playstore-orange.svg';
import appleorange from '../../../Assets/images/apple-orange.svg';
import logobuscafe from '../../../Assets/images/logo-buscafe.svg';

import { Title } from '../../Title/Title';

import './celular.css';

export function Celular(){
    return(
        <div className="row g-0 mobile-content">
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

            <div className="underMobile">
                <img id="logo-buscafe" src={logobuscafe} alt="Logo do buscafe"/>
            </div>

            <div className="underIcon" />
                <div className="col content">
                    <Title
                        paragrafo1 = "Ajudando você a"
                    />
                </div>
            </div>
    );
}