import { useEffect, useState } from "react"
import { getDownloadURL, list, ref } from "firebase/storage";
import { Button } from 'semantic-ui-react'
import { Alert, AlertTitle, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import sign from "jwt-encode";
import { api } from "../../../../services/api";

import { storage } from '../../../../services/firebase'
import { useAuth } from "../../../../hooks/useAuth";

import { AllPhotos } from "../style";

export function LastPhotos({ setIsOpen, setPage }){
    const { user, setUser } = useAuth();
    const [listImages, setListImages] = useState([]);
    const [btnIsLoading, setBtnIsLoading] = useState(false);
    const [photoIsLoading, setPhotoIsLoading] = useState(true);
    const [anyPhotos, setAnyPhotos] = useState(false);

    const imageListRef = ref(storage, `user/${user.id_user}/`)
    useEffect(() => {
        const getAllImages = async () => {
            const imagesList = await list(imageListRef, { maxResults: 6 });

            const allUrls = Promise.all(imagesList.items.map(async file => {
                const url = await getDownloadURL(file);

                return url;
            }));

            allUrls.then(urls => {
                if(urls.length > 0){
                    setPhotoIsLoading(false);
                    setListImages(urls);
                } else {
                    setAnyPhotos(true);
                }
            }).catch(err => {
                console.log(err);
            })
        }
        getAllImages();
    }, [])

    async function handleChangePhoto(imageUrl){
        setBtnIsLoading(true)

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
        setBtnIsLoading(false);
        setPage('');
    }

    return (
        <AllPhotos>
            <header>
                <h1>Fotos anteriores do perfil</h1>
                <button type="button" onClick={() => setPage('')}> <CloseIcon/> </button>
            </header>

            <div className="container">
                { photoIsLoading && !anyPhotos && (
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
                                className={btnIsLoading && 'loading'}
                                onClick={() => handleChangePhoto(image)}
                            >
                                Selecionar
                            </Button>
                        </div>
                    )
                })}
            </div>

            { anyPhotos && (
                <Alert severity="warning" variant="filled">
                    <AlertTitle>Alerta</AlertTitle>
                    Não foi possível encontrar nenhuma foto — <strong>Volte e adicione uma Imagem</strong>
                </Alert>
            )}
        </AllPhotos>
    )
}