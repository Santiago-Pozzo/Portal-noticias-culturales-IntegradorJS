import { favMenuFunctionsInit } from "./Modulos/fav-menu-functions.js";
import { navMenuInit } from "./Modulos/nav-menu-functions.js";
import { newsSectionInit } from "./Modulos/news-functios.js";
import { userStickyInit } from "./Modulos/user-sticky-functions.js";

const init  = () => {
    newsSectionInit();
    favMenuFunctionsInit();
    navMenuInit();
    userStickyInit();    
};

init ();

