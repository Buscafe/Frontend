import styled from "styled-components";

export const Container = styled.div`
    padding: 0.25rem;

    .churchDetails{
        padding: 0.5rem 0.5rem;
        h1{
            font-size: 1rem;
            text-align: center;
            text-transform: uppercase;
            line-height: 1.4;
            margin-bottom: 0.5rem;
            margin-top: 0;
            color: #767676;
            font-family: sans-serif;
        }
        p{
            color: #767676;
            font-weight: 300;
            font-size: 13px;
            text-align: center;
        }

        .Afilliate{
            display: flex;
            gap: 2rem;
            border-radius: 12px;
            color: #767676;
            font-weight: 700;
            margin: 0;
            text-align: center;
            text-transform: uppercase;
            transition: color .3s,background-color .3s!important;
            
            .btnAfilliate{
                width: 100%;
            }
        }
       .NotAfilliate{
            display: flex;
            gap: 2rem;
            border-radius: 12px;
            color: #767676;
            font-weight: 700;
            margin: 0;
            padding: 0.4rem;
            text-align: center;
            text-transform: uppercase;
            transition: color .3s,background-color .3s!important;
       }
    }
    
`