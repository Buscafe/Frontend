import LogoBuscafe from '../Usuario/Assets/images/logo-buscafe.svg';

import { useHistory } from 'react-router-dom';

import '../styles/home.css'

export function Home(){
    const history = useHistory();

    function goHome(){
        history.push('/')
    }

    return(
        <div>
      <header> 
        <div class="row main-header">
          <button onClick={goHome} class=" col-2 col-sm-6 col-md-5 col-lg-5 col-xl-3">
            <img src={LogoBuscafe} alt="Logo da empresa Buscafé" title="Logo Buscafé"/>
          </button>
          <nav class="headerMenu col-9 col-sm-7 col-md-6 col-lg-6 col-xl-5">
            <ul>
                <li>
                    <i class="fab fa-apple"></i>
                </li>
                <li>
                    <i class="fab fa-google-play"></i>
                </li>
                <li>
                    <a href="#">
                        <input type="button" class="btn-l" value="Login"/>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <input type="button" class=" btn-c" value="Cadastro"/>
                    </a>
                </li>
            </ul>
          </nav>
        </div>
      </header>

      <div class="intro row"> 
        <div class="intro-text col">
            <h1>Buscafé o Melhor Localizador de Igrejas</h1>
            <p>Encontre as igrejas mais próximas a você.</p>
            <a href="./PHP/Login/index.php">
              <input type="button" class="btn" value="Cadastrar" id="cadastro"/>
            </a>
        </div>
          <div class="col" id="logo">
            <img src={LogoBuscafe} style={{width: '25rem', height: '25rem'}} alt="Logo Buscafé"/>
          </div>
      </div>
    </div>
    );
}