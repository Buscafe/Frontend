import { useState } from 'react';
import { useHistory } from 'react-router'
import { useAuth } from '../../../hooks/useAuth';
import { Logo } from '../../Logo/Logo';

import PersonImage from '../../../Assets/images/PersonImage.svg'

import './navbar.css';


export function Sidebar(){
    const { user, Logout } = useAuth();
    const history = useHistory();
    const [clicked, setClicked] = useState(false);
    
    return(
        <nav className='navbar'>
            <div className='navbar-container'>
                <div>
                    <div className="header">
                        {!clicked && (<h2>Buscafé</h2>)}
                        
                        <button onClick={() => setClicked(!clicked)}>
                            <i class="fa fa-bars menu"></i>
                        </button>
                    </div>
                    <button className={`navbar-box btn-sidebar ${clicked && 'navbar-box-clicked'}`}>
                        <Logo width="50px" height="50px" fundo="#ffbf00" cruz="#fff" id="logo-sidebar"/>
                        {!clicked && (
                            <span>
                                <h3>{user?.localizacao.estado}</h3>
                                <p>{user?.localizacao.cidade}</p>
                            </span>
                        )}
                    </button>
                </div>

                <ul className={`sidebar-items ${clicked && 'sidebar-items-clicked'}`}>
                    <li>
                        <span><i class="fas fa-home"></i></span>
                        <span>{!clicked && 'Localizador'}</span>
                    </li>
                    <li>
                        <span><i class="fas fa-book-open"></i></span>
                        <span>{!clicked && 'Estudos'}</span>
                    </li>
                    <li>
                        <span><i class="fas fa-comments"></i></span>
                        <span>{!clicked && 'Social'}</span>
                    </li>
                    <li>
                        <span><i class="fas fa-question-circle"></i></span>
                        <span>{!clicked && 'Ajuda'}</span>
                    </li>
                </ul>

                <div>
                    <button className={`navbar-box btn-sidebar ${clicked && 'navbar-box-clicked'}`}
                        onClick={() => history.push('/User/Profile')}
                    >
                        <img src={PersonImage} alt="Imagem de Perfil"/>
                        {!clicked && (
                            <>
                                <span>
                                    <h3>{user?.usuario}</h3>
                                    <p>{user?.religiao}</p>
                                </span>
                                <button onClick={Logout} className="navbar-box" id="logout">Logout</button>
                            </>
                        )}                        
                    </button>
                    
                </div>
                
            </div>
        </nav>
    )
}