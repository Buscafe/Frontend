import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import { useAuth } from '../../../hooks/useAuth';
import { Logo } from '../../Logo/Logo';

import PersonImage from '../../../Assets/images/PersonImage.svg'

import { Navbar, SidebarItems, Header } from './navbar.js';


export function Sidebar({ isAdmin, clicked, setClicked }){
    const { user, Logout } = useAuth();
    const history = useHistory();
    
    return !isAdmin ? (
        <Navbar>
            <div className='navbar-container'>
                <div>
                    <Header>
                        {!clicked && (<h2>Buscafé</h2>)}
                        
                        <button onClick={() => setClicked(!clicked)}>
                            <i class="fa fa-bars menu"></i>
                        </button>
                    </Header>
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

                <SidebarItems className={`${clicked && 'sidebar-items-clicked'}`}>
                    <li>
                        <Link to='/User/Home'>
                            <span><i class={`fas fa-home ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Localizador'}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/User/Home'>
                            <span><i class={`fas fa-book-open ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Estudos'}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/User/Social'>
                            <span><i class={`fas fa-comments ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Social'}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/User/Home'>
                            <span><i class={`fas fa-question-circle ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Ajuda'}</span>
                        </Link>
                    </li>
                </SidebarItems>

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
                                <button onClick={Logout} className="navbar-box" id="logout">Sair</button>
                            </>
                        )}                        
                    </button>
                </div>
            </div>
        </Navbar>
    ) : (
        <Navbar>
            <div className='navbar-container'>
                <div>
                    <Header>
                        {!clicked && (
                            <h2>
                                Buscafé <br/> 
                                <span style={{color: '#ffbf00'}}>Admin</span>
                            </h2>
                        )}
                        
                        <button onClick={() => setClicked(!clicked)}>
                            <i class="fa fa-bars menu"></i>
                        </button>
                    </Header>
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

                <SidebarItems className={`${clicked && 'sidebar-items-clicked'}`}>
                    <li>
                        <Link to='/User/Home'>
                            <span><i class={`fas fa-home ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Localizador'}</span>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <span><i class={`fas fa-gauge ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Dashboard'}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/User/Social'>
                            <span><i class={`fas fa-comments ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Social'}</span>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <span><i class={`fas fa-question-circle ${clicked && 'item-clicked'}`}></i></span>
                            <span>{!clicked && 'Ajuda'}</span>
                        </Link>
                    </li>
                </SidebarItems>

                <div>
                    <button className={`navbar-box btn-sidebar ${clicked && 'navbar-box-clicked'}`}
                        onClick={() => history.push('/Admin/Profile')}
                    >
                        <img src={PersonImage} alt="Imagem de Perfil"/>
                        {!clicked && (
                            <>
                                <span>
                                    <h3>{user?.usuario}</h3>
                                    <p>{user?.religiao}</p>
                                </span>
                                <button onClick={Logout} className="navbar-box" id="logout">Sair</button>
                            </>
                        )}                        
                    </button>
                </div>
            </div>
        </Navbar>
    )
}