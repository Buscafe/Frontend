import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";

import { DonateViewModeStyles } from "./styles"

import { Alert, Accordion, AccordionSummary, AccordionDetails, Skeleton, Stack  } from '@mui/material'
import {ExpandMore } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react'

export function DonateViewMode(){
    const { user } = useAuth();  
    const { churchDonates, getChurchDonates, setChurchDonates, deleteDonate } = useChurches();
    const [isLoading, setIsLoading]   = useState(false);


    useEffect(async () => {
        await getChurchDonates(user.church ? user.church.id_corp : 0);
      }, [])

    async function handleDeleteDonate(id_donate){
        setIsLoading(true)
        const donateDeleted = await deleteDonate(id_donate)
        setChurchDonates(churchDonates.filter(donate => donate.id_donate != id_donate ))
        setIsLoading(false)
        toast.success(donateDeleted.msg)
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
                                        <Button 
                                            type="submit" id="delete" 
                                            onClick={() => handleDeleteDonate(donate.id_donate)}
                                            className={isLoading && 'loading'}
                                        >
                                            deletar
                                        </Button>  
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
