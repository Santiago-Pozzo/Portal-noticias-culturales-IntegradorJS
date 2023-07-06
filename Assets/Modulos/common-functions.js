import { favoritesMenu, renderFavorites,changeToEmptyAllStars } from "./fav-menu-functions.js";
import { navMenu } from "./nav-menu-functions.js";
import { renderUserSticky } from "./user-sticky-functions.js";

export const overlay = document.querySelector(".overlay");

//Checkeo si es usuario activo---------------------------------------------------
export const isActiveUser = () => {
    return sessionStorage.getItem("activeUser") !== null;
};

//Traer usuario activo del session storage----------------------------------------
export let activeUser = JSON.parse(sessionStorage.getItem("activeUser")) || {};

//Cerrar menúes al clickear en el overlay-----------------------------------------
export const closeMenuOnClick = () => {
    favoritesMenu.classList.remove("favorites-open");
    navMenu.classList.remove("navbar-open");
    overlay.classList.add("hidden");
    renderUserSticky();
};

//FAVORITOS-------------------------------------------------------------------------
//Guardar favoritos en el local storage
const saveFavoritesOnLocalStorage = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

//Traer favoritos del local storage
export const getFavorites = () => {
    let fav = [];
    if (isActiveUser()) {
        fav = JSON.parse(localStorage.getItem("favorites")) || [];
    }    
    return fav;
};    

//Actualizar favoritos
export const updateFavoritesState = (favorites) => {
    saveFavoritesOnLocalStorage(favorites);
    renderFavorites();
    if (!favorites.length) {
        changeToEmptyAllStars();
    };
};

//Abrir noticia en nueva pestaña---------------------------------------
export const saveOpenArtIDOnLocalStorage = (id) => {
    localStorage.setItem("openArtID", JSON.stringify(id));
};

export const openArtID = (id) => {
saveOpenArtIDOnLocalStorage(id);
};