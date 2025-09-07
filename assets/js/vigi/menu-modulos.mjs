import { abrir } from "./menu.mjs"
import { exibirSlide } from "./modulos.mjs"

export const carousel = document.getElementById('modulosCarrosselMenu');

document.addEventListener('click', function(event) {
    const btnMenuModulo = event.target.closest('button[data-vigi-menu-modulo]');
    const btnMenuAula = event.target.closest('button[data-vigi-menu-aula]');

    if (btnMenuModulo) {
        const moduloIndex = btnMenuModulo.getAttribute('data-vigi-menu-modulo') || null;
        if (btnMenuAula) {
            const aulaIndex = btnMenuAula.getAttribute('data-vigi-menu-aula') || 0;
            exibirAula(moduloIndex, aulaIndex)
        } else {
            exibirModulo(moduloIndex);
        }
    }
});

const aba = document.querySelector('#menu-modulos-tab');
aba.addEventListener('show.bs.tab', event => {
    exibirSlide(carousel, 0);
})
aba.addEventListener('click', event => {
    exibirSlide(carousel, 0);
})

function exibirModulo(moduloIndex) {
    exibirSlide(carousel, 0);
    abrir('modulos');
    if (moduloIndex) {
        carousel.querySelector(`.seletor-modulos > button:nth-child(${moduloIndex})`)?.focus({focusVisible: true});
    }
}

function exibirAula(moduloIndex, aulaIndex = null) {
    exibirSlide(carousel, moduloIndex);
    abrir('modulos');
    if (aulaIndex) {
        carousel.querySelector(`.carousel-item:nth-child(${1 + +moduloIndex}) .aula-${aulaIndex} a`)?.focus({focusVisible: true});
    }
}

function getIndexPorNome(nome) {
    const slide = carousel.querySelector(`.slide-${nome}`);
    return Array.prototype.indexOf.call(slide.parentElement.children, slide);
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'l':
            event.preventDefault();
            exibirAula(getIndexPorNome('luana'));
            break;

        case 't':
            event.preventDefault();
            exibirAula(getIndexPorNome('thiago'));
            break;

        case 'm':
            event.preventDefault();
            exibirAula(getIndexPorNome('mariana'));
            break;

        case 'p':
            event.preventDefault();
            exibirAula(getIndexPorNome('pedro'));
            break;

        default:
            break;
    }
});