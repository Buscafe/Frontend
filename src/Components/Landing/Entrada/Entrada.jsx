import { Logo } from '../../Logo/Logo.jsx';
import { Button } from '../../Button/Button.jsx';
import { Title } from '../../Title/Title.jsx';

import { Header, Introduction } from'./entrada.js';

export function Entrada(){
    return(
        <>
            <Header> 
                <div className="row main-header">

                    <Logo width="80px" height="80px" fundo="#ffbf00" cruz="#fff" haveLink/>
                    
                    <nav className="headerMenu col-9 col-sm-7 col-md-6 col-lg-6 col-xl-5">
                        <ul>
                            {/* <li>
                                <i className="fab fa-apple"></i>
                            </li>
                            <li>
                                <i className="fab fa-google-play"></i>
                            </li> */}
                            <li>
                                <Button className="btn-l" id="cadastro" location="/Login">Login</Button>
                            </li>
                            <li>
                                <Button className="btn-c" id="cadastro" location="/Cadastro">Cadastro</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Header>

            <Introduction className="row g-0" id="home"> 
                <Title 
                    titulo="Buscafé o Melhor Localizador de Igrejas"
                    paragrafo2="Encontre as igrejas mais próximas a você."

                    buttonText1="Localizar"
                />
                <Logo width="25rem" height="25rem" fundo="#fff" cruz="#ffbf00" id="logo"/>
            </Introduction>
        </>
    );
}