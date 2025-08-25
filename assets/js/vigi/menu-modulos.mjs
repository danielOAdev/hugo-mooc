import { abrir } from "./menu.mjs"
import { exibirSlide } from "./modulos.mjs"

const carousel = document.getElementById('modulosCarrosselMenu');

document.addEventListener('click', function(event) {
    const btnMenuModulo = event.target.closest('button[data-vigi-menu-modulo]');
    const btnMenuAula = event.target.closest('button[data-vigi-menu-aula]');

    if (btnMenuModulo) {
        const moduloIndex = btnMenuModulo.getAttribute('data-vigi-menu-modulo') || undefined;
        abrir();
    }

    if (btnMenuAula) {
        const slideIndex = btnMenuAula.getAttribute('data-vigi-menu-aula') || 0;
        exibirSlide(carousel, slideIndex)
    }
});