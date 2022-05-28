import { useState } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { auxData } from './Data/AccordionData';
import { AccordionStyles } from './StyledComponents/Accourdion';

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from "@mui/material/InputAdornment";

export default function MainAccordion(){
  const [search, setSearch] = useState('')

  const lowerSearch = search.toLowerCase()
  console.log(auxData[0].title)
  console.log(auxData.filter((data)=> (data.title).toLowerCase().includes(lowerSearch)))
  const auxDataSearch = auxData.filter((data)=> (data.title, data.response).toLowerCase().includes(lowerSearch))

  const theme = createTheme({
    palette: {
      primary: {
        main: '#F3B72B',
      }
    },
  });
  return(
    <AccordionStyles>
       <h2 className="accordionTitle">Veja nossas soluções abaixo!</h2>   
       <br />
       <div id="chatSearch">
          <ThemeProvider theme={theme}>
              <TextField
                  id="input-with-icon-textfield"
                  label="Pesquise sua dúvida"
                  InputProps={{
                      startAdornment: (
                      <InputAdornment position="start">
                          <SearchIcon />
                      </InputAdornment>
                      )
                  }}
                  variant="standard"
                  value={search}
                  color="primary"
                  className="auxDataSearch"
                  onChange={(e) => setSearch(e.target.value)}
              />
          </ThemeProvider>
      </div>

    {/* Accordion */}   
    <div>      
        {auxDataSearch.map(aux=>{
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