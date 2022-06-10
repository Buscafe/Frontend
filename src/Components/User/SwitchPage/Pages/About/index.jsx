import { useEffect } from 'react';
import { useChurches } from "../../../../../hooks/useChurches";

import { Button } from 'semantic-ui-react'
import { Alert, Skeleton, Stack, Checkbox } from '@mui/material';

import { AboutViewModeStyles } from "./styles"

// Setting CheckBox
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function AboutViewMode(){
    const { church, getChurch, churchAbout, getChurchAbout } = useChurches();  
    
    useEffect(async () => {
        await getChurch(17);
        await getChurchAbout(17);
      }, [])
      

    return churchAbout.length != 0 ?(
        <AboutViewModeStyles>
            <div className="about-container">
                <div className="info-section">
                    <div className="info-title"> 
                        DESCRIÇÃO
                    </div>
                    
                    <div className="info-item">
                        {church.corpDesc}
                    </div>
                </div>
                {churchAbout.code === 2 ? (
                    <Alert severity='info'>{churchAbout.msg}</Alert> 
                ) : (
                    <>
                        <div className="info-section">
                            <div className="info-title">CONTATO</div>
                            <div className="info-item">
                                {churchAbout.cellphone}
                            </div>
                            <div className="info-item">
                                {churchAbout.email}
                            </div>
                        </div>

                        <div className="info-section">
                            <div className="info-title">REDES SOCIAIS</div>
                            <div className="info-item">
                                <a href={churchAbout.link}  target="_blank" class="link">{churchAbout.link}</a>
                            </div>
                        </div>
                        <div className="info-section">
                            <div className="info-title">INFORMAÇÕES DO TEMPLO</div>
                            <div className="info-item">
                                Número de assentos: <strong>{churchAbout.seats}</strong>
                            </div>

                            <div className="info-item">
                                {churchAbout.parking && "Possui Estacionamento"}
                            </div>

                            <div className="info-item">
                                {churchAbout.accessibility && "Possui Acessibilidade"}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AboutViewModeStyles>
    ):(
        <Stack spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </Stack> 
    ) 
}
