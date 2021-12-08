import {ReactComponent as Leave} from '../../Assets/images/leave.svg'

export function ChangePage({ onClick, label }){
    return(
        <button id="leaveBtn" onClick={onClick}>
            <Leave/>
            {label}
        </button>
    );
}