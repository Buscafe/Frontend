import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

import { Helmet } from 'react-helmet'
import { AiOutlineArrowRight } from "react-icons/ai";

import { CardContainer, PricingContainer, Card } from '../styles/Pricing'
import { getStripeJs } from "../services/stripe";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import churchIcon from "../Assets/images/bxs_church.png"
import communityIcon from "../Assets/images/people_community.png"
import checkButtonG from "../Assets/images/buttonPositiveGreen.png"
import checkButtonB from "../Assets/images/buttonPositiveBlue.png"
import noneBar from "../Assets/images/none.png"

export function Pricing(){
    const history = useHistory();
    const [plans, setPlans] = useState([]);
    const { user } = useAuth()

    useEffect(async () => {
        const { data } = await api.get('/plans');
        
        if(data.err){
            throw new Error(data.err)
        }

        setPlans(data.plans);
    }, [])

    async function handleBuyPlan(priceId){
        try {
            const { data } = await api.post('/subscribe',{
                priceId,
                successUrl: `${window.location.origin}/Admin/Home`,
                cancelUrl: `${window.location.origin}`
            });
            
            const stripe = await getStripeJs()
            const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })    
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <PricingContainer>
            <Helmet>
                <title>Planos | Buscafé</title>
            </Helmet>

            <header>
                <h1>Comece a utilizar o <span>BuscaFé</span> gratuitamente!</h1>
                <p>Mude para o plano Premium para acessar recursos avançados e suporte profissional.</p>
            </header>

            <CardContainer>
                { plans.map(plan => {
                    return (
                        <div className={`card ${plan.name}`}>
                            <h1>{plan.name}</h1>
                            <p>{plan.description}</p>

                            <p id='price'>
                                <span>{plan.name === 'Comunidade' ? 'R$0' : 'R$ 60 '}</span>/ Mês
                            </p>
                            
                            <button onClick={() => handleBuyPlan(plan.default_price)}>Selecionar Plano <AiOutlineArrowRight/> </button>
                        </div>
                    )
                })}
            </CardContainer>
            <div>
                <table className="comparitionTable">
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
                </table>
            </div>

            <div className='infoField'>
                <div className="info">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into 
                    electronic typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                    and more recently with desktop publishing software like Aldus PageMaker 
                    including versions of Lorem Ipsum.
                </div>
                <div className="stats">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into 
                    electronic typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                    and more recently with desktop publishing software like Aldus PageMaker 
                    including versions of Lorem Ipsum.
                </div>
            </div>
        </PricingContainer>
    )
}