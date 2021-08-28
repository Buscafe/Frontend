function onClickMenu(el1, md1, el2, md2, el3, md3, el4, md4, el5, md5, el6, md6 ,el7, md7){
    //Get the html ids
    el1 = document.getElementById(el1);
    el2 = document.getElementById(el2);
    el3 = document.getElementById(el3);
    el4 = document.getElementById(el4);
    el5 = document.getElementById(el5);
    el6 = document.getElementById(el6);
    el7 = document.getElementById(el7);

    //Toggle the class
    el1.classList.toggle(md1);
    el2.classList.toggle(md2);
    el3.classList.toggle(md3);
    el4.classList.toggle(md4);
    el5.classList.toggle(md5);
    el6.classList.toggle(md6);
    el7.classList.toggle(md7);
}