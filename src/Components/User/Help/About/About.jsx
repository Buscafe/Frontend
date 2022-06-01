import {AboutStyles} from "./styles"

export function About(){
  return(
    
    <AboutStyles>
      <div className="container1">
        <div>
          <h1>Sobre nós:</h1>
            <br />
          <p>
            Nós somos uma equipe de programadores cursando Desenvolvimento de Sistemas
            na ETEC de Embu, este projeto se trata de nosso TCC, trabalhamos para podermos
            servir a vocês, usuários, um ótimo sistema.
          </p>
        </div>
          <br /><br />
        <div>
          <h1>Sobre o Projeto BuscaFé:</h1>
          <br />
          <p>
            Neste projeto, visamos a união entre o religioso e a instituição religiosa, 
            onde sentimos que, no dia a dia, as instituições religiosas não se comunicam
            muito com os participantes dos seus cultos e eventos no geral
          </p>
        </div>
      </div>
    </AboutStyles>
  )
}