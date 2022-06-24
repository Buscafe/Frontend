import { Logo } from '../../Logo/Logo';
import { Button } from '../../Button/Button';
import { Link } from 'react-router-dom';

import { FooterStyles, Final, Reference } from './footer.js'

export function Footer(){
  return(
    <FooterStyles>
      <div className="underMobile">
      <Logo width="100px" height="100px" fundo="#ffbf00" cruz="#fff" id="logo-footer"/> 
      </div>

      <div className="FooterTxt">
        <h1 id="buttonTop">Ajudando você a</h1>
      </div>
      
      <div className='buttonLocation'>
        <Button className="btnLocaliza" id="localizar" location="/Login">Localizar</Button>
      </div>
      
      <div className="FooterTxt">
        <h1 id="buttonTop">
          Buscamos inovar o meio religioso, trazendo soluções 
          tecnológicas imersivas para o dia a dia das instituições religiosas.
        </h1>
      </div>
      
      <Final>
        <div>
            <h3>BuscaFé</h3>
            <p> Buscamos inovar o meio religioso, trazendo soluções 
          tecnológicas imersivas para o dia a dia das instituições religiosas.</p>
        </div>
        <div>
            <h3>Produtos</h3>
            <ul>
                <li>BuscaFé - Localizador</li>
                <li>BuscaFé - Social</li>
                <li>BuscaFé - Gerenciador de Instituições Religiosas</li>
            </ul>
        </div>
        <div>
            <h3>Links Úteis</h3>
            <ul>
                <li>
                    <Link to='/Login'>Localizador</Link>
                </li>
                <li>
                    <Link to='/Login'>Sua conta</Link>
                </li>
                <li>
                    <Link to='/Login'>Login</Link>
                </li>
                <li>
                    <Link to='/Cadastro'>Cadastro</Link>
                </li>
            </ul>
        </div>
        <div>
            <h3>Contato</h3>
            <ul>
                <li>projetobuscafe@gmail.com</li>
                <li>
                    <a href="https://www.instagram.com/projeto_buscafe/" target='_blank'>Instagram</a>
                </li>
                <li>
                    <a href="https://github.com/Buscafe" target='_blank'>Github</a>
                </li>
            </ul>
        </div>
      </Final>
      <Reference>
          <a href="/" target='_blank'>Direitos Autorais</a>
      </Reference>
    </FooterStyles>    
  )
}
