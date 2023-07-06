import { favoritesMenu } from "./fav-menu-functions.js";
import { overlay, closeMenuOnClick } from "./common-functions.js";
import { renderUserSticky } from "./user-sticky-functions.js";

const hamburgerBtn = document.querySelector(".menu-label");
export const navMenu = document.querySelector(".navbar-list");


//Abrir y cerrar menú hamburguesa------------------------------
const toggleNavMenu = () => {
    navMenu.classList.toggle("navbar-open");
    if (favoritesMenu.classList.contains("favorites-open")) {
        favoritesMenu.classList.remove("favorites-open");
        return;
    };
    overlay.classList.toggle("hidden");
};

//Cerrar nav menu al scrollear-----------------------------------
const closeMenuOnScroll = () => {
    if (navMenu.classList.contains("navbar-open")) {
        navMenu.classList.remove("navbar-open");
        overlay.classList.add("hidden");
        renderUserSticky();
    };
};


//Cerrar nav menú al clickear una opción-----------------------
const closeNavMenuOnClick = (e) => {
    if (e.target.classList.contains("navbar-link")){
        navMenu.classList.remove("navbar-open");
        overlay.classList.add("hidden");
    };
};

//INIT--------------------------------------------------------------------------
export const navMenuInit = () => {
    hamburgerBtn.addEventListener("click", toggleNavMenu);
    window.addEventListener("scroll", closeMenuOnScroll);
    overlay.addEventListener("click", closeMenuOnClick);
    navMenu.addEventListener("click", closeNavMenuOnClick);
};