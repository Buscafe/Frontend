import { createContext, useState } from "react";
import { api } from '../services/api';

export const ChurchesContext = createContext({});

export function ChurchesContextProvider({ children }){
    const [churchesMap, setChurchesMap] = useState([]);
    const [relations, setRelations] = useState([]);
    const [church, setChurch] = useState([])
    const [churchAbout, setChurchAbout] = useState([])
    const [churchMeeting, setChurchMeeting] = useState([])
    const [churchDonates, setChurchDonates] = useState([])

    async function getAllChurches(idUser, religion){
        try {
            const { data } = await api.get(`/allChurches/${idUser}/${religion}`);

            if(data.err){
                throw new Error(data.err)
            }
            setRelations(data.relations)
            setChurchesMap(data.churches)
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
    async function getChurch(id_corp){
        try {
            const { data } = await api.get(`admin/home/church/${id_corp}`)

            if(data.err){
                throw new Error(data.err)
            }
            setChurch(data.msg)
            return data;
        } catch (err) {
            console.error(err)
        }
    }
    async function getChurchAbout(id_corp){
        try {
            const { data } = await api.get(`admin/home/aboutChurch/${id_corp}`)

            if(data.err){
                throw new Error(data.err)
            }
            setChurchAbout(data.msg)
            return data;
        } catch (err) {
            console.error(err)
        }
    }
    async function getChurchMeeting(id_corp){
        try {
            const { data } = await api.get(`admin/home/meetingsChurch/${id_corp}`)

            if(data.err){
                throw new Error(data.err)
            }
            console.log(data)
            setChurchMeeting(data.msg)
            return data;
        } catch (err) {
            console.error(err)
        }
    }
    async function getChurchDonates(id_corp){
        try {
            const { data } = await api.get(`admin/home/donateChurch/${id_corp}`)

            if(data.err){
                throw new Error(data.err)
            }
            setChurchDonates(data.msg)
            return data;
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <ChurchesContext.Provider value={ { 
            churchesMap, getAllChurches, joinChurch,relations,
            church, getChurch,
            churchAbout, getChurchAbout,
            churchMeeting, getChurchMeeting,
            churchDonates, getChurchDonates
            } }>
            {children}
        </ChurchesContext.Provider>
    );
}
