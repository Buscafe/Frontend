import {HelpStyles} from "./styles"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
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
          <h3>Veja nossas soluções abaixo!</h3>
          <br />
          <Accordion className="accordion">
            <AccordionSummary  
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Como se filiar a uma Igreja?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Como encontrar uma Igreja?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Como posso usar a página de Chat?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
      </Accordion>
        </div>
      </HelpStyles>
  )

}