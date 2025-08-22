import { abrir } from "./menu.mjs"
import { Carousel } from "../bootstrap/bootstrap.min.mjs";

const carousel = new Carousel('#modulosCarrosselMenu');

document.addEventListener('click', function(event) {
    const btnMenuModulo = event.target.closest('button[data-vigi-menu-modulo]');
    const btnMenuAula = event.target.closest('button[data-vigi-menu-aula]');

    if (btnMenuModulo) {
        const moduloIndex = btnMenuModulo.getAttribute('data-vigi-menu-modulo') || 1;
        abrir();
    }

    if (btnMenuAula) {
        const aulaIndex = btnMenuAula.getAttribute('data-vigi-menu-aula') || 1;
        abrir();
    }
});