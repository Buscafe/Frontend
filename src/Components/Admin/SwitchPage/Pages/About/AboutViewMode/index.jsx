import { useEffect } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useChurches } from "../../../../../../hooks/useChurches";


import { Alert } from '@mui/material';

import { AboutViewModeStyles } from "./styles"

export function AboutViewMode(){
    const { user, setUser } = useAuth();  
    const { churchAbout, getChurchAbout } = useChurches();

    useEffect(async () => {
        await getChurchAbout(user.church.id_corp);
      }, [])
    return (
        <AboutViewModeStyles>
            <div className="about-container">
                {churchAbout.code === 2 ? (
                        <Alert severity="info">{churchAbout}</Alert>
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
        
    )
}
