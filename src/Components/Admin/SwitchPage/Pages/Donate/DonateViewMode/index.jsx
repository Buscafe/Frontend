import { DonateViewModeStyles } from "./styles"

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function DonateViewMode(){
    return (
        <DonateViewModeStyles>
            <div className="donate-container">
                <div className="donate-option">
                    OPÇÕES DE OFERTA
                </div>
                <div className="donate-box">
                    <Accordion className="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="donate-title">
                                PIX COM CHAVE
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="donate-key">
                                <strong>Chave: </strong>999
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="donate-title">
                                PRESENCIALMENTE NOS CULTOS
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="donate-key">
                                Endereço
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </DonateViewModeStyles>
        
    )
}
