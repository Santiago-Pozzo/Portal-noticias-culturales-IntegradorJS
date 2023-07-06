import { appState, artsData } from "../data.js";
import { changeToActiveStar, changeToEmptyStar } from "./fav-menu-functions.js";
import { updateFavoritesState, getFavorites, isActiveUser, openArtID, saveOpenArtIDOnLocalStorage } from "./common-functions.js";
import { handleAlertMsg } from "./alert-msg-functions.js"; 

const newsSection = document.querySelector(".news-section");
const showMoreBtn = document.querySelector(".btn-seeMore");
const categoriesBox = document.querySelector(".categories-box");
const msgModal = document.querySelector(".add-modal");
const categoriesBtnsAll = document.querySelectorAll(".categories-btn");


//Renderizar noticias---------------------------------------------
        //Checkeo si un articulo está en favoritos
        const isFavoriteArt = (id) => {
            let favorites = getFavorites();
            return favorites.some((art) => {
                return art.id == id;
            });
        };

        //Asigno nombre de clase si es o no favorito
        const favoriteClassName = (isFav) => {
            if (isFav) {
              return "favorite-active";
            } else {
              return "favorite-empty";
            }
        };


    const createArtTemplate = (art) => {
        const {id, title, date, img, category} = art;
        
        let className = favoriteClassName(isFavoriteArt(id));

        return `
            <div class="art-box" id="${id}">
                <div class="art-info">
                    <h3 class="art-category">${category}</h3>
                    <h3 class="art-date">${date}</h3>
                    <button
                    data-id="${id}"
                    data-title="${title}"
                    data-date="${date}"
                    data-img="${img}"
                    data-category="${category}"
                    data-favorite="${isFavoriteArt(id)}"
                    class="art-favoriteIcon">
                        <i class="fa-solid fa-star ${className} art-favoriteIconScale hoverscale"></i>
                    </button>
                </div>

                <div class="art-content">
                    <img class="art-img" src="${img}" alt="${title}">
                    <a href="./Pages/article.html"" target="_blank"><h2 class="art-title hoverScale">${title}</h2></a>
                </div>
            </div>
        `
    };

const renderNews = (artList) => {
    newsSection.innerHTML += artList.map(createArtTemplate).join("");
};

//Mostrar más articulos----------------------------------------
    const isLastIndex = () => {
        return appState.currentIndex === appState.artsLimit - 1;
    };

const showMorreArts = () => {
    appState.currentIndex += 1;
    let {articles, currentIndex} = appState;
    renderNews(articles[currentIndex]);
    if (isLastIndex()) {
        showMoreBtn.classList.add("hidden");
    };
};

//Filtrar noticias por categoria-------------------------------
    const isInactiveFilterBtn = (btn) => {
        return (
            btn.classList.contains("categories-btn") && !btn.classList.contains("category-active")
        )
    };

    const changeBtnState = (selectCategory) => {
        const categories = [... categoriesBtnsAll];
        categories.forEach((categoryBtn) => {
           if (categoryBtn.dataset.category !== selectCategory) {
               categoryBtn.classList.remove("category-active");
               return;
           };
           categoryBtn.classList.add("category-active")
        })
    };

    const changesFilterState = (btn) => {
        appState.activeFilter = btn.dataset.category;
        changeBtnState(appState.activeFilter);
    };

    const showMoreBtnVisivility = () => {
        if (!appState.activeFilter) {
            showMoreBtn.classList.remove("hidden");
            return;
        };
        showMoreBtn.classList.add("hidden");
    };

    const renderFilterCategory = () => {
        const filteredArts = artsData.filter((art) => {
            return art.category === appState.activeFilter;
        });
        renderNews(filteredArts);
    };

const aplyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)){
        return
    };

    changesFilterState(target);
    showMoreBtnVisivility ();

    newsSection.innerHTML = "";
       if (appState.activeFilter) {
        renderFilterCategory();
        appState.currentIndex = 0;
        return;
    };

    appState.currentIndex = 0;
    renderNews(appState.articles[0]);
};


//Agregar y quitar artículo favorito desde la secion de noticias-------------
    const clickOnFavBtn = (target) => {
        return target.classList.contains("art-favoriteIcon")
        || target.parentNode.classList.contains("art-favoriteIcon");
    };

    export const createArtData = (art) => {
        let {id, title, date, img, category, favorite} = art;
        return {id, title, date, img, category, favorite};
    };

    export const  removeFavoriteArt = (art) => {
        let favorites = getFavorites();
        favorites = favorites.filter((item) => {
            return item.id !== art.id;
        });

        updateFavoritesState(favorites);
    };

    const createFavoriteArt = (art) => {
        let favorites = getFavorites();
        favorites = [
            ...favorites,
            {
            ...art,
            }
        ];
        updateFavoritesState(favorites);
    };

    const showMsgModal = (msg) => {
        msgModal.classList.add("active-modal");
        msgModal.textContent = msg;
        setTimeout(()=>{
            msgModal.classList.remove("active-modal");
        }, 2000);
    };



const setFavArt = ({target}) => {
    if (!clickOnFavBtn(target)) {
        return;
    };

    if (isActiveUser()) {
        //Aseguro que el target sea el boton y no el icono
        if (target.classList.contains("fa-star")) {
            target = target.parentNode;
        };

        let icon = target.firstElementChild;
        const article = createArtData(target.dataset);

        if (isFavoriteArt(article.id) === false) {
            createFavoriteArt (article);
            showMsgModal("Se agregó a tus artículos favoritos");
            changeToActiveStar(icon);
        }  else {
            removeFavoriteArt (article);
            showMsgModal("Se quitó de tus artículos favoritos");
            changeToEmptyStar(icon);
        };
    };

    if (!isActiveUser()) {
        handleAlertMsg (1);
        return; 
    };
};

//Capturar ID de articulo abierto por el usuario
const getArtID = ({target}) => {
    if (target.classList.contains("art-title")) {
        let id = target.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.dataset.id;
        saveOpenArtIDOnLocalStorage(id);
    };
};

export const newsSectionInit = () => {
    document.addEventListener("DOMContentLoaded", renderNews(appState.articles[appState.currentIndex]));
    showMoreBtn.addEventListener("click", showMorreArts);
    categoriesBox.addEventListener("click", aplyFilter);
    newsSection.addEventListener("click", setFavArt);
    newsSection.addEventListener("click", getArtID);
};
