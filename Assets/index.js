const newsSection = document.querySelector(".news-section");
const showMoreBtn = document.querySelector(".btn-seeMore");
const categoriesBox = document.querySelector(".categories-box");
const categoriesBtnsAll = document.querySelectorAll(".categories-btn");
const headerFavoritesBtn = document. querySelector(".favorites-label");
const favoritesMenu = document.querySelector(".favoritesMenu");
const navMenu = document.querySelector(".navbar-list");
const hamburgerBtn = document.querySelector(".menu-label");
const overlay = document.querySelector(".overlay");
const headerFavIcon = document.querySelector(".navbar-favoriteIcon");
const favoritesFavIcon = document.querySelector(".favoritesMenu-icon");
const favoritesContainer = document.querySelector(".favorites-container");
const cleanFavBtn = document.querySelector(".cleanFavorites-btn");
const msgModal = document.querySelector(".add-modal");
const cleanFavoritesBtn = document.querySelector(".cleanFavorites-btn");
const userSticky = document.querySelector(".userSticky");

//Traer usuario activo del session storage
let activeUser = JSON.parse(sessionStorage.getItem("activeUser")) || {};

//Traer favoritos del local storage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//Guardar favoritos en el local storage
const saveFavoritesOnLocalStorage = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};



//Renderizar noticias---------------------------------------------
        //Checkeo si un articulo está en favoritos
        const isFavoriteArt = (id) => {
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
        const {id, title, date, img, category, favorite} = art;
        
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

    renderFilterCategory = (category) => {
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
        renderFilterCategory(target.dataset.category);
        currentIndex = 0;
        return;
    };

    appState.currentIndex = 0;
    renderNews(appState.articles[0]);
};

//MENUES
//Abrir y cerrar menú favoritos--------------------------------
const toggleFavMenu = () => {
    favoritesMenu.classList.toggle("favorites-open");
    if (navMenu.classList.contains("navbar-open")) {
        navMenu.classList.remove("navbar-open");
        return;
    };

    overlay.classList.toggle("hidden");
};

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

//Cerrar menúes al clickear en el overlay----------------------
const closeMenuOnClick = () => {
    favoritesMenu.classList.remove("favorites-open");
    navMenu.classList.remove("navbar-open");
    overlay.classList.add("hidden");
    renderUserSticky();
};

//Cerrar nav menú al clickear una opción-----------------------
const closeNavMenuOnClick = (e) => {
    if (e.target.classList.contains("navbar-link")){
        navMenu.classList.remove("navbar-open");
        overlay.classList.add("hidden");
    };
};

//FAVORITOS
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

    const changeToActiveStar = (icon) => {
        icon.classList.remove("favorite-empty");
        icon.classList.add("favorite-active");
    };

    const changeToEmptyStar = (icon) => {
        icon.classList.remove("favorite-active");
        icon.classList.add("favorite-empty");
    };

    const changeToEmptyAllStars = () => {
        //allArtFavoriteIcon.innerHTML = `"<i class="fa-solid fa-star hoverScale"></i>"`;
        const allArtFavoriteIcon = document.querySelectorAll(".art-favoriteIcon");
        for (let i = 0; i < allArtFavoriteIcon.length; i++) {
            changeToEmptyStar(allArtFavoriteIcon[i].firstElementChild);
        };

        changeToEmptyStar(headerFavIcon);
        changeToEmptyStar(favoritesFavIcon);    
    };

