import { Logo } from '../Components/Logo/Logo.jsx';
import { Button } from '../Components/Button/Button.jsx';
import { Title } from '../Components/Title/Title.jsx';

import notFoundLogo from '../Assets/images/logo-not-found.png'

import { Header, Introduction } from '../styles/notFound'

export function  NotFound(){
    return (
        <>
            <Header> 
                <div className="row main-header">

                    <Logo width="80px" height="80px" fundo="#ffbf00" cruz="#fff" haveLink/>
                    
                    <nav className="headerMenu col-9 col-sm-7 col-md-6 col-lg-6 col-xl-5">
                        <ul>
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
                    titulo="Não sabe onde você está ?"
                    paragrafo2="Nós também não fazemos ideia"

                    buttonText1="Voltar para página inicial"
                    location="/"
                />
                <img src={notFoundLogo} alt="Logo buscafé not found" id='logo'/>
            </Introduction>
        </>
    )
}