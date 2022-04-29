import styled from "styled-components";

export const ContainerMessage = styled.div`
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

    .messageBox{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem; 

        background-color: #080420;

        width: fit-content;
        border-radius: 7px;
    }

    .messageBoxOtherUser{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem; 
        background-color: #080420;

        margin-right: 65%;
        margin-left: 10%;
        border-radius: 7px;
        text-align: left;
    }
`;