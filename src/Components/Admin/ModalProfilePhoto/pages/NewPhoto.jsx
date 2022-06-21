import { useState } from "react";
import { Button } from 'semantic-ui-react'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import { toast } from "react-toastify";
import sign from "jwt-encode";

import { storage } from '../../../../services/firebase'
import { useAuth } from "../../../../hooks/useAuth.js";
import { api } from "../../../../services/api.js";
import { getImagesWithDate } from "../../../../helper/getImagesWithDate";

import CloseIcon from '@mui/icons-material/Close';

import { FormModal } from '../style'

export function NewPhoto({ setIsOpen, setPage }){
    const { user, setUser } = useAuth();
    const [imageFile, setImageFile]= useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState();
    const imageListRef = ref(storage, `user/${user.id_user}/`)
    
    async function handleUploadImage(e){
        e.preventDefault();
        setIsLoading(true);

        if(imageFile.size > 3145728) {// only images with less than 3 MB
            toast.error('A imagem pode conter até 3 MB')
            setIsLoading(false);
            return;
        }

        const imagesWithDates = await getImagesWithDate(imageListRef);
        if(imagesWithDates.length >= 6){ // Max images in storage per user are 6
            try {
                await deleteObject(imagesWithDates.at(-1).image);
                toast.info('Sua foto mais antiga foi excluída do histórico')
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            const imageRef = ref(storage, `user/${user.id_user}/${v4() + imageFile.name}`)
            const uploadImage = await uploadBytes(imageRef, imageFile);

            if(uploadImage){
                const lastImageUrl = await getLastImageUrl();

                const { data } = await api.post(`/user/update/photo/`, {
                    id_user: user.id_user,
                    image_url: lastImageUrl
                });

                if(data.err){
                    closeProcess();
                    throw new Error(data.err);
                }
    
                setUser({...user, image_url: lastImageUrl})
                localStorage.setItem('Token',  sign({...user, image_url: lastImageUrl }, process.env.REACT_APP_SECRET_JWT))
                toast.success('Imagem alterada com sucesso')
                closeProcess();
            } else {
                toast.error('Erro ao inserir a imagem, tente novamente');
                closeProcess();
            }
        } catch (error) {
            console.log(error)
            closeProcess();
        }
    }

    const getLastImageUrl = async () => {
        const imagesWithDates = await getImagesWithDate(imageListRef);
        
        const lastImageUrl = await getDownloadURL(imagesWithDates[0].image); // Position 0 cause array is order by the most recent date

        return lastImageUrl;
    }

    const closeProcess = () => {
        setIsOpen(false);
        setIsLoading(false);
        setPage('');
    }

    const updateSelectedFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) return

        setImageFile(e.target.files[0])

        const objectUrl = URL.createObjectURL(e.target.files[0])
        setPreview(objectUrl)
    }

    return (
        <FormModal onSubmit={handleUploadImage}>
            <header>
                <h1>Escolha sua foto de perfil</h1>
                <button type="button" onClick={() => setPage('')}> <CloseIcon/> </button>
            </header>

            <div>
                {imageFile && (
                    <>
                        <p>Imagem selecionada:</p>
                        <img src={preview} alt="Preview imagem"/>
                    </>   
                )}
            </div>

            <input 
                type="file"
                onChange={e => updateSelectedFile(e)}
                accept="image/png, image/jpeg"
            />

            <Button
                type="submit" id='buttonFile'
                className={isLoading && 'loading'}
            >
                Enviar
            </Button>
        </FormModal>
    )
}