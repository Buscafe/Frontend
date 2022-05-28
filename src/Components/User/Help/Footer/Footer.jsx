import logobuscafe from '../../../../Assets/images/logo-buscafe.svg';
import { Link } from 'react-router-dom';

import { FooterStyles, Final, Reference } from './footer.js'

export function Footer(){
  return(
    <FooterStyles>
      <div className="underMobile">
        <img id="logo-buscafe" src={logobuscafe} alt="Logo do buscafe"/> 
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
                    <Link to='/User/Home'>Localizador</Link>
                </li>
                <li>
                    <Link to='/User/Profile'>Sua conta</Link>
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
    </FooterStyles>    
  )
}
