import { Logo } from '../../Logo/Logo';

import PersonImage from '../../../Assets/images/PersonImage.svg'

import './navbar.css';

export function Sidebar(){

    return(
        <nav className="navbar">
            <div className='navbar-container'>
                <div>
                    <div className="header">
                        <h2>Buscafé</h2>
                        
                        <button>
                            <i class="fa fa-bars menu"></i>
                        </button>
                    </div>
                    <button className="navbar-box btn-sidebar">
                        <Logo width="50px" height="50px" fundo="#ffbf00" cruz="#fff"/>
                        <span>
                            <h3>São Paulo</h3>
                            <p>Itapecerica da Serra</p>
                        </span>
                    </button>
                </div>

                <ul className="sidebar-items">
                    <li>
                        <i class="fas fa-home"></i>
                        Localizador
                    </li>
                    <li>
                        <i class="fas fa-book-open"></i>
                        Estudos
                    </li>
                    <li>
                        <i class="fas fa-comments"></i>
                        Social
                    </li>
                    <li>
                    <i class="fas fa-question-circle"></i>
                        Ajuda
                    </li>
                </ul>

                <button className="navbar-box btn-sidebar">
                    <img src={PersonImage} alt="Imagem de Perfil"/>
                    <span>
                        <h3>Igor Braz</h3>
                        <p>Católico</p>
                    </span>
                </button>
            </div>
        </nav>
    )
}