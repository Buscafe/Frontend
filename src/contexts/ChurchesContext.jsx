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

    return(
        <ChurchesContext.Provider value={ { churches, getAllChurches } }>
            {children}
        </ChurchesContext.Provider>
    );
}
