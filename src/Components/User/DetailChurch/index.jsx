import { useEffect } from 'react'; 
import { useChurches } from '../../../hooks/useChurches';
import { Tab, Tabs} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SwitchPage } from '../SwitchPage';

import { Header, Content } from './styles'

const theme = createTheme({
    palette: {
      primary: {
        main: '#F3B72B',
      },
    },
});

export function DetailChurch(){
    const { currentPageUser, setCurrentPageUser, setChurch } = useChurches()
    const { state } = useLocation();
    const { name } = useParams();
    const handleChange = (event, newValue) => {
        setCurrentPageUser(newValue);
    };

    useEffect(()=>{
        setChurch(state.church)
    },[])
    return(
        <>
            <Header>
                <svg className='perfil' viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26.5" cy="26.5" r="26.5" fill="var(--admin-color)"/>
                    <path d="M11.5625 42.0807C16.4754 29.307 33.8344 27.6694 40.7125 42.0807" stroke="#F3F3F3" stroke-width="3"/>
                    <circle cx="26.3016" cy="19.7708" r="7.67079" stroke="#F3F3F3" stroke-width="3"/>
                </svg>

                <p>
                    {`${state.church.localization.estado}/${state.church.localization.cidade}`}
                </p>
                <h1>{state.church.corpName}</h1>
                <ThemeProvider theme={theme}>
                    <div id='tabsContainer'>
                        <Tabs
                            value={currentPageUser}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="inherit"
                            indicatorColor="primary"
                            variant="fullWidth"
                            centered
                        >
                            <Tab label="Sobre"      value='Sobre' />
                            <Tab label="Reuniões"   value='Reuniões' />
                            <Tab label="Eventos"    value='Eventos'  />
                            <Tab label="Doações"    value='Doações'  />                    
                        </Tabs>
                    </div>
                </ThemeProvider>
            </Header>
            <Content>
                <SwitchPage page={currentPageUser} />
            </Content>
       </>
    )
}