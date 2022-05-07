import { useState } from 'react'
import { Modal, Select, OutlinedInput, Box, Chip, MenuItem, useTheme, InputLabel } from "@mui/material";

import { ModalStyles } from './style'

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export function ModalNewChat({ modalIsOpen, setModalIsOpen }){
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    
    return (
        <Modal
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
        >
            <ModalStyles>
                <h1>Crie seu novo grupo</h1>
                <p></p>
                
                <form>
                    <label>Nome do Grupo</label>
                    <input type="text"/>

                    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        multiple
                        value={personName}
                        onChange={e => setPersonName(e.target.value)}
                        input={<OutlinedInput label="Chip" placeholder='Adicione membros ao grupo' color='primary'/>}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} color='primary'/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </form>
            </ModalStyles>
        </Modal>
    )
}