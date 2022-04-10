import { createContext, useState } from "react";
import { api } from '../services/api';

export const ChurchesContext = createContext({});

export function ChurchesContextProvider({ children }){
    const [churches, setChurches] = useState([]);

    async function getAllChurches(religion){
        try {
            const { data } = await api.get(`/allChurches/${religion}`);

            if(data.err){
                throw new Error(data.err)
            }

            setChurches(data)
            return data;
        } catch (err) {
            console.error(err)
        }
    }

    async function joinChurch(id_user, id_church){
        try {
            const { data } = await api.post(`/affiliate`, { id_user, id_church });
            
            if(data.err){
                throw new Error(data.err)
            }

            return data;
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <ChurchesContext.Provider value={ { churches, getAllChurches, joinChurch } }>
            {children}
        </ChurchesContext.Provider>
    );
}
