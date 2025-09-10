import { carousel } from "./menu-modulos.mjs";
import "./menu-a11y.mjs";
import "./menu-privacidade.mjs";
import { exibirSlide } from "./modulos.mjs"
import { Tab } from "../bootstrap/bootstrap.min.mjs";

export const menu = document.getElementById('menu');
const botaoFechar = document.getElementById('menu-fechar');
const navTabs = menu.querySelectorAll('#menu-tabs .nav-link');
const navSelect = menu.querySelector('#menu-select select');

if (!document.querySelector(':target')?.checkVisibility()) {
    dynamicTarget(window.location);
}

botaoFechar.addEventListener('click', () => {
    fechar();
});

navTabs.forEach(tab => {
    tab.addEventListener('show.bs.tab', (event) => {
        navSelect.value = event.target.value;
        menu.currentTab = event.target.value;
    })
})

navSelect.addEventListener('change', (event) => {
    Tab.getOrCreateInstance(document.getElementById(`menu-${event.target.value}-tab`)).show();
});

document.addEventListener('keydown', function(event) {
    if (!document.querySelector(':open') && event.code === 'Escape') {
        event.preventDefault();
        abrir();
    }
});

document.addEventListener('click', function(event) {
    const btnMenu = event.target.closest('button[data-vigi-menu]');

    if (btnMenu) {
        const tabName = btnMenu.getAttribute('data-vigi-menu') || null;
        abrir(tabName);
    }

    dynamicTarget(event.target.href);
});

/**
 * 
 * @param {string} url
 * @returns
 */
function dynamicTarget(url) {
    if (!(url instanceof URL)) {
        if (!url) return;

        url = new URL(url);
    }
    if (!url?.hash) return;

    const target = menu.querySelector(url.hash);
    if (!menu.contains(target)) return;

    const conteudo = target.closest('[role="tabpanel"]');
    if (!conteudo) return;

    const nome = conteudo.id.split('menu-')[1].split('-conteudo')[0];
    const tabElem = menu.querySelector('#menu-' + nome + '-tab');
    if (!tabElem) return;

    abrir(nome);
    target.scrollIntoView();
    target.focus();
}

/**
 * Abre o menu
 * 
 * @param {null|string} nomeAba Nome da aba na qual o menu deve exibir ao abrir.
 * Ou deixe nulo para abrir menu na aba padrão.
 */
export function abrir(nomeAba = null) {
    if (nomeAba) {
        exibirAba(nomeAba);
    } else {
        exibirAba('modulos');
        exibirSlide(carousel, 0);
    }
    menu.showModal();
}

export function fechar() {
    menu.close();
}

function exibirAba(nomeAba) {
    const tab = document.getElementById(`menu-${nomeAba}-tab`);
    const tabConteudo = document.getElementById(`menu-${nomeAba}-conteudo`);

    tabConteudo.classList.remove('fade');
    Tab.getOrCreateInstance(tab).show();
    tabConteudo.classList.add('fade');
}
