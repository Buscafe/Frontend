import styled from "styled-components";

export const Container = styled.div`
    padding: 0.25rem;

    img{
        display: block;
        width: 40%;
        margin-bottom: 1rem;
    }

    .event-container{
        font-size: 14px;
        font-family: sans-serif;
        .event-box{
            background-color: #fff;
            border-radius: 0.5rem;
            margin-top: 1rem;
            padding: 1rem;
            position: relative;
            transition: color .3s;
            margin-bottom: 3%;
            .event-title{
                color: #767676;
                font-size: 1.4rem;
                font-weight: bold;
            }
        }
    }       
`