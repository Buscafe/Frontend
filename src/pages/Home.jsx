import { Entrada } from "../Components/Landing/Entrada/Entrada.jsx";
import { Localize } from "../Components/Landing/Localize/Localize.jsx";
import { Footer } from "../Components/Landing/Footer/Footer.jsx";

export function Home(){
    return(
        <>
           <Entrada/>
           <Localize/>
           <Footer/>
        </>
    );
}