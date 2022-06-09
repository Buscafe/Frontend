import styled from "styled-components";

export const EventsViewModeStyles = styled.div`
    padding-bottom: 3%;
    .programation-container{
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 0.5rem;
        padding: 1rem;
        position: relative;
        color: #767676;
        font-family: sans-serif;
        
        .day-container{
            color: #767676;
            .day-title{
                font-size: 1.4rem;
                font-weight: bolder;
                #dateIcon{
                    margin-right: 1%;
                }
            }
            .event-container{
                font-size: 14px;
                font-family: sans-serif;
                .event-box{
                    background-color: #fff;
                    border: 1px solid #c8c8c8;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    padding: 1rem;
                    position: relative;
                    transition: color .3s;
                    margin-bottom: 3%;
                    .event-title{
                        color: #767676;
                        font-size: 1.1rem;
                        font-weight: bold;
                    }
                }
            }       
        }
    }
`