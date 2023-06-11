const newsSection = document.querySelector(".news-section");
const showMoreBtn = document.querySelector(".btn-seeMore");
const categoriesBox = document.querySelector(".categories-box"); 
const categoriesBtnsAll = document.querySelectorAll(".categories-btn");
const headerFavoritesBtn = document. querySelector(".favorites-label");
const favoritesMenu = document.querySelector(".favoritesMenu");
const navMenu = document.querySelector(".navbar-list");
const hamburgerBtn = document.querySelector(".menu-label");
const overlay = document.querySelector(".overlay");


//Renderizar noticias
    const createArtTemplate = (art) => {
        const {id, title, date, img, category, favorite} = art;

        return `
            <div class="art-box">
                <div class="art-info">
                    <h3 class="art-category">${category}</h3>
                    <h3 class="art-date">${date}</h3>
                    <button
                    data-id="${id}"
                    data-title="${title}"
                    data-date="${date}"
                    data-img="${img}"
                    data-category="${category}"
                    data-favorite="${favorite}"   
                    class="art-favoriteIcon">
                        <i class="fa-solid fa-star favorite-off hoverScale"></i>
                    </button>
                </div>

                <div class="art-content">
                    <img class="art-img" src="${img}" alt="${title}">
                    <a href="#"><h2 class="art-title hoverScale">${title}</h2></a>                        
                </div>
            </div>
        `
    }

const renderNews = (artList) => {
    newsSection.innerHTML += artList.map(createArtTemplate).join("");
}

//Mostrar más articulos
    const isLastIndex = () => {
        return appState.currentIndex === appState.artsLimit - 1;
    }

const showMorreArts = () => {
    appState.currentIndex += 1;
    let {articles, currentIndex} = appState;
    renderNews(articles[currentIndex]);
    if (isLastIndex()) {
        showMoreBtn.classList.add("hidden");
    }
}

//Filtrar noticias por categoria
    const isInactiveFilterBtn = (btn) => {
        return (
            btn.classList.contains("categories-btn") && !btn.classList.contains("category-active")
        )
        
    }

        const changeBtnState = (selectCategory) => {
             const categories = [... categoriesBtnsAll];
             categories.forEach((categoryBtn) => {
                if (categoryBtn.dataset.category !== selectCategory) {
                    categoryBtn.classList.remove("category-active");
                    return;
                }
                categoryBtn.classList.add("category-active")
             })
        }

    const changesFilterState = (btn) => {
        appState.activeFilter = btn.dataset.category;
        changeBtnState(appState.activeFilter);
    }

    const showMoreBtnVisivility = () => {
        if (!appState.activeFilter) {
            showMoreBtn.classList.remove("hidden");
            return;
        }
        showMoreBtn.classList.add("hidden");
    }

    renderFilterCategory = () => {
        const filteredArts = artsData.filter((art) => {
            return art.category === appState.activeFilter;
        });
        renderNews(filteredArts);
    }

const aplyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)){
        return
    }

    changesFilterState(target);
    showMoreBtnVisivility ();

    newsSection.innerHTML = "";
    if (appState.activeFilter) {
        renderFilterCategory();
        currentIndex = 0;
        return;
    }

    renderNews(appState.articles[0]);
}

//Abrir y cerrar menú favoritos
const toggleFavMenu = () => {
    favoritesMenu.classList.toggle("favorites-open");
    if (navMenu.classList.contains("navbar-open")) {
        navMenu.classList.remove("navbar-open");
        return;
    }
    overlay.classList.toggle("hidden");
}

//Abrir y cerrar menú hamburguesa
const toggleNavMenu = () => {
    navMenu.classList.toggle("navbar-open");
    if (favoritesMenu.classList.contains("favorites-open")) {
        favoritesMenu.classList.remove("favorites-open");
        return;
    }
    overlay.classList.toggle("hidden");
}

//Cerrar menúes al scrollear
const closeMenuOnScroll = () => {
    if (navMenu.classList.contains("navbar-open") 
     || favoritesMenu.classList.contains("favorites-open")) {
        favoritesMenu.classList.remove("favorites-open");
        navMenu.classList.remove("navbar-open");
        overlay.classList.add("hidden");
    }
}

//Cerrar menúes al clickear en el overlay
const closeMenuOnClick = () => {
    favoritesMenu.classList.remove("favorites-open");
    navMenu.classList.remove("navbar-open");
    overlay.classList.add("hidden");
}

//Cerrar nav menú al clickear una opción 
const closeNavMenuOnClick = (e) => {
    if (e.target.classList.contains("navbar-link")){
        navMenu.classList.remove("navbar-open");
        overlay.classList.add("hidden");
    }
}


//---------------------------Init--------------------------------
const init  = () => {
    renderNews(appState.articles[appState.currentIndex]);
    showMoreBtn.addEventListener("click", showMorreArts);
    categoriesBox.addEventListener("click", aplyFilter);
    headerFavoritesBtn.addEventListener("click", toggleFavMenu);
    hamburgerBtn.addEventListener("click", toggleNavMenu);
    window.addEventListener("scroll", closeMenuOnScroll);
    overlay.addEventListener("click", closeMenuOnClick);
    navMenu.addEventListener(("click", closeNavMenuOnClick));
};

init ();
