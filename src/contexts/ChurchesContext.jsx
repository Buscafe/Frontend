import { createContext, useState } from "react";
import { api } from '../services/api';

export const ChurchesContext = createContext({});

export function ChurchesContextProvider({ children }){
    const [churchesMap, setChurchesMap] = useState([]);
    const [relations, setRelations] = useState([]);

    async function getAllChurches(idUser, religion){
        try {
            const { data } = await api.get(`/allChurches/${idUser}/${religion}`);

            if(data.err){
                throw new Error(data.err)
            }
            setRelations(data.relations)
            setChurchesMap(data.churches)
            console.log(churchesMap)
            return data;
        } catch (err) {
            console.error(err)
        }
    }

    async function joinChurch(id_user, username, id_church, roomId){
        try {
            const { data } = await api.post(`/affiliate`, { id_user, username, id_church, roomId });
            
            if(data.err){
                throw new Error(data.err)
            }

            return data;
        } catch (err) {
            console.error(err)
        }
    } 

    return(
        <ChurchesContext.Provider value={ { churchesMap, getAllChurches, joinChurch, relations } }>
            {children}
        </ChurchesContext.Provider>
    );
}
