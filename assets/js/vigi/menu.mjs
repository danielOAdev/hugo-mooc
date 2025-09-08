import { carousel } from "./menu-modulos.mjs";
import "./menu-a11y.mjs";
import "./menu-privacidade.mjs";
import { exibirSlide } from "./modulos.mjs"
import { Tab, Collapse } from "../bootstrap/bootstrap.min.mjs";

export const menu = document.getElementById('menu');
const botaoFechar = document.getElementById('menu-fechar');
const navTabs = menu.querySelectorAll('#menu-tabs .nav-link');
const navSelect = menu.querySelector('#menu-select select');

dynamicAnchor();

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
});

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

function dynamicAnchor() {
    const anchor = (window.location.hash).substring(1);
    const array = anchor.split('/');

    array.forEach(id => {
        const element = document.querySelector('#'+id);

        if (element) {

            // Se for um modal: abra-o
            if (element.tagName === 'DIALOG') {
                element.showModal();
                return;
            }

            // Se for um botão ou link: clique-o
            if (['BUTTON', 'A'].includes(element.tagName)) {
                const clickEvent = new MouseEvent('click');
                element.dispatchEvent(clickEvent);

                const component = element.getAttribute('data-bs-toggle');

                if (component && element.getAttribute('data-bs-target')) {
                    const target = document.querySelector(element.getAttribute('data-bs-target'));
                    if (target) {
                        element.addEventListener(`shown.bs.${component}`, function() {
                            target.scrollIntoView();
                        }, { once: true });
                    }
                }

                return;
            }
        }
    });
}
