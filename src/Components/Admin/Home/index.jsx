import { useAuth } from '../../../hooks/useAuth';

import { Tab, Tabs } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SwitchPage } from '../SwitchPage';
import { useState } from 'react';

import { Header, Content } from './style'

export function Home(){
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrentPage(newValue);
    };

    const theme = createTheme({
        palette: {
          primary: {
            main: '#F3B72B',
          },
        },
    });

    return(
        <>
            <Header>
                <svg viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26.5" cy="26.5" r="26.5" fill="var(--admin-color)"/>
                    <path d="M11.5625 42.0807C16.4754 29.307 33.8344 27.6694 40.7125 42.0807" stroke="#F3F3F3" stroke-width="3"/>
                    <circle cx="26.3016" cy="19.7708" r="7.67079" stroke="#F3F3F3" stroke-width="3"/>
                </svg>

                <p>{user.localizacao ? `${user.localizacao.estado}/${user.localizacao.cidade}` : 'Localização'}</p>
                <h1>{user.church ? `${user.church.name}` : 'Nome da Igreja'}</h1>
                <button id='afiliatte'>Filiar-se</button>

                    
                <ThemeProvider theme={theme}>
                    <div id='tabsContainer'>
                        <Tabs
                            value={currentPage}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="inherit"
                            indicatorColor="primary"
                            variant="fullWidth"
                            centered
                        >
                            <Tab label="Minha Igreja" value='Minha Igreja' />
                            <Tab label="Sobre" value='Sobre' />
                            <Tab label="Cultos" value='Cultos' />
                            <Tab label="Eventos" value='Eventos' />
                            <Tab label="Doações" value='Doações' />                    
                        </Tabs>
                    </div>
                </ThemeProvider>
            </Header>
       
            <Content>
                <SwitchPage page={currentPage}/>
            </Content>
       </>
    )
}