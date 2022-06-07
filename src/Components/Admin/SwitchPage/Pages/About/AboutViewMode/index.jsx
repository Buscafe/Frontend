import { useEffect } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";


import { Alert, Skeleton, Stack } from '@mui/material';

import { AboutViewModeStyles } from "./styles"

export function AboutViewMode(){
    const { user, setUser } = useAuth();  
    const { setStepCompleted, churchAbout, getChurchAbout } = useChurches();

    setStepCompleted(1)

    useEffect(async () => {
        await getChurchAbout(user.church ? user.church.id_corp : 0);
      }, [])

    return churchAbout.length != 0 ? (
        <AboutViewModeStyles>
            <div className="about-container">
                {churchAbout.code === 2 ? (
                        <Alert severity="info">{churchAbout.msg}</Alert>
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
                                {churchAbout.parking && (
                                    <div className="info-item">
                                        Compõe estacionamento próprio
                                    </div>
                                )}
                                {churchAbout.accessibility && (
                                    <div className="info-item">
                                        Compõe acessibilidade aos deficientes
                                    </div>
                                )}
                            </div>
                        </>
                )}
            </div>
        </AboutViewModeStyles>
    ): (
        <Stack spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
        </Stack>  
    )
}
