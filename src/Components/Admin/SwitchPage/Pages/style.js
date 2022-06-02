import styled from "styled-components";

export const Container = styled.div`
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
`

export const CreateRoomStyles = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        #infos {
            display: flex;
            flex-direction: column;

            label {
                font-size: 1rem;
                margin-bottom: 0.5rem; 
                color: #29292e;
            }
            input {
                background-color: #29292e;
                border: none;
                border-radius: 0.25rem;
                height: 2.5rem;
                padding: 0 1rem;
                color: #fff;

                &:focus{
                    outline: none;
                }
            }
        }
        #createChurch {
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
`
export const AboutStyles = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        #createAbout {
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
`