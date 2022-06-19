import { useEffect, useState } from "react"
import { getDownloadURL, list, ref } from "firebase/storage";
import { Button } from 'semantic-ui-react'
import { Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import sign from "jwt-encode";
import { api } from "../../../../services/api";

import { storage } from '../../../../services/firebase'
import { useAuth } from "../../../../hooks/useAuth";

import { AllPhotos } from "../style";

export function LastPhotos({ setIsOpen, setPage }){
    const { user, setUser } = useAuth();
    const [listImages, setListImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const imageListRef = ref(storage, `user/${user.id_user}/`)
    useEffect(() => {
        const getAllImages = async () => {
            const imagesList = await list(imageListRef, { maxResults: 6 });
        
            const allUrls = Promise.all(imagesList.items.map(async file => {
                const url = await getDownloadURL(file);

                return url;
            }));

            setListImages(await allUrls);
        }
        getAllImages();
    }, [])

    async function handleChangePhoto(imageUrl){
        setIsLoading(true)

        const { data } = await api.post(`/user/update/photo/`, {
            id_user: user.id_user,
            image_url: imageUrl
        });

        if(data.err){
            closeProcess();
            throw new Error(data.err);
        }

        setUser({...user, image_url: imageUrl})
        localStorage.setItem('Token',  sign({...user, image_url: imageUrl }, process.env.REACT_APP_SECRET_JWT))
        closeProcess();
    }

    const closeProcess = () => {
        setIsOpen(false);
        setIsLoading(false);
        setPage('');
    }

    return (
        <AllPhotos>
            <header>
                <h1>Fotos anteriores do perfil</h1>
                <button type="button" onClick={() => setPage('')}> <CloseIcon/> </button>
            </header>

            <div className="container">
                { listImages.length === 0 && (
                    <>
                        <Skeleton variant="rectangular" animation="wave" width={200} height={250}/>
                        <Skeleton variant="rectangular" animation="wave" width={200} height={250}/>
                        <Skeleton variant="rectangular" animation="wave" width={200} height={250}/>
                    </>
                )}

                {listImages?.map(image => {
                    return (
                        <div>
                            <img src={image} height={150}/>
                            <Button
                                type="submit" id='buttonFile'
                                className={isLoading && 'loading'}
                                onClick={() => handleChangePhoto(image)}
                            >
                                Selecionar
                            </Button>
                        </div>
                    )
                })}
            </div>
        </AllPhotos>
    )
}