import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useChat } from '../../../hooks/useChat';
import { useAuth } from '../../../hooks/useAuth';

import { MapsAdminStyles, CreateRoomStyles } from './style'

export function LocalizadorAdmin(){
    const { insertRoom, updateAdmin, getAllUsers, allUsersChurch, chats, getChats} = useChat();
    const { user } = useAuth();
    const [roomName, setRoomName] = useState('')
    const [coords, setCoords] = useState({
        lat: -23.7433,
        lng: -46.8523
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        mapIds: [process.env.REACT_APP_GOOGLE_MAPS_ID],
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    })

    useEffect(async () => {
        await getAllUsers(user.church.roomId, user.id_user);
    }, [user.church.roomId != null])

    useEffect(async () => {
        await getChats(user?.id_user, user.church.roomId);
    }, [user.church.roomId != null]);

    console.log(allUsersChurch)

    async function handleAddRoom(e){
        e.preventDefault();
        if(roomName.trim().length === 0){
            toast.error('É necessário informar o nome da igreja')
            return;
        }
        const status = await insertRoom({
            name:  roomName,
            users: [{ idUser: String(user.id_user), name: user.nome }]
        })
        if(status.code === 1){
            toast.success(status.msg)
        }
        const response = await updateAdmin({
            id_user:  user.id_user,
            church: { name: status.room.name, roomId: status.room._id }
        })
    }
    console.log(user)

    return isLoaded ? (
        <>
            <MapsAdminStyles>
                <GoogleMap
                    center={coords}
                    zoom={11}
                    options={{
                        mapId: process.env.REACT_APP_GOOGLE_MAPS_ID
                    }}
                    mapContainerClassName="containerGoogleMaps"
                >
                    {/* Current users position */}
                    <Marker 
                        position={coords}
                        options={{
                            label: {
                                text: 'Estou aqui',
                            },
                            clickable: true,
                            draggable: true,
                        }}
                        onDragEnd={(e) => setCoords(() => ({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng()
                        }))}
                    />
                </GoogleMap>
            </MapsAdminStyles>

            {user.church != null ? (
                <CreateRoomStyles>
                    <form onSubmit={handleAddRoom}>
                        <span id='infos'>
                            <label>Nome da Igreja:</label>
                            <input
                                type="text"
                                value={roomName}
                                maxLength={25}
                                onChange={e => setRoomName(e.target.value)}
                            />
                        </span>
                        <button type='submit'>Criar</button>
                    </form>
                </CreateRoomStyles>
            ):(
                <>
                    <h1>Bem vindo de volta {user.nome}</h1> 
                    <h2>Aqui estão algumas informações sobre sua igreja:</h2>
                    <menu>Usuários:</menu>
                    {allUsersChurch.map(user=>{
                        return <li>{user.name}</li>
                    })}<br/>
                    <menu>Grupos Criados:</menu>
                    {chats.map(chat=>{
                        return <li>{chat.name}</li>
                    })}<br/>

                </>
            )}

        </>
    ) : <h1>Carregando...</h1>
}