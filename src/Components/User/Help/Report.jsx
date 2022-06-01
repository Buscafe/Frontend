import { StyledReport } from "./StyledComponents/Report"
import { Input, TextArea } from "semantic-ui-react"

export function Report(){

return(
  <StyledReport>
    <div classname = 'master'>
        <div className="campo1 margin"> 
            <p>Email: </p>
              <Input className="input"
                type="email" placeholder='email@exemplo.com' 
              />
          </div>

        <div className="campo2 margin"> 
            <p>Descrição: </p>
                <TextArea className="textArea"
                  type="descrição" placeholder='Escreva aqui seu feedback!' 
                />
                <br />
                <button className="sendReport" type="submit">Enviar</button>

        </div>
    </div>
  </StyledReport>
  )       
}