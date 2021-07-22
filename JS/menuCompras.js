function onClickMenu(){
    //Navbar em si
    document.getElementById("navbar").classList.toggle("change-nav");

    //Elementos li do Text-navbar
    document.getElementById("loc").classList.toggle("change-text-nav");
    document.getElementById("texto-li1").classList.toggle("change-text-nav");
    document.getElementById("texto-li2").classList.toggle("change-text-nav");
    document.getElementById("ajuda").classList.toggle("change-text-nav");

    //Menu
    document.getElementById("menu").classList.toggle("change-menu");
    document.getElementById("content").classList.toggle("change-content");
}