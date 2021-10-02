import { Logo } from '../../Logo/Logo.jsx';
import { Button } from '../../Button/Button.jsx';
import { Title } from '../../Title/Title.jsx';

import './entrada.css';


export function Entrada(){
    return(
        <>
            <header> 
                <div className="row main-header">

                    <Logo width="80px" height="80px" fundo="#ffbf00" cruz="#fff" haveLink/>
                    
                    <nav className="headerMenu col-9 col-sm-7 col-md-6 col-lg-6 col-xl-5">
                        <ul>
                            <li>
                                <i className="fab fa-apple"></i>
                            </li>
                            <li>
                                <i className="fab fa-google-play"></i>
                            </li>
                            <li>
                                <Button className="btn-l" id="cadastro" location="/Login">Login</Button>
                            </li>
                            <li>
                                <Button className="btn-c" id="cadastro" location="/Cadastrar">Cadastro</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="intro row g-0" id="home"> 
                <Title 
                    titulo="Buscafé o Melhor Localizador de Igrejas"
                    paragrafo="Encontre as igrejas mais próximas a você."
                    buttonText="Cadastrar"
                />
                <Logo width="25rem" height="25rem" fundo="#fff" cruz="#ffbf00"/>
            </div>
        </>
    );
}