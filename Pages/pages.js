const articleSection = document.querySelector(".articleSection");

let openArtID = JSON.parse(localStorage.getItem("openArtID"));

    const getArticleData = (id) => {
        return {id, title, crest, autor, date, text, img, category, favorite} = artsData[id-1];
    }


const renderOpenArticle = () => {
    getArticleData(openArtID);
    img = "."+img;
    
    articleSection.innerHTML = `
        <div class="artHead artSectionChild">
            <div class="art-info artPage-info">
                <h3 class="art-category artPage-category">${category}</h3>
                <h3 class="art-date artPage-date">${date}</h3>
                <div class="art-favoriteIcon artPage-favoriteIcon"><i class="fa-solid fa-star hoverScale"></i></div>
            </div>
        
            <h2 class="art-title artPage-title">${title}</h2>
            <h3 class="artPage-crest">${crest}</h3>

            <div class="artPage-autorInfo">
                <img class="artPage-autorImg" src="../Assets/Images/foto perfil.webp" alt="Imagen del autor">
                <h3 class="artPage-autorName">${autor}</h3>
            </div>
        </div>

        <div class="artSectionChild"><img class="artPage-img" src="${img}"></div>


        <p class="artPage-text artSectionChild"> ${text}</p>
    `
}

document.addEventListener("DOMContentLoaded", renderOpenArticle());