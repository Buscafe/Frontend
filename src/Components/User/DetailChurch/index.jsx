import { useEffect, useState } from 'react'; 
import { useAuth } from "../../../hooks/useAuth";
import { useChurches } from '../../../hooks/useChurches';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { Tab, Tabs} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SwitchPage } from '../SwitchPage';
import { Button } from 'semantic-ui-react'
import { toast } from "react-toastify";
import { ProgressiveImg } from '../../ProgressiveImg';

import { Header, Content } from './styles'

const theme = createTheme({
    palette: {
      primary: {
        main: '#F3B72B',
      },
    },
});

export function DetailChurch(){
    const { user } = useAuth(); 
    const { joinChurch, currentPageUser, setCurrentPageUser, setChurch} = useChurches()
    const { state } = useLocation();
    const { name } = useParams();
    const handleChange = (event, newValue) => {
        setCurrentPageUser(newValue);
    };
    const [isLoading, setIsLoading]   = useState(false);
    const [hasAffiliated, setHasAffiliated] = useState(false);

    useEffect(()=>{
        setChurch(state.church)
    },[])
    document.body.style.setProperty('--admin-color', state.church.color);

    async function handleJoin(e){
        e.preventDefault();
        setIsLoading(true)
        try {
            const { code } = await joinChurch(user.id_user, user.nome, state.church.id_corp, state.church.roomId, user.image_url );

            if(code === 1){
                toast.success(`Filiado a ${state.church.corpName} com sucesso`)
                toast.info(`Você entrou no Grupo Geral da Instituição!`)
                setHasAffiliated(true)
                setIsLoading(false)
            } else if (code === 4) {
                toast.info('Usuário já filiado')
                setIsLoading(false)
            } else {
                toast.error(`Houve um erro ao filiar-se com à igreja`)
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <>
            <Header>
                <div className='church'>
                    <div className='profilePhoto'>
                        <ProgressiveImg
                            src={state.church.image_url && state.church.image_url}
                            alt="Imagem de Perfil"
                            loadingWidth={225}
                            loadingHeight={225}
                            color={state.church.color}
                            flexibleColor
                        />
                    </div>
                </div>
                <p>
                    {`${state.church.localization.estado}/${state.church.localization.cidade}`}
                </p>
                <h1>{state.church.corpName}</h1>
                {!state.isAdmin && (
                    <Button 
                        type="submit" id="affiliate" 
                        onClick={handleJoin}
                        className={isLoading && 'loading'}
                    >   
                        FILIAR
                    </Button>
                )}
                    
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