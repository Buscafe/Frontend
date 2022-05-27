import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { auxData } from './Data/AccordionData';
import { AccordionStyles } from './StyledComponents/Accourdion';

export default function MainAccordion(){
   
  return(
    <AccordionStyles>
       <h3>Veja nossas soluções abaixo!</h3>   
       <br />

    {/* Accordion */}   
    <div>      
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
    </AccordionStyles>
   )
}