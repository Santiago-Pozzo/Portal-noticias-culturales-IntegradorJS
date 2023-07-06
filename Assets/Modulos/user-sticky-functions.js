import { activeUser, overlay, isActiveUser } from "./common-functions.js";
import { handleAlertMsg } from "./alert-msg-functions.js";

export const userSticky = document.querySelector(".userSticky");
const heroRegisterDiv = document.querySelector(".hero-register");

//Renderizar sticky----------------------------------------
    const userStickyTemplate = () => {
        userSticky.classList.remove("hidden");
        const userName = document.querySelector(".activeUser");
        userName.innerHTML = `${activeUser.name} ${activeUser.lastName}`;
    };

export const renderUserSticky = () => {
    if (isActiveUser()) {
        userStickyTemplate();
        heroRegisterDiv.classList.add("hidden");
        return;
    };
};

//Cerrar sesion-----------------------------------------------
    //Checkeo que el usuario clickeo en el boton o en el icono 
    const clickOnLogOutBtn = (target) => {
        return target.classList.contains("logOut-btn") ||  target.classList.contains("logOut-icon");
    };

const logOut = ({target}) => {
    if (clickOnLogOutBtn(target)) {
        handleAlertMsg(3);
    };
};

//Esconder al abrir un menu-----------------------------------
const hideStickyOnOpenMenu = () => {
    if (!overlay.classList.contains("hidden")) {
        userSticky.classList.add("hidden");
    } 
};

//INIT----------------------------------------------------------------------------
export const userStickyInit = () => {
    document.addEventListener("DOMContentLoaded", renderUserSticky);
    userSticky.addEventListener("click", logOut);
    document.addEventListener("click", hideStickyOnOpenMenu);
};