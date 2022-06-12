import { StyledReport } from "./StyledComponents/Report"
import { Input, TextArea } from "semantic-ui-react"

export function Report(){

return(
  <StyledReport>
    <div classname = 'master'>
      <h1 className="margin">Está com problemas, administrador?</h1>
      <h2 className="margin">Nos envie um reporte de seu problema, feedback ou sugestão.</h2>
      <h3 className="margin">Insira seu email:</h3>
      <div className="campo1 margin"> 
          <p>Email: </p>
            <Input className="input"
              type="email" placeholder='email@exemplo.com' 
            />
        </div>

      <div className="campo2 margin"> 
          <p>Descrição: </p>
              <TextArea className="textArea"
                type="descrição" placeholder='Escreva aqui seu problema ou sugestão!' 
              />
              <br />
              <button className="sendReport" type="submit">Enviar</button>

      </div>
    </div>
  </StyledReport>
  )       
}