import { createContext, useState } from "react";
import { api } from '../services/api';

export const ChurchesContext = createContext({});

export function ChurchesContextProvider({ children }){
    const [churches, setChurches] = useState([]);

    async function getAllChurches(religion){
        const { data } = await api.get(`/allChurches/${religion}`);

        if(data){
            setChurches(data)
            return data;
        } else {
            throw new Error('Cannot get allChurches')
        }
    }

    return(
        <ChurchesContext.Provider value={ { churches, getAllChurches } }>
            {children}
        </ChurchesContext.Provider>
    );
}
