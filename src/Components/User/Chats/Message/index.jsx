import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function Message(message, sender ,anchorEl, setAnchorEl, setCurrentMessage){
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setCurrentMessage(message)
    };

    // Setting date
    const date = new Date(message.createdAt)
    const time = date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()

    return(
        <>
            {message.status === "deleteMensagem"  || 
             message.status === "updateUser"      || 
             message.status === "deleteUser"      ? (
                <div>
                    <p className="messageText">{message.value}</p>
                </div>
            ): sender ? (
                    <>
                        <span id='sender'>{sender}</span> 
                        <div>
                            <p className="messageText">{message.value}</p>
                            <time>{time}</time>
                        </div>
                    </>
            ): (
                <div>
                    <p className="messageText">{message.value}</p>
                    <span>
                        <time>{time}</time>
                            <>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    style={{padding: 0}}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </>
                    </span>
                </div>
            )}         
        </>
    )
}