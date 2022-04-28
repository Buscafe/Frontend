import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    padding-top: 2%;
    transition: 0.5s;

    /* conteúdo da página */
    .content{
        padding-top: 2%;
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            width: 75vw;
            
            /* listbox das igrejas filiadas
            obs.: a estilização do Dropdown só
            funciona ao chamar por ID*/
            #dropdownChurchs{
                background-color: #2D2C2C;
                border-radius: 7px;
                color: var(--white);
            }
        }
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
        padding: 1%;
        
        
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
            padding: 0.5% 2%;
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
    /* .noConversationText {
        position: absolute;
        font-size: 50px;
        color: rgb(224, 220, 220);
        cursor: default;
    }    */
     /* mensagem */
     .messages{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        min-height: 63vh;
        max-height: 63vh;
        text-align: right;
        padding: 0 9%;
        overflow-y:scroll;
        
        ::-webkit-scrollbar {
            width: 10px;
            border-radius: 10px;
            background: #4F4F4F;
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
    }

    .messageBoxOtherUser{
        background-color: #2D2C2C;
        padding: 1.5%;
        margin-right: 65%;
        margin-left: 10%;
        border-radius: 7px;
        text-align: left;
    }
    .messageBottom{
        font-size: 12px;
        margin-bottom: 1%;
    }

    /* div da busca dos contatos */
    .users{
        background-color: #2D2C2C;
        color: white;
        border-radius: 10px;
        padding: 1% 1% 1% 1%;
        overflow-y:scroll;
        min-height: 80vh;
        max-height: 80vh;

        ::-webkit-scrollbar {
            width: 10px;
            border-radius: 10px;
            background: #4F4F4F;
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
`