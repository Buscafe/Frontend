import { Entrada } from "../Components/Landing/Entrada/Entrada.jsx";
import { Localize } from "../Components/Landing/Localize/Localize.jsx";
import { Celular  } from "../Components/Landing/Celular/celular.jsx";

export function Home(){
    return(
        <div>
           <Entrada/>
           <Localize/>
           <Celular/>
        </div>
    );
}