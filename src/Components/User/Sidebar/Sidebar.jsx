import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import { useAuth } from '../../../hooks/useAuth';
import { Logo } from '../../Logo/Logo';

import { pagesSidebarUser } from './pagesSidebarUser';
import { pagesSidebarAdmin } from './pagesSidebarAdmin';
import { ProgressiveImg } from '../../ProgressiveImg';

import PersonImage from '../../../Assets/images/PersonImage.svg'

import { Navbar, SidebarItems, Header } from './navbar.js';

export function Sidebar({ isAdmin, clicked, setClicked }){
    const { user, Logout } = useAuth();
    const history = useHistory();

    const colorPage = getComputedStyle(document.documentElement)
    .getPropertyValue('--admin-color')
    .trim();

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
                    {pagesSidebarUser.map(page =>{
                        return (
                            <li id={window.location.pathname === page.to ? "active" : ""}>
                                <Link to={page.to}>
                                    <span><i class={`${page.class} ${clicked && 'item-clicked'}`}></i></span>
                                    <span>{!clicked && `${page.name}`}</span>
                                </Link>
                            </li>
                        )
                    })}
                </SidebarItems>

                <div>
                    <button className={`navbar-box btn-sidebar ${clicked && 'navbar-box-clicked'}`}
                        onClick={() => history.push('/User/Profile')}
                    >
                        <ProgressiveImg
                           src={user.image_url ? user.image_url : PersonImage}
                           alt="Imagem de Perfil"
                           loadingWidth={60}
                           loadingHeight={60}
                        />
                        
                        {!clicked && (
                            <>
                                <span>
                                    <h3>{user?.usuario}</h3>
                                    <p>{user?.religiao}</p>
                                </span>
                            </>
                        )}                        
                    </button>

                </div>
                    <button onClick={Logout} className="navbar-box" id="logout">Sair</button>
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
                    {pagesSidebarAdmin.map(page =>{
                        return (
                            <li id={window.location.pathname === page.to ? "active" : ""}>
                                <Link to={page.to}>
                                    <span><i class={`${page.class} ${clicked && 'item-clicked'}`}></i></span>
                                    <span>{!clicked && `${page.name}`}</span>
                                </Link>
                            </li>
                        )
                    })}
                </SidebarItems>

                <div>
                    <button className={`navbar-box btn-sidebar ${clicked && 'navbar-box-clicked'}`}
                        onClick={() => history.push('/Admin/Profile')}
                    >
                        <ProgressiveImg
                           src={user.image_url ? user.image_url : PersonImage}
                           alt="Imagem de Perfil"
                           loadingWidth={60}
                           loadingHeight={60}
                           color={user.church ? user.church.color : colorPage}
                        />

                        {!clicked && (
                            <>
                                <span>
                                    <h3>{user?.usuario}</h3>
                                    <p>{user?.religiao}</p>
                                </span>
                            </>
                        )}                        
                    </button>
                    <button onClick={Logout} className="navbar-box" id="logout">Sair</button>
                </div>
            </div>
        </Navbar>
    )
}