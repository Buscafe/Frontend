import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { AiOutlineArrowRight } from "react-icons/ai";
import { Modal, TextField, CircularProgress } from "@mui/material";

import { api } from "../services/api"
import { getStripeJs } from "../services/stripe";
import { formatCPF } from '../helper/formatCPF'
import { formatCNPJ } from '../helper/formatCNPJ'

import churchIcon from "../Assets/images/bxs_church.png"
import communityIcon from "../Assets/images/people_community.png"
import checkButtonG from "../Assets/images/buttonPositiveGreen.png"
import checkButtonB from "../Assets/images/buttonPositiveBlue.png"
import noneBar from "../Assets/images/none.png"
import userIcon from "../Assets/images/PersonImage.svg"

import { Church, Forum, Event, Map} from '@mui/icons-material';

import { CardContainer, PricingContainer, ModalStyles, ComparitionTable, InfoField, PlanInfo, Info } from '../styles/Pricing'
import { Button } from "semantic-ui-react";

export function Pricing(){
    const history = useHistory();
    const [plans, setPlans] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [priceId, setPriceId] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');

    useEffect(async () => {
        const { data } = await api.get('/plans');
        
        if(data.err){
            throw new Error(data.err)
        }

        setPlans(data.plans);
    }, [])

    const handleOpenInsertInfos = (inputPriceId) => {
        setPriceId(inputPriceId);
        setModalIsOpen(true)
    }

    async function handleBuyPlan(e){
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.post('/subscribe',{
                priceId,
                successUrl: `${window.location.origin}/Admin/Home`,
                cancelUrl: `${window.location.origin}`,
                cpf,
                cnpj
            });
            
            if(data.err){
                setIsLoading(false)
                throw new Error(data.err);
            }

            localStorage.setItem('CheckoutSession', JSON.stringify(data.session));
            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId: data.sessionId });
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <>
            <PricingContainer>
                <Helmet>
                    <title>Planos | Buscafé</title>
                </Helmet>

                <header>
                    <h1>Comece a utilizar o <span>BuscaFé</span> gratuitamente!</h1>
                    <p>Mude para o plano Premium para acessar recursos avançados e suporte profissional.</p>
                </header>

                <CardContainer>
                    { plans.length === 0 && <CircularProgress/> }
                    { plans.map(plan => {
                        return plan.name === 'Comunidade' ? (
                            <div className={`card ${plan.name}`}>
                                <h1>{plan.name}</h1>
                                <p>{plan.description}</p>

                                <p id='price'>
                                    <span>R$0</span>/ Mês
                                </p>
                                
                                <button onClick={() => history.push('/Admin/Home')}>Selecionar Plano <AiOutlineArrowRight/> </button>
                            </div>
                        ): (
                            <div className={`card ${plan.name}`}>
                                <h1>{plan.name}</h1>
                                <p>{plan.description}</p>

                                <p id='price'>
                                    <span>R$ 60</span>/ Mês
                                </p>
                                
                                <Button 
                                    onClick={() => handleOpenInsertInfos(plan.default_price)}
                                    className={isLoading && 'loading'}
                                >
                                    Selecionar Plano<AiOutlineArrowRight/>
                                </Button>
                            </div>
                        )
                    })}
                </CardContainer>

                <ComparitionTable>
                    <tr>
                        <td className="actions titleTable"><p>Ações</p></td>
                        <td className="communityRow titleTable">
                            <img src={communityIcon} alt="Ícone Pessoas" />
                            <p>Comunidade</p>
                        </td>
                        <td className="comercialRow titleTable"> 
                            <img src={churchIcon} alt="Ícone de Igreja" />
                            <p>Comercial</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="actions">Localizador</td>
                        <td ><div className="checkButton"><img src={checkButtonG} alt="Ícone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Chats</td>
                        <td ><div className="checkButton"><img src={checkButtonG} alt="Ícone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Ajuda</td>
                        <td ><div className="checkButton"><img src={checkButtonG} alt="Ícone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Cadastrar Igreja</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="Ícone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Administrar Chats</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="Ícone de Vazio" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Administrar Fieis</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="Ícone de Vazio" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Dashboard</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="Ícone de Vazio" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="Ícone de Certo" /></div></td>
                    </tr>
                </ComparitionTable>


                <InfoField>
                    <div className="info">
                        " Gostei muito de utilizar o plano comercial, posso gerenciar todos os fieis e além disso,
                        gerenciar o chat com todos os fieis. Já cadastrei minha igreja no mapa do localizador. 
                        Ótimo serviço!!! "
                        <div>
                            <img className="userIcon" src={userIcon} alt="Ícone do Usuário" />
                            <p>Luis Fernando P. B. Pereira</p>
                        </div>
                    </div>
                    <div className="stats">
                        <div>
                            <div>
                                <h1>3.2K</h1>
                                <p>Usuários Registrados</p>
                            </div>
                            <div>
                                <h1>1.3K</h1>
                                <p>Estrelas no Github</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1>2.6K</h1>
                                <p>Igrejas Registradas</p>
                            </div>
                            <div>
                                <h1>17K</h1>
                                <p>Seguidores no Instagram</p>
                            </div>
                        </div>
                    </div>
                </InfoField>


                <PlanInfo>
                    <h1>Principais Informações Sobre o <span>Plano Comercial</span></h1>
                    <div className="container">
                        <Info>
                            <span>
                                <Church />
                                <h3>Cadastrar Igreja</h3>
                            </span>
                            <p>A instituição pode cadastrar suas informações como nome, descrição, reuniões, fornecer meio de oferta e até personalizar a forma como será vista pela usuário.
                                Além de poder ser vista no mapa pelos usuários. </p>
                        </Info>
                        <Info>
                            <span>
                                <Forum /> 
                                <h3>Chat</h3>
                            </span>
                            <p>Pode-se criar e organizar chats de conversa, deletar ou adicionar usuários e personalizar uma descrição.</p>
                        </Info>
                        <Info>
                            <span>
                                <Event />
                                <h3>Eventos</h3>
                            </span>
                            <p>Além de todas essas funcionalidades, a instituição pode criar eventos e cadastra-los no localizador, tendo um nome, descrição, data e horário.</p>
                        </Info>
                        <Info>
                            <span>
                                <Map />
                                <h3>Localizador</h3>
                            </span>
                            <p>É onde será listado todos os eventos e principalmente onde terá o templo registrado.</p>
                        </Info>
                    </div>
                </PlanInfo>
            </PricingContainer>
            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <ModalStyles>
                    <h3>Estamos quase lá...</h3>
                    <p>Informe o os dados necessários para prosseguir</p>
                    
                    <form onSubmit={handleBuyPlan}>
                        <span>
                            <TextField
                                id="standard-basic"
                                label="CPF"
                                placeholder="999.999.999-99"
                                fullWidth
                                value={formatCPF(cpf)}
                                color="primary"
                                inputProps={{ maxLength: 14 }}
                                variant="standard"
                                type="text"
                                onChange={e => setCpf(e.target.value)}
                                required
                            />
                            <TextField
                                id="standard-basic"
                                label="CNPJ"
                                placeholder="XX.XXX.XXX/0001-XX"
                                fullWidth
                                value={formatCNPJ(cnpj)}
                                color="primary"
                                inputProps={{ maxLength: 18 }}
                                variant="standard"
                                type="text"
                                onChange={e => setCnpj(e.target.value)}
                                required
                            />
                        </span>

                        <span>
                            <button id="cancel" onClick={()=>{setModalIsOpen(false)}}>Sair</button>
                            <button id="next" type='submit'>Avançar</button>
                        </span>
                    </form>
                </ModalStyles>
            </Modal>
        </>
    )
}