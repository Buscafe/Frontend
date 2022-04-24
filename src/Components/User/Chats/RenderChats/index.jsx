import chatImg from '../../../../Assets/images/PersonImage.svg'

export function RenderChats({ chats }){
    const allChats = chats.map(chat => {
        return (
            <div className='eachUser'>
                <img className='userImageSearch' src={chatImg} alt="" />
                <div className='userName'>
                    <h3>{chat.name}</h3>
                </div>
                <span>1</span>
            </div>
        )
    })

    return allChats;
}