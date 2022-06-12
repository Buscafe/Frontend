import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useChurches } from '../../../hooks/useChurches';

import { Tab, Tabs, FormGroup, Stack } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { CustomizedSteppers } from '../Steppers'
import { ChoiceModeSwitch } from '../ChoiceModeSwitch';
import { SwitchPage } from '../SwitchPage';

import { Header, Content } from './style'


export function Home(){
    const { user } = useAuth();
    const { theme, church, getChurch, churchAbout, getChurchAbout, currentPage, setCurrentPage } = useChurches()
    const [checked, setChecked] = useState(true);

    const handleChange = (event, newValue) => {
        setCurrentPage(newValue);
    };
    useEffect(() => {
        if(user.church){
            document.body.style.setProperty('--admin-color', user.church.color);
        }
      }, []);

    useEffect(async () => {
        await getChurchAbout(user.church ? user.church.id_corp : 0);
        await getChurch(user.church ? user.church.id_corp : 0);
      }, [])
    return(
        <>
            <Header>
                <svg className='perfil' viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26.5" cy="26.5" r="26.5" fill="var(--admin-color)"/>
                    <path d="M11.5625 42.0807C16.4754 29.307 33.8344 27.6694 40.7125 42.0807" stroke="#F3F3F3" stroke-width="3"/>
                    <circle cx="26.3016" cy="19.7708" r="7.67079" stroke="#F3F3F3" stroke-width="3"/>
                </svg>

                <p>{user.localizacao ? `${user.localizacao.estado}/${user.localizacao.cidade}` : 'Localização'}</p>
                <h1>{user.church ? `${user.church.name}` : 'Nome da Igreja'}</h1>
                <ThemeProvider theme={theme}>
                    <CustomizedSteppers />
                    <FormGroup>
                        <Stack direction="row" spacing={1} alignItems="center">
                        <div>CRIAR</div>
                        <ChoiceModeSwitch 
                            inputProps={{ 'aria-label': 'ant design' }} 
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked) }
                        />
                        <div>EDITAR</div>
                        </Stack>
                    </FormGroup>
                    
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
                            <Tab label="Meu templo" value='Meu templo' />
                            <Tab label="Sobre"      value='Sobre'     disabled={church.code === 2 ? true : false} />
                            <Tab label="Reuniões"   value='Reuniões'  disabled={church.code === 2 && churchAbout.code === 2 ? true : false} />
                            <Tab label="Eventos"    value='Eventos'   disabled={church.code === 2 && churchAbout.code === 2 ? true : false} />
                            <Tab label="Doações"    value='Doações'   disabled={church.code === 2 && churchAbout.code === 2 ? true : false} />                    
                        </Tabs>
                    </div>
                </ThemeProvider>
            </Header>
       
            <Content>
                <SwitchPage page={currentPage} checked={checked}/>
            </Content>
       </>
    )
}