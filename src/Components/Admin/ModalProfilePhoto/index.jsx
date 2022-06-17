import { useState } from "react";
import { Modal } from "@mui/material";
import { Button } from 'semantic-ui-react'
import { ref, listAll, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import sign from "jwt-encode";
import { toast } from "react-toastify";

import { storage } from '../../../services/firebase.js'
import { useAuth } from "../../../hooks/useAuth.js";
import { api } from "../../../services/api.js";

import { FormModal } from './style'

export function ModalProfilePhoto({ isOpen, setIsOpen }){
    const { user, setUser } = useAuth();
    const [imageFile, setImageFile]= useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState();
    
    async function handleUploadImage(e){
        e.preventDefault();
        setIsLoading(true);

        if(imageFile.size > 3145728) {// only images with less than 3 MB
            toast.error('A imagem pode conter até 3 MB')
            setIsLoading(false);
            return;
        }

        try {
            const imageRef = ref(storage, `user/${user.id_user}/${v4() + imageFile.name}`)
            const uploadImage = await uploadBytes(imageRef, imageFile);

            if(uploadImage){
                const imageUrl = await getImageUrl();
    
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
            } else {
                toast.error('Erro ao inserir a imagem, tente novamente');
                closeProcess();
            }
        } catch (error) {
            console.log(error)
            closeProcess();
        }
    }

    const imageListRef = ref(storage, `user/${user.id_user}/`)
    const getImageUrl = async () => {
        const imagesList = await listAll(imageListRef);
        const url = await getDownloadURL(imagesList.items[0])

        return url;
    }

    const closeProcess = () => {
        setIsOpen(false);
        setIsLoading(false)
    }

    const updateSelectedFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) return

        setImageFile(e.target.files[0])

        const objectUrl = URL.createObjectURL(e.target.files[0])
        setPreview(objectUrl)
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <FormModal onSubmit={handleUploadImage}>
                <h1>Escolha sua foto de perfil</h1>

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

                    required
                />

                <Button
                    type="submit" id='buttonFile'
                    className={isLoading && 'loading'}
                >
                    Enviar
                </Button>
            </FormModal>
        </Modal>
    )
}