import { ReactComponent as Leave } from '../../Assets/images/leave.svg'

import { ChangePageStyle } from './style';

export function ChangePage({ onClick, label }){
    return(
        <ChangePageStyle onClick={onClick}>
            <Leave/>
            {label}
        </ChangePageStyle>
    );
}