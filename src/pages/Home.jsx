import { Entrada } from "../Components/Landing/Entrada/Entrada.jsx";
import { Localize } from "../Components/Landing/Localize/Localize.jsx";
import { Celular } from "../Components/Landing/Celular/celular.jsx";
import { Footer } from "../Components/Landing/Footer/Footer.jsx";
import { Dados } from "../Components/Landing/Dados/Dados.jsx";

export function Home(){
    return(
        <>
           <Entrada/>
           <Localize/>
           {/* <Dados/> */}
           {/* <Celular/> */}
           <Footer/>
        </>
    );
}