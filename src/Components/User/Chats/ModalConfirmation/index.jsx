import { Modal } from "@mui/material";

import { ModalStyles } from './style'

export function ModalConfirmation({ modalConfirmationIsOpen, setModalConfirmationIsOpen, onSuccess, title}){
    return (
        <Modal
            open={modalConfirmationIsOpen}
            onClose={() => setModalConfirmationIsOpen(false)}
        >
            <ModalStyles>
                <h3>{title}</h3>
                
                <button id="next" onClick={onSuccess}>Sim</button>
                <button id="cancel" onClick={()=>{setModalConfirmationIsOpen(false)}}>Não</button>
            </ModalStyles>
        </Modal>
    )
}