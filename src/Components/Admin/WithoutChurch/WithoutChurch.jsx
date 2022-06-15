import { Container } from './styles.js'

export function WithoutChurch({ marginLeft, children }){
    return(
        <Container marginLeft={marginLeft}>
            {children}
        </Container>
    )
}