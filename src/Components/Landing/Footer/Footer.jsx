import logobuscafe from '../../../Assets/images/logo-buscafe.svg';
import { Button } from '../../Button/Button';

import { FooterStyles } from './footer.js'

export function Footer(){
  return(
    <FooterStyles>
      <div className="underMobile">
        <img id="logo-buscafe" src={logobuscafe} alt="Logo do buscafe"/> 
      </div>

      <div className="FooterTxt">
        <h1 id="buttonTop">Ajudando você a</h1>
      </div>
      
      <div className='buttonLocation'>
        <Button className="btnLocaliza" id="localizar" location="*">Localizar</Button>
      </div>
      
      <div className="FooterTxt">
        <h1 id="buttonTop">
          Buscamos inovar o meio religioso, trazendo soluções 
          tecnológicas imersivas para o dia a dia das instituições religiosas.
        </h1>
      </div>
      
      <div className='footerFinal'>

        <div className='footerStyled'>
          <h3>Redes Sociais:</h3> 
          <ul>
            <li><a href="https://www.facebook.com/people/Buscaf%C3%A9-Etec/100075708064430/?sk=about">
                        Facebook</a></li>
            <li><a href="https://www.instagram.com/projeto_buscafe/">Instagram</a></li>
            <li><a href="https://twitter.com/PBuscafe">Twitter</a></li>
            <li><a href="https://www.youtube.com/channel/UC2nkAacxF8Hco4raK5Pk_qA">YouTube</a></li>
          </ul>
        </div>

        <div className='footerStyled'>
        <h3>Contate-nos:</h3> 
          <ul>
            <li><p>projetosetecdeembu@gmail.com</p></li>
          </ul>
        </div>

        <div className='footerStyled'>
          <h3>Sobre nós:</h3>
          <ul>
            <li><p>Leia <a href="#">sobre</a> nossa equipe e nosso projeto!</p></li>
          </ul>
        </div>
      </div>
    </FooterStyles>    
  )
}
