import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { DonateViewModeStyles } from "./styles"

import { Alert, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import {ExpandMore, HighlightOffSharp } from '@mui/icons-material';

export function DonateViewMode(){
    const { user, setUser } = useAuth();  
    const { churchDonates, getChurchDonates, deleteDonate } = useChurches();

    useEffect(async () => {
        await getChurchDonates(user.church.id_corp);
      }, [])

    async function handleDeleteDonate(id_donate){
        await deleteDonate(user.church.id_corp, id_donate)
    }
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
                                expandIcon={<ExpandMore />}
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
                                        <IconButton onClick={()=> handleDeleteDonate(donate.id_meeting)} aria-label="delete" size="small" color="error">
                                            <HighlightOffSharp color='warning'/>
                                        </IconButton>

                                    </AccordionDetails>
                                )
                            })}
                        </Accordion>
                    )}
                    
                    <Accordion className="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
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
