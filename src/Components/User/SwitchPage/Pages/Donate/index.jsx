import { useEffect } from 'react';
import { useChurches } from "../../../../../hooks/useChurches";

import { DonateViewModeStyles } from "./styles"

import { Alert, Accordion, AccordionSummary, AccordionDetails, Skeleton, Stack  } from '@mui/material'
import {ExpandMore } from '@mui/icons-material';

export function DonateViewMode(){
    const { churchDonates, getChurchDonates } = useChurches();

    useEffect(async () => {
        await getChurchDonates(22);
      }, [])


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
                                    </AccordionDetails>
                                )
                            })}
                        </Accordion>
                    )}
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
