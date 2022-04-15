import userIMG from '../../../../Assets/images/PersonImage.svg';

import { ChatsStyles } from './style.js';


export default function Chats({ marginLeft }){
    return(
        <ChatsStyles marginLeft={marginLeft}>
            <h1>Conecte com sua Igreja, Igor.</h1>

            <div className='chat'>
                <div className='users'>
                    <div className='searchPeople'> <h2>Buscar contato</h2> </div>

                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>1</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>5</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>8</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>2</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>6</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>10</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>4</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>7</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>2</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>2</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>3</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>3</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>5</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>9</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Clodovildo Santana</h3></div>
                        <span>1</span>
                    </div>
                    <div className='eachUser'>
                        <img className='userImageSearch' src={userIMG} alt="" />
                        <div className='userName'><h3>Xablau Ferreira dos Santos</h3></div>
                        <span>1</span>
                    </div>
                </div>

                <div className='conversation'>
                    <div className='backgroundConversation'>
                        <div className='messages'>
                            <div className='messageBox'>
                                Bom dia seus lindos!!!
                                <img className='userImage' src={userIMG} alt="" />
                            </div>
                            <div className='messageBox left'>
                                <img className='userImage' src={userIMG} alt="" />
                                Bom dia seus feio!!!
                            </div>
                        </div>
                        
                        <input type="text" className='messageField'/>
                        <button type='submit' className='sendButton'>Enviar</button>
                    </div>
                </div>
            </div>
        </ChatsStyles>
    );
}