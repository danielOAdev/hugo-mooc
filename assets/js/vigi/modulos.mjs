import { abrir } from "./menu.mjs";
import { Carousel } from "../bootstrap/bootstrap.min.mjs";

const modulosCarrossel = document.querySelectorAll('.modulos-carrossel');

modulosCarrossel.forEach(moduloCarrossel => {
    //const seletor = document.getElementsByClassName('seletor-modulos');
    //const botoesAulas = seletor.querySelectorAll('button');
    const inner = moduloCarrossel.querySelector('.carousel-inner');

    moduloCarrossel.addEventListener('slid.bs.carousel', event => {
        //event.relatedTarget
        //event.to
        const botoes = inner.querySelectorAll('.carousel-item button');
        if (event.to === 0) {
            botoes[event.from - 1].focus();
        } else {
            event.relatedTarget.querySelector('button').focus();
        }
    })
});

export function exibirSlide(elemCarrossel, index) {
    const carrossel = Carousel.getOrCreateInstance(elemCarrossel);
    carrossel.to(index);
    abrir();
}