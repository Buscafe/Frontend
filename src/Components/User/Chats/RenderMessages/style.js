import styled from "styled-components";

export const ContainerMessage = styled.div`


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