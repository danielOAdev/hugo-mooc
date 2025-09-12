import { carousel } from "./menu-modulos.mjs";
import "./menu-a11y.mjs";
import "./menu-privacidade.mjs";
import { exibirSlide } from "./modulos.mjs"
import { Tab } from "../bootstrap/bootstrap.min.mjs";

export const menu = document.getElementById('menu');
const botaoFechar = document.getElementById('menu-fechar');
const navTabs = menu.querySelectorAll('#menu-tabs .nav-link');
const navSelect = menu.querySelector('#menu-select select');
const tituloOriginal = document.title;
const hrefOriginal = (document.location.hash.startsWith('#menu-') && menu.querySelector(document.location.hash + '-tab')) ? 
    document.location.origin + document.location.pathname :
    document.location.href;

if (!document.querySelector(':target')?.checkVisibility()) {
    dynamicTarget(window.location);
}

menu.addEventListener('close', (event) => {
    document.title = tituloOriginal;
    history.replaceState(null, '', hrefOriginal);
});

botaoFechar.addEventListener('click', () => {
    fechar();
});

navTabs.forEach(tab => {
    tab.addEventListener('show.bs.tab', (event) => {
        navSelect.value = event.target.value;
        history.replaceState({}, document.title, `${document.location.pathname}#menu-${event.target.value}`);
        document.title = `${event.target.textContent.trim()} | ${tituloOriginal}`
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
        return;
    }

    dynamicTarget(event.target.href);
});

/**
 * Foca e rola para objetos não visíveis na página.
 * Também aceita hashs dinâmicos para os itens do menu.
 * 
 * @param {string} url link com hash (#id-do-elemento)
 * @returns
 */
function dynamicTarget(url) {
    if (!(url instanceof URL)) {
        if (!url) return;

        url = new URL(url);
    }
    if (!url?.hash) return;

    let target;
    target = document.querySelector(url.hash);

    // Se o alvo já está visivel na tela, paramos aqui e deixamos o navegador assumir o controle.
    if (target && target.checkVisibility()) return;

    // Hashs dinâmicos para os itens do menu.
    // Dinâmicos pois não existe um elemento com esse ID no DOM.
    // Essas hashs tem o formato "#menu-{nome-do-menu}".
    if (url.hash.startsWith('#menu-')) {
        target = menu.querySelector(url.hash + '-tab');
        if (target) {
            abrir(target.id.split('menu-')[1].split('-tab')[0]);
            return;
        }
    }

    target = menu.querySelector(url.hash);
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

document.addEventListener('hashchange', () => {
    dynamicTarget(location);
})

/**
 * Abre o menu.
 * 
 * @param {null|string} nomeAba Nome da aba na qual o menu deve exibir ao abrir.
 * Ou deixe nulo para abrir menu na aba padrão.
 */
export function abrir(nomeAba = null) {
    if (nomeAba) {
        exibirAba(nomeAba);
    } else if (!menu.open) {
        exibirAba('modulos');
        exibirSlide(carousel, 0);
    }

    menu.showModal();
}

/**
 * Fecha o menu.
 */
export function fechar() {
    menu.close();
}

function exibirAba(nomeAba) {
    const tab = document.getElementById(`menu-${nomeAba}-tab`);
    if (!tab) return false;

    const tabConteudo = document.getElementById(`menu-${nomeAba}-conteudo`);

    menu.open || tabConteudo.classList.remove('fade');
    Tab.getOrCreateInstance(tab).show();
    menu.open || tabConteudo.classList.add('fade');
    document.title = `${tab.textContent.trim()} | ${tituloOriginal}`
    return true;
}
