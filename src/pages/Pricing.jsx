import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

import { Helmet } from 'react-helmet'
import { AiOutlineArrowRight } from "react-icons/ai";

import { CardContainer, PricingContainer, Card } from '../styles/Pricing'
import { getStripeJs } from "../services/stripe";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
        const { data } = await api.post('/subscribe',{
            priceId,
            successUrl: `${window.location.origin}/Admin/Home`,
            cancelUrl: `${window.location.origin}`
        });
        const stripe = await getStripeJs()
        
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
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
        </PricingContainer>
    )
}