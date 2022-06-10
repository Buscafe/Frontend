import styled from "styled-components";

export const ChurchesStyles = styled.div`
    margin-left: ${ props => `${props.marginLeft}rem` };

    overflow: hidden;
    transition: 0.5s;

    .churches-container{
        margin-left: auto;
        margin-right: auto;
        padding-left: 2rem;
        padding-right: 5rem;
        margin-top: 1rem;

        .churches-box{
            padding: 1rem;
            background-color: #fff;
            border: 1px solid #c8c8c8;
            border-radius: 0.5rem;
            position: relative;
            transition: background-color .5s ease-in,border .25s ease-in;
        
            h1{
                line-height: 1.4;
                margin-bottom: 0.5rem;
                display: inline-block;
                margin-top: 0;
                font-size: 2rem;
                color: #767676;
                text-rendering: optimizeLegibility;
                font-family: sans-serif;
                font-style: normal;
                font-weight: bold;
            }
            .churches-total{
                background-color: #767676;
                border-radius: 0.75rem;
                color: #fff;
                font-family: monospace;
                display: inline-block;
                font-size: .75rem;
                line-height: .75rem!important;
                margin-bottom: 0.70rem;
                margin-left: 0.3rem;
                padding: 3px 6px;
                transition: background-color .3s;
                vertical-align: middle;
            }
        
            .search input{
                border: 1px solid #c8c8c8;
                border-radius: 5px;
                display: block;
                font-size: .9rem;
                padding: 0.75rem calc(0.5rem + 20px) 0.75rem 0.5rem;
                transition: border-color .3s,box-shadow .3s;
                width: 100%;
                font-family: inherit;
                line-height: 1.15;
                background-color: transparent;

                :focus {
                    box-shadow: 0 0 0 0;
                    outline: 0;
                }
            }

            .itens{
                display: flex;
                flex-wrap: wrap;
                font-family: sans-serif;
                margin: 0;

                .item{
                    flex: 0 1 calc(20%);
                    margin: 1.3rem;
                    width: calc(25% - 1.5rem);
                    color: #767676;
                    font-size: 2rem;
                    display: flex;
                    text-align: center;
                    flex-direction: column;
                    font-size: 2rem;
                    height: auto;
                    text-align: center;

                    .inner-item{
                        display: block;
                        flex-grow: 1;
                        position: relative;
                        transition: color .3s,border-color .3s;

                        .imagem-wrapper{
                            display: block;
                            margin: 0 auto 0.5rem;
                            max-width: 150px;
                            position: relative;
                        }
                        .address{
                            display: block;
                            color: #a2a2a2;
                            font-size: .75rem;
                            margin-bottom: 0.25rem;
                            text-transform: uppercase;
                        }
                        .name a{
                            display: block;
                            font-size: .95rem;
                            font-weight: 700;
                            text-transform: uppercase;
                            color: #767676;

                            :hover{
                                color: var(--admin-color);
                            }
                        }
                    }
                    .follow{
                        #affiliate {
                            border: 2px solid;
                            border-radius: 1rem;
                            background-color: var(--admin-color); 
                            font-size: .80rem;
                            color: #fff;
                            padding: 0.5rem;
                            
                            text-transform: uppercase;
                        }
                    }
                }
            }
        }
    }
    
`