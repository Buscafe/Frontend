import logobuscafe from '../../../Assets/images/logo-buscafe.svg';
import { Button } from '../../Button/Button';

import './footer.css'

export default function Footer(){
  return(
<div>
    <div className="underMobile">
      <img id="logo-buscafe" src={logobuscafe} alt="Logo do buscafe"/> 
    </div>

    <div className="FooterTxt">
      <h1 id="buttonTop">Ajudando você a</h1>
    </div>
    
    <div className='buttonLocation'>
      <Button className="btnLocaliza" id="localizar" location="*">Localizar</Button>
    </div>
     
    <div className="FooterTxt">
      <h1 id="buttonTop">
        Buscamos inovar o meio religioso, trazendo soluções 
        tecnológicas imersivas para o dia a dia das instituições religiosas.
      </h1>
    </div>
     
</div>    
  )
}
