import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    padding-top: 2%;
    
    transition: 0.5s;

    /* div do chat */
    .chat{
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 80vh;
        margin: 3% 5% 0 0;

        /* div das conversas */
        .conversation{
            background-color: #2D2C2C;
            color: #fff;
            border-radius: 7px;
            padding: 1%;

            height: 100%;
            width: 100%;
            
            /* campo de enviar as mensagens */
            input{
                width: 74%;
                padding: 0.5%;
                background-color: #2D2C2C;
                border: 1px solid transparent;
                color: #FFF;
            }

            /* botão de enviar */
            button{
                background-color: #F5B726;
                color: #FFF;
                font-weight: bold;
                padding: 0.5% 2%;
                border: 1px solid transparent;
            }

            /* fundo da div das conversas */
            .backgroundConversation{
                background-color: #4F4F4F;
                text-align: center;
                border-radius: 10px;
                padding: 2rem;

                height: 100%;

                /* mensagem */
                .messages{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 2rem;

                    text-align: right;
                    padding: 0 9%;
                    overflow-y:scroll;
                    height: 100%;
                    
                    ::-webkit-scrollbar {
                        width: 10px;
                    }

                    /* Track */
                    ::-webkit-scrollbar-track {
                        box-shadow: inset 0 0 5px #4F4F4F; 
                        border-radius: 10px;
                    }

                    /* Handle */
                    ::-webkit-scrollbar-thumb {
                        background: #F5B726; 
                        border-radius: 10px;
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                        background: #F5B726; 
                    }
                }

                /* caixa da mensagem */
                .messageBox{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem; 

                    background-color: #2D2C2C;
                    padding: 1.5%;
                    width: fit-content;
                    border-radius: 7px;

                    /* imagem do usuário na mensagem */
                    .userImage{
                        width: 40px;
                    }

                    & + .left{
                        align-self: flex-start;
                    }
                }
            }
        }

        /* div da busca dos contatos */
        .users{
            background-color: #2D2C2C;
            color: #fff;
            border-radius: 10px;
            padding: 1%;
            
            overflow-y: scroll;
            height: 100%;
            width: 50%;

            ::-webkit-scrollbar {
                width: 10px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px #4F4F4F; 
                border-radius: 10px;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #F5B726; 
                border-radius: 10px;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #F5B726; 
            }

            /* título de buscar contato */
            .searchPeople{
                background-color: #4F4F4F;
                padding-top: 1%;
                text-align: center;
                border-radius: 10px;
            }

            .eachUser{
                display: flex;
                align-items: center;
                justify-content: space-between;

                padding: 5%;
                margin-top: 2%;

                background-color: #4F4F4F;
                border-radius: 10px;

                span{
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background-color: var(--red);
                    border-radius: 50%;
                    padding: 0.5rem;

                    width: 9%;
                    height: 9%;
                }
            }

            .userName{
                text-align: left;
                padding-left: 5%;
            }

            .userImageSearch{
                width: 40px;
            }
        }
    }    
`