import { Entrada } from "../Components/Landing/Entrada/Entrada.jsx";
import { Localize } from "../Components/Landing/Localize/Localize.jsx";


export function Home(){
    return(
        <div>
           <Entrada/>
           <Localize/>
        </div>
    );
}