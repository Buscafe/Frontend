import styled from 'styled-components';

export const DeviceStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background-color: #e0a928;

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;

        width: 60vw;
        height: auto;
        min-height: 70vh;

        padding: 20px 30px;
        border-radius: 5px;
        box-shadow: 0px 0px 15px  rgba(0, 0, 0, 0.07);
        background-color: var(--white);

        h1 {
            font-size: 45px;
            font-weight: bold;

            color: var(--primary-color);
        }

        p {
            font-size: 14px;
            text-align: center;
            font-weight: medium;

            width: 65%;
            color: var(--grey);
        }
    }
    
    #passwords{
        flex-direction: row;
    }
`
