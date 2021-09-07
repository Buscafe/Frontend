/* 
=================================================================
    This function need at least 2 parameters, first the id of the
    element you want to change the class and second the name of 
    that class you want change. Ex:
    onClickMenu('button', 'change-button', 'div', 'change-div');
=================================================================
*/
function onClickMenu(...rest){
    for(let i = 0; i < rest.length; i++){
        if(i % 2 == 0){
            rest[i] = document.getElementById(`${rest[i]}`);
            rest[i].classList.toggle(rest[i + 1]);
        }
    }
}
