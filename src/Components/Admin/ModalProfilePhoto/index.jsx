import { Modal } from "@mui/material";
import { useState } from "react";

import { LastPhotos } from "./pages/LastPhotos";
import { NewPhoto } from "./pages/NewPhoto";

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderIcon from '@mui/icons-material/Folder';
import CloseIcon from '@mui/icons-material/Close';

import { ModalStyles, PageOptions } from "./style";

export function ModalProfilePhoto({ isOpen, setIsOpen }){
    const [page, setPage] = useState('');

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <ModalStyles>
                { page === '' &&(
                    <>
                        <header>
                            <h1>Selecionar Imagem</h1>
                            <button type="button" onClick={() => setIsOpen(false)}> <CloseIcon/> </button>
                        </header>

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

                {   page === 'newPhoto' ? (
                    <NewPhoto setIsOpen={setIsOpen} setPage={setPage}/>
                ) : page === 'lastPhotos' && (
                    <LastPhotos setIsOpen={setIsOpen} setPage={setPage}/>
                )}
            </ModalStyles>
        </Modal>
    )
}