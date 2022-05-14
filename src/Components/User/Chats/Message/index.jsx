export function Message(date, text, sender = false){
    return(
        <>
            { sender && ( <span>{sender}</span> )}
            <div>
                <p className="messageText">{text}</p>
                <time>{date}</time>
            </div>

        </>
    )
}