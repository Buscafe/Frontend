import './defaultPage.css';

export function DefaultPage({children, title, description}){
    return(
        <div className="deviceMain"> 
            <main className="newDevice">
                <h1>{title}</h1>
                <p>{description}</p>
                {children}
            </main>
        </div>
    )
}