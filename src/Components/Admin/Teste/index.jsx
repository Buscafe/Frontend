import { AppBar, Tab, Tabs } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import PersonImg from '../../../Assets/images/PersonImage.svg'
import { Header } from './style'

export function Teste(){
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = createTheme({
        palette: {
          primary: {
            main: '#F3B72B',
          },
        },
      });

    return(
       <Header>
            <img src={PersonImg} alt="Church Photo"/>
            <p>São Paulo/SP</p>
            <h1>DEPÓSITO DE LITERATURA CRISTÃ</h1>
            <button id='afiliatte'>Filiar-se</button>
            
            <ThemeProvider theme={theme}>
                <div id='tabsContainer'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="inherit"
                        indicatorColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Minha Igreja" value={0} />
                        <Tab label="Sobre" value={1} />
                        <Tab label="Cultos" value={2} />
                        <Tab label="Eventos" value={3} />
                        <Tab label="Doações" value={4} />                    
                    </Tabs>
                </div>
            </ThemeProvider>
       </Header>
    )
}