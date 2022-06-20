import { createContext, useEffect, useState } from "react";
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { createTheme } from '@mui/material/styles';

export const ChurchesContext = createContext({});

export function ChurchesContextProvider({ children }){
    const { user } = useAuth()
    const [churchesMap, setChurchesMap] = useState([]);
    const [eventsMap, setEventsMap] = useState([]);
    const [relations, setRelations] = useState([]);
    const [church, setChurch] = useState([])
    const [churchAbout, setChurchAbout] = useState([])
    const [churchMeeting, setChurchMeeting] = useState([])
    const [churchEvents, setChurchEvents] = useState([])
    const [churchDonates, setChurchDonates] = useState([])
    const [currentPage, setCurrentPage] = useState('Meu templo');
    const [currentPageUser, setCurrentPageUser] = useState('Sobre');
    const [stepCompleted, setStepCompleted] = useState(0)

    const [theme, setTheme] = useState(
        createTheme({
            palette: {
              primary: {
                main: '#fff' 
              }
            }
          })
    );
    const [colorPage, setColorPage] = useState(user.church ? user.church.color : '#F3B72B' );
    const [adminColor, setAdminColor] = useState(colorPage);
    // Setting Theme Color  
    useEffect(() => {
      setColorPage(user.church?.color);
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
    async function getAllEvents(idUser, religion){
        try {
            const { data } = await api.get(`/allEvents/${idUser}/${religion}`);

            if(data.err){
                throw new Error(data.err)
            }
            setEventsMap(data)
            return data;
        } catch (err) {
            console.error(err)
        }
    }

    async function joinChurch(id_user, username, id_church, roomId, image_url){
        try {
            const { data } = await api.post(`/affiliate`, { id_user, username, id_church, roomId, image_url });
            
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
            if(data.code === 2){
                setChurch(data)
            } else{
                setChurch(data.msg)
            }
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
            if(data.code === 2){
                setChurchAbout(data)
            } else{
                setChurchAbout(data.msg)
            }
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
            if(data.code === 2){
                setChurchMeeting(data)
            } else{
                setChurchMeeting(data.msg)
            }
            
            return data;
        } catch (err) {
            console.error(err)
        }
    }
    async function getChurchEvents(id_corp){
        try {
            const { data } = await api.get(`admin/home/eventsChurch/${id_corp}`)
            if(data.err){
                throw new Error(data.err)
            }
            if(data.code === 2){
                setChurchEvents(data)
            } else{
                setChurchEvents(data.msg)
            }
            
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
            if(data.code === 2){
                setChurchDonates(data)
            } else{
                setChurchDonates(data.msg)
            }
            return data;
        } catch (err) {
            console.error(err)
        }
    }

    async function updateChurch(churchData){
        try {
            const { data } = await api.post(`/admin/home/church/update`, {
                roomId:      churchData.roomId,
                id_corp:     churchData.id_corp,
                id_doc:      churchData.id_doc,
                name:        churchData.name,
                description: churchData.description,
                cpf:         churchData.cpf,
                cnpj:        churchData.cnpj,
                coords:      churchData.coords,
                color:       churchData.color
            });
            if(data.err){
                throw new Error(data.err)
            }

            return data
        } catch (err) {
            console.error(err)
        }
    }

    async function updateAbout(AboutData){
        try {
            const { data } = await api.post(`/admin/home/aboutChurch/update`, {
                id_info:       AboutData.id_info,
                seats:         AboutData.seats,
                parking:       AboutData.parking,
                accessibility: AboutData.accessibility,
                cellphone:    AboutData.cellphone, 
                email:         AboutData.email,
                facebook:      AboutData.facebook,
            });

            if(data.err){
                throw new Error(data.err)
            }

            return data
        } catch (err) {
            console.error(err)
        }
    }


    async function deleteMeeting(id_meeting){
        try {
            const { data } = await api.delete(`/admin/home/meetingsChurch/delete/${id_meeting}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }
    async function deleteEvent(id_event){
        try {
            const { data } = await api.delete(`/admin/home/eventChurch/delete/${id_event}`);
            if(data.err){
                throw new Error(data.err)
            }
            return data
        } catch (err) {
            console.error(err)
        }
    }
    async function deleteDonate(id_donate){
        try {
            const { data } = await api.delete(`/admin/home/donateChurch/delete/${id_donate}`);
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
            eventsMap, getAllEvents,
            church, getChurch, setChurch,
            churchAbout, getChurchAbout, setChurchAbout,
            churchMeeting, getChurchMeeting, setChurchMeeting,
            churchEvents, getChurchEvents, setChurchEvents,
            churchDonates, getChurchDonates, setChurchDonates,
            updateChurch, updateAbout,
            deleteMeeting, deleteEvent,
            deleteDonate,
            currentPage, setCurrentPage,
            currentPageUser, setCurrentPageUser,
            stepCompleted, setStepCompleted,
            getStepCompleted,
            } }>
            {children}
        </ChurchesContext.Provider>
    );
}