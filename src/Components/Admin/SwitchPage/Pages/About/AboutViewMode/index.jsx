import { AboutViewModeStyles } from "./styles"

export function AboutViewMode(){
    return (
        <AboutViewModeStyles>
            <div className="about-container">
                <div className="info-section">
                    <div className="info-title">CONTATO</div>
                    <div className="info-item">
                        (99) 99999-9999 
                    </div>
                    <div className="info-item">
                        exemplo@exemplo.com
                    </div>
                </div>

                <div className="info-section">
                    <div className="info-title">REDES SOCIAIS</div>
                    <div className="info-item">
                        <a href="https://www.facebook.com.br" target="_blank" class="link">https://www.facebook.com.br</a>
                    </div>
                </div>
                <div className="info-section">
                    <div className="info-title">INFORMAÇÕES DO TEMPLO</div>
                    <div className="info-item">
                        Número de assentos: {}
                    </div>
                </div>
            </div>
        </AboutViewModeStyles>
        
    )
}
