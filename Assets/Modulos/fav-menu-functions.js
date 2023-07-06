import { createArtData, removeFavoriteArt } from "./news-functios.js";
import { handleAlertMsg } from "./alert-msg-functions.js"; 
import { navMenu } from "./nav-menu-functions.js";
import { overlay, getFavorites, updateFavoritesState } from "./common-functions.js";

const headerFavoritesBtn = document. querySelector(".favorites-label");
const headerFavIcon = document.querySelector(".navbar-favoriteIcon");
const favoritesFavIcon = document.querySelector(".favoritesMenu-icon");
const favoritesContainer = document.querySelector(".favorites-container");
const cleanFavBtn = document.querySelector(".cleanFavorites-btn");
export const favoritesMenu = document.querySelector(".favoritesMenu");

//Abrir y cerrar menú favoritos--------------------------------
const toggleFavMenu = () => {
    favoritesMenu.classList.toggle("favorites-open");
    if (navMenu.classList.contains("navbar-open")) {
        navMenu.classList.remove("navbar-open");
        return;
    };

    overlay.classList.toggle("hidden");
};

//Renderizar favoritos------------------------------------------
    const favoritesTemplate = (favoriteArticle) => {
        const {id, img, title, date, category, favorite} = favoriteArticle;

        return `
            <div class="favoriteArt" id="${id}">
                <div class="favoriteArt-content">
                    <img src="${img}" alt=${title} class="favoriteArt-img">

                    <a class="favoriteArt-info hoverScale" href="./Pages/article.html"" target="_blank">
                        <h3 class="favoriteArt-title">${title}</h3>
                        <p class="favoriteArt-date">${date}</p>
                    </a>            
                </div>

                <button
                    data-id="${id}"
                    data-title="${title}"
                    data-date="${date}"
                    data-img="${img}"
                    data-category="${category}"
                    data-favorite="${favorite}"
                    class="removeBtn hoverScale">
                        <i class="fas fa-trash trash-icon"></i>
                </button>
            </div>
        `
    };

    export const changeToActiveStar = (icon) => {
        icon.classList.remove("favorite-empty");
        icon.classList.add("favorite-active");
    };

    export const changeToEmptyStar = (icon) => {
        icon.classList.remove("favorite-active");
        icon.classList.add("favorite-empty");
    };

    export const changeToEmptyAllStars = () => {
         const allArtFavoriteIcon = document.querySelectorAll(".art-favoriteIcon");
        for (let i = 0; i < allArtFavoriteIcon.length; i++) {
            changeToEmptyStar(allArtFavoriteIcon[i].firstElementChild);
        };

        changeToEmptyStar(headerFavIcon);
        changeToEmptyStar(favoritesFavIcon);    
    };

export const renderFavorites = () => {
    let favorites = getFavorites();

    if (!favorites.length) {
        favoritesContainer.innerHTML = `
            <div class="emptyFavorites-msg">No tienes artículos favoritos</div>
        `;
    
        cleanFavBtn.classList.add("hidden");
        return;
    };

    changeToActiveStar(headerFavIcon);
    changeToActiveStar(favoritesFavIcon);

    cleanFavBtn.classList.remove("hidden");

    favoritesContainer.innerHTML = favorites.map(favoritesTemplate).join("");
};



//Quitar articulo individual desde el menu favoritos-----------------------------
    const clickOnTrashBtn = (target) => {
        return target.classList.contains("removeBtn")
        || target.parentNode.classList.contains("removeBtn");
    };

const removeFavoriteArtFromList = ({target}) => {
    if (!clickOnTrashBtn(target)) {
        return;
    };

    if (target.classList.contains("trash-icon")) {
        target = target.parentNode;
    };

    let article = createArtData(target.dataset);
    removeFavoriteArt(article);

    const deletedFavArt = document.getElementById(article.id);
    const favIconFromDeletedArt = deletedFavArt.firstElementChild.lastElementChild.firstElementChild;
    changeToEmptyStar(favIconFromDeletedArt);
    updateFavoritesState(getFavorites());
};

//Borrar todos los favoritos desde el menu favoritos-------------------
    const isCleanFavoritesBtn = (target) => {
        return target.classList.contains("cleanFavorites-btn");
    };

const cleanFavorites = ({target}) => {
    if (isCleanFavoritesBtn(target)){
        handleAlertMsg(2);
    };
};

export const favMenuFunctionsInit = () => {
    headerFavoritesBtn.addEventListener("click", toggleFavMenu);
    document.addEventListener("DOMContentLoaded", renderFavorites);
    favoritesContainer.addEventListener("click", removeFavoriteArtFromList);
    favoritesContainer.parentNode.addEventListener("click", cleanFavorites);
};

