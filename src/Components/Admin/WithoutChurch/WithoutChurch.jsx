import { Container } from './styles.js'

export function WithoutChurch({ marginLeft, title }){
    return(
        <Container marginLeft={marginLeft}>
            <h1>Cadastre a sua igreja para ter acesso ao <br/><span>{title}</span></h1>
        </Container>
    )
}