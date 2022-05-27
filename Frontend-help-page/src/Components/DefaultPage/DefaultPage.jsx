import { DeviceStyles } from './defaultPage.js';

export function DefaultPage({children, title, description}){
    return(
        <DeviceStyles> 
            <main className="newDevice">
                <h1>{title}</h1>
                <p>{description}</p>
                {children}
            </main>
        </DeviceStyles>
    )
}