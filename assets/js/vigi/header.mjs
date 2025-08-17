import * as menu from "./menu.mjs";

const menuOpener = document.getElementById('menu-opener');

menuOpener.addEventListener('click', function() {
    menu.abrir();
});