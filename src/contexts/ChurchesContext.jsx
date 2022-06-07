import { createContext, useEffect, useState } from "react";
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { createTheme } from '@mui/material/styles';

export const ChurchesContext = createContext({});

export function ChurchesContextProvider({ children }){
    const { user } = useAuth()
    const [churchesMap, setChurchesMap] = useState([]);
    const [relations, setRelations] = useState([]);
    const [church, setChurch] = useState([])
    const [churchAbout, setChurchAbout] = useState([])
    const [churchMeeting, setChurchMeeting] = useState([])
    const [churchDonates, setChurchDonates] = useState([])
    const [stepCompleted, setStepCompleted] = useState(0)

    const [theme, setTheme] = useState('null');
    const [colorPage, setColorPage] = useState(user.church.color);
    const [adminColor, setAdminColor] = useState(colorPage);

    // Setting Theme Color  
    useEffect(() => {
      setColorPage(user.church.color);
    }, [adminColor])
    
    useEffect(() => {
      setTheme(
        createTheme({
          palette: {
            primary: {
              main: adminColor
            }
          }
        })
      );
    }, [adminColor]);

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
    async function deleteMeeting(id_corp, id_meeting){
        try {
            const { data } = await api.delete(`/admin/home/meetingsChurch/${id_corp}/${id_meeting}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }
    async function deleteDonate(id_corp, id_donate){
        try {
            const { data } = await api.delete(`/admin/home/donateChurch/${id_corp}/${id_donate}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }
    async function getStepCompleted(){
        return stepCompleted
    }
    return(
        <ChurchesContext.Provider value={ { 
            theme,
            adminColor, setAdminColor,
            churchesMap, getAllChurches, joinChurch,relations,
            church, getChurch,
            churchAbout, getChurchAbout,
            churchMeeting, getChurchMeeting,
            churchDonates, getChurchDonates,
            deleteMeeting, deleteDonate,
            stepCompleted, setStepCompleted,
            getStepCompleted,
            } }>
            {children}
        </ChurchesContext.Provider>
    );
}
