import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: 10%;
    margin-left: ${ props => `${props.marginLeft}rem` };
    
    /* conteúdo da página */
    .content{
        padding-top: 2%;
        height: 100vh;
    }

    /* div do chat */
    .chat{
        display: flex;
        margin-top: 3%;
    }

    /* div das conversas */
    .conversation{
        background-color: #2D2C2C;
        color: white;
        width: 64%;
        margin-left: 0.1%;
        margin-right: 3%;
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
    }
     /* mensagem */
     .messages{
        text-align: right;
        padding-top: 1%;
        padding-right: 9%;
        overflow-y:scroll;
        min-height: 70vh;
        max-height: 70vh;
         
        ::-webkit-scrollbar {
        width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: #F5B726; 
        border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background: #b30000; 
        }
    }

    /* caixa da mensagem */
    .messageBox{
        background-color: #2D2C2C;
        padding: 1.5%;
        margin-left: 75%;
        border-radius: 7px;
    }

    /* imagem do usuário na mensagem */
    .userImage{
        width: 40px;
    }

    /* div da busca dos contatos */
    .users{
        background-color: #2D2C2C;
        color: white;
        width: 30%;
        border-radius: 10px;
        padding: 1% 1% 1% 1%;

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
        padding-top: 5%;
        padding-bottom: 5%;
        margin-top: 2%;
        /* text-align: center; */
        align-items: center;
        display: flex;
    }

    .userName{
        text-align: left;
        padding-left: 5%;

    }

    .userImageSearch{
        width: 40px;
        
    }
   
    
`