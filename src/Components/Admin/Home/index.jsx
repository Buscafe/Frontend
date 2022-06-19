import { useEffect, useState } from 'react';
import { Tab, Tabs, FormGroup, Stack, Badge } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../../hooks/useAuth';
import { useChurches } from '../../../hooks/useChurches';

import { ChoiceModeSwitch } from '../ChoiceModeSwitch';
import { SwitchPage } from '../SwitchPage';
import { ModalProfilePhoto } from '../ModalProfilePhoto';
import { ProgressiveImg } from '../../ProgressiveImg';

import { Header, Content } from './style'


export function Home(){
    const { user } = useAuth();
    const { theme, getChurch, getChurchAbout, currentPage, setCurrentPage } = useChurches()
    const [modalProfileIsOpen, setModalProfileIsOpen] = useState(false);
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
                <div id='profileButton'>
                    <button onClick={() => setModalProfileIsOpen(true)}>
                        <Badge color="primary" overlap="circular" badgeContent='Mudar Foto'>
                            <ProgressiveImg
                                src={user.image_url && user.image_url}
                                alt="User profile photo"
                                loadingWidth={240}
                                loadingHeight={240}
                            />
                        </Badge>
                    </button>
                </div>
                <p>{user.localizacao ? `${user.localizacao.estado}/${user.localizacao.cidade}` : 'Localização'}</p>
                <h1>{user.church ? `${user.church.name}` : 'Nome da Igreja'}</h1>
                <ThemeProvider theme={theme}>
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
                            <Tab label="Sobre"      value='Sobre'     disabled={user.church ? false: true} />
                            <Tab label="Reuniões"   value='Reuniões'  disabled={user.church ? false: true} />
                            <Tab label="Eventos"    value='Eventos'   disabled={user.church ? false: true} />
                            <Tab label="Doações"    value='Doações'   disabled={user.church ? false: true} />                    
                        </Tabs>
                    </div>
                </ThemeProvider>
            </Header>
       
            <Content>
                <SwitchPage page={currentPage} checked={checked}/>
            </Content>

            <ModalProfilePhoto
                isOpen={modalProfileIsOpen}
                setIsOpen={setModalProfileIsOpen}
                userId={user.id_user}
            />
       </>
    )
}