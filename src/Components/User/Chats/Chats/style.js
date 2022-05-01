import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };
    margin-top: 2.5rem;
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

        /* div da busca dos contatos */
        .users{
            background-color: var(--background);
            color: white;
            border-radius: 0.5rem 0 0 0.5rem;
            padding: 1%;
            overflow-y: scroll;
            height: 90vh;

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
    }
`