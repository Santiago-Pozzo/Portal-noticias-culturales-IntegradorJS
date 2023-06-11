const newsSection = document.querySelector(".news-section");
const showMoreBtn = document.querySelector(".btn-seeMore");
const categoriesBox = document.querySelector(".categories-box"); 
const categoriesBtnsAll = document.querySelectorAll(".categories-btn");
const headerFavoritesBtn = document. querySelector(".favorites-label");

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


//--------------------Init-----------------------
const init  = () => {
    renderNews(appState.articles[appState.currentIndex]);
    showMoreBtn.addEventListener("click", showMorreArts);
    categoriesBox.addEventListener("click", aplyFilter);
};

init ();
