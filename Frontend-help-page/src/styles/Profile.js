import styled from 'styled-components'

export const ProfileStyles = styled.main`
    display: flex;
    justify-content: center;

    gap: 4rem;
    width: 100vw;
    height: auto;

    background-color: #121214;
    color: #fff;

    .profile-box{
        width: fit-content;
        min-width: 576px;
        height: fit-content;
        padding: 20px;
        margin: 5rem 0;
        border-radius: 0.25rem;

        background-color: #202024;

        h2{
            font-weight: 600;
            font-size: 2.3rem;
        }

        h4{
            color: #585862;
            font-weight: 400;
            font-size: 1rem;
        }

        div{
            background-color: #29292e;
            padding: 1rem;
            border-radius: 0.25rem;
            color: #fff;
        }
    }

    .profile-menu{
        display: flex;
        flex-direction: column;

        top: 100px;
        width: 352px;
        position: sticky;
        overflow: hidden;
        padding: 0;

        & a + a{
            margin-top: 1rem;  
        }

        a{
            padding: 1rem;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            color: #fff;

            transition: 0.2s;

            &:hover{
                background-color: #3a3a3f;
                border-left: 2px solid var(--primary-color);

                transition: 0.2s;
            }
        }
    }
`

export const IpBox = styled.div`
    width: fit-content;
    min-width: 576px;
    height: fit-content;
    padding: 20px;
    margin: 5rem 0;
    border-radius: 0.25rem;

    background-color: #202024;

    h2 {
        font-weight: 600;
        font-size: 2.3rem;
    }

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 1rem;
        
        thead {
            th {
                padding: 0 1rem;
                color: #585862;
                font-weight: 400;
                font-size: 1rem;
            }
        }
        
        tbody {
            tr{
                background-color: #29292e;
                color: #fff;

                td {
                    padding: 1rem;

                    &:first-child {
                        border-radius: 0.25rem 0px 0px 0.25rem;
                    }
                    &:last-child {
                        border-radius: 0px 0.25rem 0.25rem 0px;
                    }

                }

                #main{
                    color: var(--green);
                }
            }
        }
    }
`

export const ChurchesBox = styled.div`
    width: fit-content;
    min-width: 576px;
    height: fit-content;
    padding: 20px;
    margin: 5rem 0;
    border-radius: 0.25rem;

    background-color: #202024;

    h2 {
        font-weight: 600;
        font-size: 2.3rem;
    }
`