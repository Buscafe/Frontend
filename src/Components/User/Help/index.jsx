// Imports - Carousel
import   Carousel   from '../Help/Carousel.jsx'
import { CarouselData } from "./Data/CarouselData";

//Imports - Accordion
import { AccordionStyles } from "./StyledComponents/Accourdion"
import  MainAccordion  from "../Help/Accordion"

//Import - Reports
import { Report }   from '../Help/Report.jsx'

//Import -  About
import { About } from "./About/About";

import { Footer } from "./Footer/Footer.jsx"


import logobuscafe from '../../../Assets/images/logo-buscafe.svg';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useState, useEffect } from "react";
// import { useAuth } from '../../../../hooks/useAuth';



export function Help({ marginLeft }){
  // const [clicked, setClicked] = useState(false);
  // const { signed } = useAuth();
  // const history = useHistory();
  
  // if(!signed){
  //   history.push('/Login');
  // }

  return(
    <div>
      <AccordionStyles marginLeft={marginLeft}>
        <div className="titleArea">
          <img className="logoBuscafe" src={logobuscafe}/>
          <h1 className="helpTitle">Precisa de Ajuda?</h1>
          <br /><br />
        </div> 
      
      
          {/* Carrosel de imagens */}
          <Carousel marginLeft={marginLeft}
          slides = {CarouselData}
          />

          {/* Accordion */}
          <MainAccordion/>
          <br /><br />
        <Report/>

        <About/>
        <div>
        <Footer/>
        </div>
        
      </AccordionStyles>
    </div>       
  )
}