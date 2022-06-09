import styled from "styled-components";

export const AddChurchViewModeStyles = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .containerGoogleMaps{
        width: 100%;
        height: 40vh;
        border: 2px solid var(--admin-color);
        border-radius: 1rem;
    }
    .churchInfo-container{
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 0.5rem;
        padding: 1rem;
        position: relative;
        color: #767676;
        font-family: sans-serif;
        margin-bottom: 5%;
        .info-section {
            margin-top: 1rem;

            .info-title #corpName{
                border: 0;
                width: 100%;
                color: #767676;
                font-size: 1rem;
                font-weight: 900;
                text-transform: uppercase;
                resize: none;
            }
            textarea:focus {
                box-shadow: 0 0 0 0;
                outline: 0;
            }
            .info-item #corpDescription{
                border: 0;
                width: 100%;
                color: #767676;
                margin-top: 0.5rem;
                resize: none;
            }
            #updateChurch {
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