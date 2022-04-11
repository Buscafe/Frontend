import styled from "styled-components";

export const ChatsStyles = styled.div`
    margin-left: 10%;
    margin-left: ${ props => `${props.marginLeft}rem` };
    
    .content{
        padding-top: 2%;
    }

    .chat{
        display: flex;
        margin-top: 3%;
    }
    .conversation{
        background-color: #2D2C2C;
        color: white;
        width: 74%;
        margin-left: 0.1%;
        margin-right: 3%;
        border-radius: 7px;
        padding: 1% 1% 1% 1%;
        
        input{
            width: 74%;
            padding: 0.5%;
            background-color: #2D2C2C;
            border: 1px solid transparent;
            color: #FFF;
        }

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

    .users{
        background-color: #2D2C2C;
        color: white;
        width: 20%;
        border-radius: 10px;
        padding: 1% 1% 1% 1%;

    }

    .searchPeople{
        background-color: #4F4F4F;
        padding-top: 1%;
        text-align: center;
        border-radius: 10px;
    }

    .backgroundConversation{
        background-color: #4F4F4F;
        text-align: center;
        border-radius: 10px;
        padding-top: 50% ;
    }
`