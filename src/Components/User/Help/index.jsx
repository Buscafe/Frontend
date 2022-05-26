import {HelpStyles} from "./styles"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import  Carousel  from '../Help/Carousel.jsx'
import { CarouselData } from "./Data/CarouselData";
import { auxData } from './Data/AccordionData'
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
      <HelpStyles marginLeft={marginLeft}>
        <div>
          <h1 className="helpTitle">Precisa de Ajuda?</h1>
          <br /><br />
          {/* Carrosel de imagens */}
          <Carousel
          slides = {CarouselData}
          />
          {/* Accordion */}
          <h3>Veja nossas soluções abaixo!</h3>
         
          <br />

          {auxData.map(aux=>{
            return(
              <Accordion className="accordion">
                <AccordionSummary  
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{aux.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {aux.response}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      </HelpStyles>
  )

}