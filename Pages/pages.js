const articleSection = document.querySelector(".articleSection");

//Traer favoritos del local storage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//Traer ID del articulo del local storage
let openArtID = JSON.parse(localStorage.getItem("openArtID"));

    const getArticleData = (id) => {
        return {id, title, crest, autor, date, text, img, category, favorite} = artsData[id-1];
    }

            //Checkeo si un articulo está en favoritos
            const isFavoriteArt = (id) => {
                  return favorites.some((art) => {
                     return art.id == id;
                  });
            }

            const favoriteClassName = (isFav) => {
                if (isFav) {
                    return "favorite-active";
                } else {
                    return "favorite-empty";
                }
            }    
const renderOpenArticle = () => {
    getArticleData(openArtID);
    let className = favoriteClassName(isFavoriteArt(openArtID));
    //Corrijo ruta del archivo con la img
    img = "."+img;
    

    articleSection.innerHTML = `
        <div class="artHead artSectionChild">
            <div class="art-info artPage-info">
                <h3 class="art-category artPage-category">${category}</h3>
                <h3 class="art-date artPage-date">${date}</h3>
                <div class="art-favoriteIcon artPage-favoriteIcon"><i class="fa-solid fa-star ${className}"></i></div>
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