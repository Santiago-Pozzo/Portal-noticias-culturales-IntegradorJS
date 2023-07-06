import { artsData } from "../Assets/data.js";

const articleSection = document.querySelector(".articleSection");

//Traer favoritos del local storage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//Traer ID del articulo del local storage
let openArtID = JSON.parse(localStorage.getItem("openArtID"));

//-----------------Renderizar noticia--------------------------

    const getArticleData = (id) => {
        let title = artsData[id-1].title;
        let crest = artsData[id-1].crest;
        let autor = artsData[id-1].autor;
        let date = artsData[id-1].date;
        let text = artsData[id-1].text;
        let img = "." + artsData[id-1].img;
        let category = artsData[id-1].category;
        let favorite = artsData[id-1].favorite;

        return {id, title, crest, autor, date, text, img, category, favorite};
    }

            //Checkeo si un articulo está en favoritos
            const isFavoriteArt = (id) => {
                  return favorites.some((art) => {
                     return art.id == id;
                  });
            }

            //Le doy la clase al icono de favorito
            const favoriteClassName = (isFav) => {
                if (isFav) {
                    return "favorite-active";
                } else {
                    return "favorite-empty";
                }
            }; 

const renderOpenArticle = () => {
    let {title, crest, autor, date, text, img, category} = getArticleData(openArtID);
    let className = favoriteClassName(isFavoriteArt(openArtID));
   
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
};

document.addEventListener("DOMContentLoaded", renderOpenArticle());