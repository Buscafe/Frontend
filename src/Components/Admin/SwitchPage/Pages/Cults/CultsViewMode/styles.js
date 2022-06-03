import styled from "styled-components";

export const CultsViewModeStyles = styled.div`
    .programation-container{
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 0.5rem;
        padding: 1rem;
        position: relative;
        color: #767676;
        font-family: sans-serif;
        margin-bottom: 5%;
        .day-container{
            margin-bottom: 1rem;
            color: #767676;
            .day-title{
                font-size: 1.4rem;
                font-weight: bolder;
                #dateIcon{
                    margin-right: 1%;
                    
                }
            }
            .cult-container{
                font-size: 14px;
                font-family: sans-serif;
                .cult-box{
                    background-color: #fff;
                    border: 1px solid #c8c8c8;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    padding: 1rem;
                    position: relative;
                    transition: color .3s;

                    .cult-title{
                        color: #767676;
                        font-size: 1.1rem;
                        font-weight: bold;
                    }
                }
            }       
        }
    }
`