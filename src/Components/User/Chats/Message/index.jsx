export function Message(message, hora, minuto){   
    
    return(
        <>
            <div>{message.sender}</div>
            <p className="messageText">{message.value}</p>   
            <div>{`${hora}:${minuto}`}</div>    
        </>
    )
}