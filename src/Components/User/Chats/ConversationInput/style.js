import styled from "styled-components";

export const ConversationInputStyled = styled.div`
    background-color: var(--background);
    padding: 0.5rem 2rem;

    div {
        display: flex;
        flex-direction: row;
        align-items: space-between;
        gap: 1rem;
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }


    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;

        .emoji{
            position: relative;

            svg {
                font-size: 1.5rem;
                color: #FFBE00;
                cursor: pointer;
            }

            .emoji-picker-react{
                position: absolute;
                top:-350px;
            }
            
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: var(--background-dark);
                box-shadow: 0 5px 10px var(--background);
                border-color: #fff;
            
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: var(--background-dark);
                    width: 5px;
                    &-thumb {
                        background-color: var(--primary-color);
                    }
                }

                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }

                .emoji-search {
                    background-color: transparent;
                    border-color: #fff;
                }

                .emoji-group:before {
                    background-color: var(--background-dark);
                }

            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
        &::selection {
            background-color: #9a86f3;
        }
        &:focus {
            outline: none;
        }
    }
    button {
        background-color: #F5B726;
        color: #FFF;
        font-weight: bold;
        border: 1px solid transparent;
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.3rem 1rem;
            svg {
            font-size: 1rem;
            }
        }
        svg {
            font-size: 2rem;
            color: white;
        }
    }
    input[type="file"] {
        display: none;
    }

  }
`