import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    
    transition: 0.5s;

    /* conteúdo da página */
    .content{
        padding-top: 2%;
        /* height: 100vh; */
    }

    /* div do chat */
    .chat{
        display: flex;
        flex-wrap: wrap;
        margin-top: 3%;
    }

    /* div das conversas */
    .conversation{
        background-color: #2D2C2C;
        color: white;
        margin-left: 0.1%;
        border-radius: 7px;
        padding: 1% 1% 1% 1%;
        
        
        /* campo de enviar as mensagens */
        input{
            width: 74%;
            padding: 0.5%;
            background-color: #2D2C2C;
            border: 1px solid transparent;
            color: #FFF;
            margin-bottom: 1%;
        }

        /* botão de enviar */
        button{
            background-color: #F5B726;
            color: #FFF;
            font-weight: bold;
            padding-left: 2%;
            padding-right: 2%;
            padding-top: 0.5%;
            padding-bottom: 0.5%;
            border: 1px solid transparent;
            
            
        }
    
    }

    /* fundo da div das conversas */
    .backgroundConversation{
        background-color: #4F4F4F;
        text-align: center;
        border-radius: 10px;
        padding: 2rem;
    }
     /* mensagem */
     .messages{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2rem;
        min-height: 63vh;
        max-height: 63vh;

        text-align: right;
        padding: 0 9%;
        overflow-y:scroll;
        
        
         
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

    .messageBoxOtherUser{
        background-color: #2D2C2C;
        padding: 1.5%;
        margin-right: 65%;
        margin-left: 10%;
        border-radius: 7px;
        text-align: left;
    }

    /* div da busca dos contatos */
    .users{
        background-color: #2D2C2C;
        color: white;
        border-radius: 10px;
        padding: 1% 1% 1% 1%;
        overflow-y:scroll;
        min-height: 85vh;
        max-height: 85vh;

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

    /* título de buscar contato */
    .searchPeople{
        background-color: #4F4F4F;
        padding-top: 1%;
        text-align: center;
        border-radius: 10px;
    }

    .eachUser{
        background-color: #4F4F4F;
        padding: 5%;
        margin-top: 2%;
        align-items: center;
        display: flex;
        border-radius: 10px;
        justify-content: space-between;

        span{
            background-color: var(--red);
            border-radius: 100%;
            padding: 0.5rem;
            width: 9%;
            height: 9%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .userName{
        text-align: left;
        padding-left: 5%;

    }

    .userImageSearch{
        width: 40px;
    }
   
    
`