import styled from "styled-components";

export const AboutViewModeStyles = styled.div`
    padding-bottom: 3%;
    .about-container{
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 0.5rem;
        padding: 1rem;
        position: relative;
        color: #767676;
        font-family: sans-serif;        
        .info-section {
            margin-top: 1rem;

            .info-title{
                display: flex;
                flex-direction: row;
                justify-content: space-betweenn;
                color: #767676;
                font-size: 1rem;
                font-weight: 900;
            }
            .info-item #cellphone, #email {
                border: 0;
                color: #767676;
                margin-top: 0.5rem;
            }
            #seats{
                width: fit-content;
                max-width: 100px;
                border: 0;
                color: #767676;
                margin-top: 0.5rem;
            }
            input:focus {
                box-shadow: 0 0 0 0;
                outline: 0;
            }
            #updateAbout {
                border: 2px solid var(--admin-color);
                border-radius: 0.25rem;
                background-color: transparent;  
                color: var(--black);;

                padding: 1rem;
                margin-bottom: 1rem;

                transition: 0.3s;

                text-transform: uppercase;
                &:hover{
                    background-color: var(--admin-color);
                    color: #fff;
                }
            }

        }
    }
`