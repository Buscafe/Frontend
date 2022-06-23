import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import { useAuth } from '../../../../hooks/useAuth';
import { Logo } from '../../../Logo/Logo';

import { pagesSidebarUser } from '../pages/pagesSidebarUser';
import { pagesSidebarAdmin } from '../pages/pagesSidebarAdmin';
import { ProgressiveImg } from '../../../ProgressiveImg';

import { Navbar, ButtonNav, SidebarItems, Header } from '../navbar.js';

export function SidebarMobile({ isAdmin, clicked, setClicked }){
    const { user, Logout } = useAuth();
    const history = useHistory();

    const colorPage = getComputedStyle(document.documentElement)
    .getPropertyValue('--admin-color')
    .trim();

    return !isAdmin ? (
        <>
            {clicked ? (
                <ButtonNav onClick={() => setClicked(!clicked)}>
                    <i class="fa fa-bars menu"></i>
                </ButtonNav>
            ): (
                <Navbar>
                    <div className='navbar-container'>
                        <div>
                            <Header>
                                <h2>Buscafé</h2>
                                
                                <button onClick={() => setClicked(!clicked)}>
                                    <i class="fa fa-bars menu"></i>
                                </button>
                            </Header>
                            <button className={`navbar-box btn-sidebar`}>
                                <Logo width="50px" height="50px" fundo="#ffbf00" cruz="#fff" id="logo-sidebar"/>
                                <span>
                                    <h3>{user?.localizacao.estado}</h3>
                                    <p>{user?.localizacao.cidade}</p>
                                </span>
                            </button>
                        </div>

                        
                        <SidebarItems>
                            {pagesSidebarUser.map(page =>{
                                return (
                                    <li id={window.location.pathname === page.to ? "active" : ""}>
                                        <Link to={page.to}>
                                            <span><i class={page.class}></i></span>
                                            <span>{page.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </SidebarItems>

                        <div>
                            <button className={`navbar-box btn-sidebar`}
                                onClick={() => history.push('/User/Profile')}
                            >
                                <ProgressiveImg
                                    src={user.image_url && user.image_url}
                                    alt="Imagem de Perfil"
                                    loadingWidth={60}
                                    loadingHeight={60}
                                />
                                    <span>
                                        <h3>{user?.usuario}</h3>
                                        <p>{user?.religiao}</p>
                                    </span>                      
                            </button>

                            <button onClick={Logout} className="navbar-box" id="logout">Sair</button>
                        </div>
                    </div>
                </Navbar>
            )}
        </>
    ) : (
        <>
            {clicked ? (
                <ButtonNav onClick={() => setClicked(!clicked)}>
                    <i class="fa fa-bars menu"></i>
                </ButtonNav>
            ): (
                <Navbar>
                    <div className='navbar-container'>
                        <div>
                            <Header>
                                <h2>
                                    Buscafé <br/> 
                                    <span style={{color: '#ffbf00'}}>Admin</span>
                                </h2>
                                
                                <button onClick={() => setClicked(!clicked)}>
                                    <i class="fa fa-bars menu"></i>
                                </button>
                            </Header>
                            <button className={`navbar-box btn-sidebar`}>
                                <Logo width="50px" height="50px" fundo="#ffbf00" cruz="#fff" id="logo-sidebar"/>
                                <span>
                                    <h3>{user?.localizacao.estado}</h3>
                                    <p>{user?.localizacao.cidade}</p>
                                </span>
                            </button>
                        </div>

                        <SidebarItems>
                            {pagesSidebarAdmin.map(page =>{
                                return (
                                    <li id={window.location.pathname === page.to ? "active" : ""}>
                                        <Link to={page.to}>
                                            <span><i class={page.class}></i></span>
                                            <span>{page.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </SidebarItems>

                        <div>
                            <button className={`navbar-box btn-sidebar`}
                                onClick={() => history.push('/Admin/Profile')}
                            >
                                <ProgressiveImg
                                src={user.image_url && user.image_url}
                                alt="Imagem de Perfil"
                                loadingWidth={60}
                                loadingHeight={60}
                                />
                                <span>
                                    <h3>{user?.usuario}</h3>
                                    <p>{user?.religiao}</p>
                                </span>                     
                            </button>
                            <button onClick={Logout} className="navbar-box" id="logout">Sair</button>
                        </div>
                    </div>  
                </Navbar>
            )}
        </>
    )
}