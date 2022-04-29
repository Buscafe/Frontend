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
                background-color: #080420;
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
        background-color: #080420;
        color: white;
        margin-left: 0.1%;
        border-radius: 7px;
        padding: 1%;    
    }

    /* fundo da div das conversas */
    .backgroundConversation{
        background-color: #080420;
        text-align: center;
        border-radius: 10px;
        padding: 2rem;
    }

    /* div da busca dos contatos */
    .users{
        background-color: #080420;
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