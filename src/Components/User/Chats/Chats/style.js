import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };

    overflow: hidden;
    transition: 0.5s;

    div {
        .chat{
            display: flex;
        }
        /* listbox das igrejas filiadas
        obs.: a estilização do Dropdown só
        funciona ao chamar por ID*/
        #dropDownChurches{
            width: 100%;

            background-color: transparent;
            color: var(--white);
            
            border: 2px solid var(--primary-color);
            border-radius: 7px;

            margin-bottom: 1rem;

            transition: 0.3s;

            &:hover{
                border-color: #ffbe00;
            }
        }

        /* div das conversas */
        .conversation{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-top: 2.5rem;
            color: white;
            background-color: var(--background);
            border-radius: 0 0.5rem 0.5rem 0;
            
            padding: 1%;
            height: 90vh;

            .messages{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 1.0rem;
                

                padding: 0 5%;
                margin-top: 5%;
                text-align: right;

                overflow-y:scroll;
                height: 100%;
                
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
        }

        /* Pesquisar grupo */
        .MuiTextField-root{
            margin-bottom: 5px;
        }
        
        /* Listagem de chats */
        .users{
            background-color: var(--background);
            color: white;
            border-radius: 0.5rem 0 0 0.5rem;
            padding: 1%;
            overflow-y: scroll;
            height: 90vh;
            margin-top: 2.5rem;
            
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
    }
    .searchChats{
        width: 100%;
    }
`

export const ChatsStylesAdmin = styled(ChatsStyles)`
    #addChat {
        display: flex;
        justify-content: center;
        align-items: center;

        background: var(--primary-color);
        border: none;
        border-radius: 0.5rem;
        color: #fff;

        font-size: 1.2rem;
        font-weight: 500;

        width: 100%;
        height: 3rem;
        margin-bottom: 1.5rem;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.95);
        }
    }
`