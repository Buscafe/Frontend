import { Modal } from "@mui/material";
import { useState } from "react";

import { LastPhotos } from "./pages/LastPhotos";
import { NewPhoto } from "./pages/NewPhoto";

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderIcon from '@mui/icons-material/Folder';

import { ModalStyles, PageOptions } from "./style";

export function ModalProfilePhoto({ isOpen, setIsOpen }){
    const [page, setPage] = useState('');
    console.log(page)
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <ModalStyles>
                { page === '' &&(
                    <>
                        <span>
                            <h1>Selecionar Imagem</h1>
                        </span>

                        <PageOptions>
                            <button onClick={() => setPage('newPhoto')} id='newPhoto'>
                                <AddPhotoAlternateIcon/>
                                <p>Enviar Imagem</p>
                            </button>
                            <button onClick={() => setPage('lastPhotos')} id='lastPhotos'>
                                <FolderIcon/>
                                <p>Imagens Anteriores</p>
                            </button>
                        </PageOptions>
                    </>
                ) }

                { page === 'newPhoto' ? (
                    <NewPhoto setIsOpen={setIsOpen} setPage={setPage}/>
                ) : (
                    <LastPhotos/>
                )}
            </ModalStyles>
        </Modal>
    )
}