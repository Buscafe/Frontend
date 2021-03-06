import styled from "styled-components";

export const DonateViewModeStyles = styled.div`
    .donate-container{
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 0.5rem;
        padding: 1rem;
        position: relative;
        color: #767676;
        font-family: sans-serif;
        margin-bottom: 5%;
        .donate-option{
            line-height: 1.4;
            margin-bottom: 0.5rem;
            font-weight: 700;
            font-size: 20px;
        }
        .donate-box{
            .donate-title{
                color: #767676;
                font-size: 1rem;
                font-weight: 700;
                margin-top: 1rem;
            }
        }      
        #delete {
            border: 2px solid;
            border-radius: 1rem;
            background-color: var(--red); 
            font-size: .80rem;
            color: #fff;;
            padding: 0.5rem;
            text-transform: uppercase;
        }         
    }
`