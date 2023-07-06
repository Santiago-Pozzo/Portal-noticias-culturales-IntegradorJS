import { updateFavoritesState } from "./common-functions.js";
import { userSticky } from "./user-sticky-functions.js";
import { changeToEmptyAllStars } from "./fav-menu-functions.js";

const alertMsgBox = document.querySelector(".alertMsg-box");

let userChoice;


//Acciones del mensaje de alerta--------------------------------------------------
    //Capturo la opción elegida por el usuario
        const userChoiceListener = ({target}) => {
            if (!target.classList.contains("btn")) {
                userChoice = 0;
            };
            if(target.classList.contains("btn1")) {
                userChoice = 1;
            };
            if(target.classList.contains("btn2")) {
                userChoice = 2;
            };
        ;}

    const waitForUserChoice = () => new Promise(resolve =>  {
                alertMsgBox.addEventListener("click", event => {
                    userChoiceListener(event);
                    resolve();  // Resuelve la promesa una vez que se ejecuta userChoiceListener
                });
        });
    
    const renderAlertMsg = (title, text, btn1, btn2) => {
        alertMsgBox.classList.remove("hidden");
        alertMsgBox.innerHTML = `
            <h3 class="alertMsg-title">${title}</h3>
            <p class="alertMsg-text">${text}</p>
            <div class="alertMsg-btnBox">
                <button class="btn alertMsg-btn btn1">${btn1}</button>
                <button class="btn alertMsg-btn btn2">${btn2}</button>
            </div>
        `
        return;
    };

    //Realiza acciones según las opciones seleccionadas por el usuario
    const alertBtnActions = (alert, choice) => {
        if (choice === 2) {
        alertMsgBox.classList.add("hidden");
        userChoice = 0;
        return;
        };
   
        if (choice === 1) {
            if (alert === 1) {
                window.location.href = "./Pages/login.html";
                return;
            };
    
            if (alert === 2) {
                let favorites = [];
                changeToEmptyAllStars(); 
                updateFavoritesState(favorites);
                alertMsgBox.classList.add("hidden");
                return;
            };

            if (alert === 3) {
                userSticky.classList.add("hidden");
                sessionStorage.removeItem("activeUser");
                alertMsgBox.classList.add("hidden");
                window.location.href = "./index.html";
                return;
            };
        };

    };

export const handleAlertMsg = (alertNumber) => {
    //Renderiza según cada caso de mensaje de alerta
    if (alertNumber === 1) {
        renderAlertMsg ("Agregar a favoritos",
                        "Tenés que iniciar sesión para poder agregar artículos a tus favoritos", 
                        "Ingresar",
                        "Cancelar");                      
    };

    if (alertNumber === 2) {
        renderAlertMsg ("Eliminar todos tus favoritos",
                        "Estás a punto de borrar todos tus artículos favoritos. ¿Deseas continuar?", 
                        "Eliminar todos",
                        "Cancelar");
    };

    if (alertNumber === 3) {
        renderAlertMsg ("Cerrar sesión",
                        "Estás a punto de cerrar tu sesión ¿Deseas continuar?", 
                        "Cerrar sesión",
                        "Cancelar");       
    };

    //Escucho la elección del usuario
    waitForUserChoice().then(() => alertBtnActions(alertNumber, userChoice)) 
};    
