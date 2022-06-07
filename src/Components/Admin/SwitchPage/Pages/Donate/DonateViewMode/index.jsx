import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { DonateViewModeStyles } from "./styles"

import { Alert, Accordion, AccordionSummary, AccordionDetails, IconButton, Skeleton, Stack  } from '@mui/material'
import {ExpandMore, HighlightOffSharp } from '@mui/icons-material';

export function DonateViewMode(){
    const { user, setUser } = useAuth();  
    const { setStepCompleted, churchDonates, getChurchDonates, deleteDonate } = useChurches();

    setStepCompleted(4)

    useEffect(async () => {
        await getChurchDonates(user.church ? user.church.id_corp : 0);
      }, [])

    async function handleDeleteDonate(id_donate){
        await deleteDonate(id_donate)
    }
    return churchDonates.length != 0 ?(
        <DonateViewModeStyles>
            <div className="donate-container">
                <div className="donate-option">
                    OPÇÕES DE OFERTA
                </div>
                <div className="donate-box">
                    {churchDonates.code === 2 ? (
                            <Alert severity="info">{churchDonates.msg}</Alert>
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
        
    ):(
        <Stack spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </Stack> 
    ) 
}
