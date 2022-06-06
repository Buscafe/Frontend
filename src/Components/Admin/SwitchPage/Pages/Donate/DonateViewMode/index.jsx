import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { DonateViewModeStyles } from "./styles"

import { Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function DonateViewMode(){
    const { user, setUser } = useAuth();  
    const { churchDonates, getChurchDonates } = useChurches();

    useEffect(async () => {
        await getChurchDonates(user.church.id_corp);
      }, [])

    return (
        <DonateViewModeStyles>
            <div className="donate-container">
                <div className="donate-option">
                    OPÇÕES DE OFERTA
                </div>
                <div className="donate-box">
                    {churchDonates.code === 2 ? (
                            <Alert severity="info">{churchDonates}</Alert>
                    ) : (
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
                            {(churchDonates).map(donate =>{
                                return (
                                    <AccordionDetails>
                                        <div className="donate-key">
                                            <strong>{donate.key_type}: </strong>{donate.donate_key}
                                        </div>
                                    </AccordionDetails>
                                )
                            })}
                        </Accordion>
                    )}
                    
                    <Accordion className="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="donate-title">
                                PRESENCIALMENTE NAS REUNIÕES
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
