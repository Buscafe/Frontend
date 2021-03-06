import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from "semantic-ui-react";
import { Modal, TextField, CircularProgress } from "@mui/material";

import { useAuth } from "../hooks/useAuth";
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

import { Church, Forum, Event, Map, Paid, CurrencyExchange} from '@mui/icons-material';

import { CardContainer, PricingContainer, ModalStyles, ComparitionTable, InfoField, PlanInfo, Info } from '../styles/Pricing'
import { toast } from "react-toastify";
import sign from "jwt-encode";

export function Pricing(){
    const { user, setUser } = useAuth()
    const history = useHistory();
    const [plans, setPlans] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [priceId, setPriceId] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');

    const [stripe, setStripe] = useState(null)

    useEffect(() => {
        const stripeKey = process.env.REACT_APP_STRIPE_API_KEY
        const stripeUrl = 'https://js.stripe.com/v3/'

        if (!document.querySelector('#stripe-js')) {
            const script = document.createElement('script')
            script.async = true
            script.id = 'stripe-js'
            script.onload = () => {
                setStripe(window.Stripe(stripeKey))
            }
            document.body.appendChild(script)
            script.src = stripeUrl
        } else if (window.Stripe) {
            setStripe(window.Stripe(stripeKey))
        }

        return () => {
            window.location.reload()
        }
    }, [])

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
                id_user: user.id_user,
                cpf,
                cnpj
            });

            if(data.err){
                toast.error(data.msg);
                setIsLoading(false);
                throw new Error(data.err);
            }
           
            setUser({...user, id_doc: data.id_doc});
            localStorage.setItem('CheckoutSession', JSON.stringify(data.session));
            localStorage.setItem('Token', sign({...user, id_doc: data.id_doc }, process.env.REACT_APP_SECRET_JWT))

            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId: data.session.id });
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <>
            <PricingContainer>
                <Helmet>
                    <title>Planos | Buscaf??</title>
                </Helmet>

                <header>
                    <h1>Comece a utilizar o <span>BuscaF??</span> gratuitamente!</h1>
                    <p>Mude para o plano Premium para acessar recursos avan??ados e suporte profissional.</p>
                </header>

                <CardContainer>
                    { plans.length === 0 && <CircularProgress/> }
                    { plans.map(plan => {
                        return plan.name === 'Comunidade' ? (
                            <div className={`card ${plan.name}`}>
                                <h1>{plan.name}</h1>
                                <p>{plan.description}</p>

                                <p id='price'>
                                    <span>R$0</span>/ M??s
                                </p>
                                
                                <button onClick={() => history.push('/Admin/Home')}>
                                    Selecionar Plano <AiOutlineArrowRight/> 
                                </button>
                            </div>
                        ): (
                            <div className={`card ${plan.name}`}>
                                <h1>{plan.name}</h1>
                                <p>{plan.description}</p>

                                <p id='price'>
                                    <span>R$ 60</span>/ M??s
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
                        <td className="actions titleTable"><p>A????es</p></td>
                        <td className="communityRow titleTable">
                            <img src={communityIcon} alt="??cone Pessoas" />
                            <p>Comunidade</p>
                        </td>
                        <td className="comercialRow titleTable"> 
                            <img src={churchIcon} alt="??cone de Igreja" />
                            <p>Comercial</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="actions">Localizador</td>
                        <td ><div className="checkButton"><img src={checkButtonG} alt="??cone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Chats</td>
                        <td ><div className="checkButton"><img src={checkButtonG} alt="??cone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Ajuda</td>
                        <td ><div className="checkButton"><img src={checkButtonG} alt="??cone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Cadastrar Igreja</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="??cone de Certo" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Administrar Chats</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="??cone de Vazio" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Administrar Fieis</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="??cone de Vazio" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                    <tr>
                        <td className="actions">Dashboard</td>
                        <td ><div className="checkButton"><img src={noneBar} alt="??cone de Vazio" /></div></td>
                        <td ><div className="checkButton"><img src={checkButtonB} alt="??cone de Certo" /></div></td>
                    </tr>
                </ComparitionTable>


                <InfoField>
                    <div className="info">
                        " Gostei muito de utilizar o plano comercial, posso gerenciar todos os fieis e al??m disso,
                        gerenciar o chat com todos os fieis. J?? cadastrei minha igreja no mapa do localizador. 
                        ??timo servi??o!!! "
                        <div>
                            <img className="userIcon" src={userIcon} alt="??cone do Usu??rio" />
                            <p>Luis Fernando P. B. Pereira</p>
                        </div>
                    </div>
                    <div className="stats">
                        <div>
                            <div>
                                <h1>3.2K</h1>
                                <p>Usu??rios Registrados</p>
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
                    <h1>Valor de <span>Mercado</span></h1>
                    <div className="container">
                        <Info>
                            <span>
                                <Paid />
                                <h3>Valor total do projeto</h3>
                            </span>
                            <p>Aproximadamente <strong>23 mil reais.</strong> Calculado o valor de meses de desenvolvimento de uma equipe de 8 integrantes, junto com o custo de hospetagem do site e do banco. </p>
                        </Info>
                        <Info>
                            <span>
                                <CurrencyExchange /> 
                                <h3>Plano mensal e Lucros</h3>
                            </span>
                            <p><strong>60,00 reais.</strong> Visando que o projeto se pague em 1 ano, com cerca de 30 igrejas pagantes por m??s.</p>
                           <p>Segundo essa conta em 5 anos teremos <strong>86.400,00 reais</strong> de lucro.</p>
                        </Info>
                    </div>
                </PlanInfo>


                <PlanInfo>
                    <h1>Principais Informa????es Sobre o <span>Plano Comercial</span></h1>
                    <div className="container">
                        <Info>
                            <span>
                                <Church />
                                <h3>Cadastrar Igreja</h3>
                            </span>
                            <p>A institui????o pode cadastrar suas informa????es como nome, descri????o, reuni??es, fornecer meio de oferta e at?? personalizar a forma como ser?? vista pela usu??rio.
                                Al??m de poder ser vista no mapa pelos usu??rios. </p>
                        </Info>
                        <Info>
                            <span>
                                <Forum /> 
                                <h3>Chat</h3>
                            </span>
                            <p>Pode-se criar e organizar chats de conversa, deletar ou adicionar usu??rios e personalizar uma descri????o.</p>
                        </Info>
                        <Info>
                            <span>
                                <Event />
                                <h3>Eventos</h3>
                            </span>
                            <p>Al??m de todas essas funcionalidades, a institui????o pode criar eventos e cadastra-los no localizador, tendo um nome, descri????o, data e hor??rio.</p>
                        </Info>
                        <Info>
                            <span>
                                <Map />
                                <h3>Localizador</h3>
                            </span>
                            <p>?? onde ser?? listado todos os eventos e principalmente onde ter?? o templo registrado.</p>
                        </Info>
                    </div>
                </PlanInfo>

               
            </PricingContainer>

            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <ModalStyles>
                    <h3>Estamos quase l??...</h3>
                    <p>Informe o os dados necess??rios para prosseguir</p>
                    
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
                            <Button 
                                type="submit" id="next" 
                                className={isLoading && 'loading'}
                            >
                                Avan??ar
                            </Button>
                        </span>
                    </form>
                </ModalStyles>
            </Modal>
        </>
    )
}