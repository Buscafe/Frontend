import { ChatsStyles } from './styles.js';

export default function Chats(){
    return(
        <ChatsStyles>
            
            <div className='content'>

                <h1>Conecte com sua Igreja, Igor.</h1>

                <div className='chat'>

                    <div className='users'>
                        <div className='searchPeople'> <h3>Buscar contato</h3> </div>

                        <div className='eachUser'>

                        </div>
                        <div className='eachUser'>

                        </div>
                    </div>

                    <div className='conversation'>
                        <div className='backgroundConversation'>
                            dkfjghfgifgidsfgidsfjuhgdsjkhg
                            <br />
                            <input type="text"/>
                            <button type='submit'>Enviar</button>
                        </div>
                    </div>

                </div>

            </div>
        </ChatsStyles>
    );
}