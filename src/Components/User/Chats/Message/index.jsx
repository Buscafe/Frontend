export function Message(hora, minuto, text, sender = false){
    return(
        <>
            { sender && ( <span>{sender}</span> )}
            <div>
                <p className="messageText">{text}</p>
                <time>{`${hora}:${minuto}`}</time>
            </div>
        </>
    )
}