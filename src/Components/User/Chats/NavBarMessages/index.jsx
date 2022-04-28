import { useChat } from '../../../../hooks/useChat'
import { useAuth } from '../../../../hooks/useAuth';



export function NavbarMessages({msg}){   
    const { chats } = useChat();

    return(
        <div className='nav'>
            <h2>{msg}</h2>
            {/* <h2>{chats[0].name}</h2> */}
        </div>
    )
}