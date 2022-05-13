import { Modal } from "@mui/material";

import { ModalStyles } from './style'

export function ModalConfirmation({ modalConfirmationIsOpen, setModalConfirmationIsOpen, onSuccess, nameChat='', nameUser=''}){
    return (
        <Modal
            open={modalConfirmationIsOpen}
            onClose={() => setModalConfirmationIsOpen(false)}
        >
            <ModalStyles>
                {nameChat ? (
                    <h3>Tem certeza que quer deletar o grupo {nameChat}? </h3>
                ):(
                    <h3>Tem certeza que quer deletar o usuário {nameUser} do grupo? </h3>
                )}
                
                <button id="next" onClick={onSuccess}>Sim</button>
                <button id="cancel" onClick={()=>{setModalConfirmationIsOpen(false)}}>Não</button>
            </ModalStyles>
        </Modal>
    )
}