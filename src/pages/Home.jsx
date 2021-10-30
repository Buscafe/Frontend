import { Entrada } from "../Components/Landing/Entrada/Entrada.jsx";
import { Localize } from "../Components/Landing/Localize/Localize.jsx";
import { Estudos } from "../Components/Landing/Estudos/Estudos.jsx";


export function Home(){
    return(
        <div>
           <Entrada/>
           <Localize/>
           <Estudos/>
        </div>
    );
}