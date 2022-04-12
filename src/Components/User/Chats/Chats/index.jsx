import { useState } from 'react';
import { ChatsStyles } from './styles.js';
import userIMG from '../../../../Assets/images/PersonImage.svg';


export default function Chats(){
    return(
        <ChatsStyles >
            
            <div className='content'>

                <h1>Conecte com sua Igreja, Igor.</h1>

                <div className='chat'>

                    <div className='users'>
                        <div className='searchPeople'> <h2>Buscar contato</h2> </div>

                        <div className='eachUser'>
                            <img className='userImageSearch' src={userIMG} alt="" />
                            <div className='userName'>Clodovildo Santana</div>
                        </div>
                        <div className='eachUser'>
                            <img className='userImageSearch' src={userIMG} alt="" />
                            <div className='userName'>Xablau Ferreira dos Santos</div>
                        </div>
                    </div>

                    <div className='conversation'>
                        <div className='backgroundConversation'>
                            <div className='messages'>
                                <div className='userMessage'>
                                    <img className='userImage' src={userIMG} alt="" />    
                                    <div className='messageBox'>
                                        Bom dia seus lindos!!!
                                    </div>
                                </div>
                                
                            </div>
                            <br />
                            <input type="text" className='messageField'/>
                            <button type='submit' className='sendButton'>Enviar</button>
                        </div>
                    </div>

                </div>

            </div>
        </ChatsStyles>
    );
}