const renderFavorites = () => {

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

//Agregar y quitar artículo favorito desde la secion de noticias-------------
    clickOnFavBtn = (target) => {
        return target.classList.contains("art-favoriteIcon")
        || target.parentNode.classList.contains("art-favoriteIcon");
    };

    const createArtData = (art) => {
        const {id, title, date, img, category, favorite} = art;
        return {id, title, date, img, category, favorite};
    };

    const  removeFavoriteArt = (art) => {

        favorites = favorites.filter((item) => {
            return item.id !== art.id;
        });

        updateFavoritesState();
    };

    const createFavoriteArt = (art) => {
        favorites = [
            ...favorites,
            {
               ...art,
            }
        ];

        updateFavoritesState();
    };

    const showMsgModal = (msg) => {
        msgModal.classList.add("active-modal");
        msgModal.textContent = msg;
        setTimeout(()=>{
            msgModal.classList.remove("active-modal");
        }, 2000);
    };

    const updateFavoritesState = () => {
        saveFavoritesOnLocalStorage();
        renderFavorites();
        if (!favorites.length) {
            changeToEmptyAllStars();
        };
    };

const setFavArt = ({target}) => {
    if (!clickOnFavBtn(target)) {
        return;
    };
    //Aseguro que el target sea el boton y no el icono
    if (target.classList.contains("fa-star")) {
        target = target.parentNode;
    };

    icon = target.firstElementChild;
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

//Quitar articulo desde el menu favoritos-----------------------------
    clickOnTrashBtn = (target) => {
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

    const article = createArtData(target.dataset);
    removeFavoriteArt(article);

    const deletedFavArt = document.getElementById(article.id);
    const favIconFromDeletedArt = deletedFavArt.firstElementChild.lastElementChild.firstElementChild;
    changeToEmptyStar(favIconFromDeletedArt);
    updateFavoritesState();
};

//Borrar todos los favoritos desde el menu favoritos-------------------
    const isCleanFavoritesBtn = (target) => {
       return target.classList.contains("cleanFavorites-btn");
    };

const cleanFavorites = ({target}) => {
    if (isCleanFavoritesBtn(target) && window.confirm("¿Quieres borrar tus artículos favoritos?")){
        favorites = [];
        changeToEmptyAllStars(); 
        updateFavoritesState();
    };
};

//Abrir noticia en nueva pestaña---------------------------------------
    const getArtID = (target) => {
        return target.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.dataset.id;
    };

    const saveOpenArtIDOnLocalStorage = (data) => {
        localStorage.setItem("openArtID", JSON.stringify(data));
    };

const openArtID = ({target}) => {
    saveOpenArtIDOnLocalStorage(getArtID(target));
};

//Funciones del sticky con nombre de usuario activo-------------------------
//Renderizar sticky
    const isActiveUser = () => {
        return sessionStorage.getItem("activeUser") !== null;
    };

    const userStickyTemplate = () => {
        userSticky.classList.remove("hidden");
        const userName = document.querySelector(".activeUser");
        userName.innerHTML = `${activeUser.name} ${activeUser.lastName}`;
    };

const renderUserSticky = () => {
    if (isActiveUser()) {
        console.log("hay un usuario activo vieja");
        userStickyTemplate();
        return;
    };
    console.log("no hay usuario activo vieja");
};

//Cerrar sesion
    const clickOnLogOutBtn = (target) => {
        return target.classList.contains("logOut-btn") ||  target.classList.contains("logOut-icon");
    };

const logOut = ({target}) => {
    if (clickOnLogOutBtn(target) && window.confirm("¿Quieres cerrar sesión?")) {
        userSticky.classList.add("hidden");
        activeUser = {};
        sessionStorage.removeItem("activeUser");
    };
};

//Esconder al abrir un menu
const hideOnOpenMenu = ({target}) => {
    if (target.classList.contains("label")) {
        userSticky.classList.add("hidden");
    } 
};

//----------------------------------Init--------------------------------------------
const init  = () => {
    document.addEventListener("DOMContentLoaded", renderNews(appState.articles[appState.currentIndex]));
    showMoreBtn.addEventListener("click", showMorreArts);
    categoriesBox.addEventListener("click", aplyFilter);
    headerFavoritesBtn.addEventListener("click", toggleFavMenu);
    hamburgerBtn.addEventListener("click", toggleNavMenu);
    window.addEventListener("scroll", closeMenuOnScroll);
    overlay.addEventListener("click", closeMenuOnClick);
    navMenu.addEventListener("click", closeNavMenuOnClick);
    document.addEventListener("DOMContentLoaded", renderFavorites);
    newsSection.addEventListener("click", setFavArt);
    newsSection.addEventListener("click", openArtID);
    favoritesContainer.addEventListener("click", removeFavoriteArtFromList);
    favoritesContainer.parentNode.addEventListener("click", cleanFavorites);
    document.addEventListener("DOMContentLoaded", renderUserSticky);
    userSticky.addEventListener("click", logOut);
    document.addEventListener("click", hideOnOpenMenu);
};

init ();

