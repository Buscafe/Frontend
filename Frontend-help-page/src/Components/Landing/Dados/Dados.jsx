import PersonImage from '../../../Assets/images/PersonImage.svg'

import { DadosStyles, CardBoxContainer } from './Dados.js'

const depoimentos = [
    {
      title: 'Gabriel Lima',
      description: [
        'Gostei muito de como o localizador funciona, consegui encontrar uma ótima igreja próxima a minha casa',
      ],
    },
    {
      title: 'Igor Costa Braz',
      description: [
        'Depois que encontrei o site, recomendei o uso para a igreja que frequento e até agora só tivemos ganhos',
      ],
    },
    {
      title: 'Kaike Rocha',
      description: [
        'Adorei a ideia de inovar e trazer mais tecnologias ao mundo das religiões !',
      ],
    },
  ];

export function Dados(){
    return(
      <DadosStyles>
        <div className='rowInfos'>

          <div className='rowInfosBox'>
            <h4>Igrejas:</h4>
            <div>00023</div>
          </div>

          <div className='rowInfosBox'>
            <h4>Usuários:</h4>
            <div>00030</div>
          </div>

          <div className='rowInfosBox'>
            <h4>Acessos:</h4>
            <div>00055</div>
          </div>
        </div>

        <CardBoxContainer>
            {depoimentos.map(depoimento => {
              return(
                <div className='cardBoxHome'>
                    <div>
                        <img src={PersonImage} alt="Imagem de perfil" />
                        <h3>{depoimento.title}</h3>
                    </div>

                    <p>{depoimento.description}</p>
                </div>
              );
            })}
        </CardBoxContainer>
      </DadosStyles>
    );
}