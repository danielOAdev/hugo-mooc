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
const hrefOriginal = document.location.hash && (menu.querySelector(document.location.hash) || menu.querySelector(document.location.hash + '-tab')) ?
    document.location.origin + document.location.pathname :
    document.location.href;

let anchorNodeOriginal;
let anchorOffsetOriginal;
let focusNodeOriginal;
let focusOffsetOriginal;

// Se "target" está oculto, é possivel que ele esteja dentro do menu principal.
if (window.location.hash && menu.querySelector(window.location.hash)) {
    dynamicTarget(window.location);
}

menu.addEventListener('beforetoggle', (event) => {
    if (event.newState !== 'open') return;

    //Salva seleção antes de abrir o menu.
    saveSelection();
});

menu.addEventListener('close', (event) => {
    // Restaura titulo da página.
    document.title = tituloOriginal;

    // Restaura URL.
    history.replaceState(null, '', hrefOriginal);

    // Restaura posição do cursor/seleção.
    if (anchorNodeOriginal || focusNodeOriginal) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.setStart(anchorNodeOriginal, anchorOffsetOriginal);
        selection.addRange(range);
        selection.extend(focusNodeOriginal, focusOffsetOriginal);
        anchorNodeOriginal.parentElement.scrollIntoViewIfNeeded()
    }
});

botaoFechar.addEventListener('click', () => {
    fechar();
});

navTabs.forEach(tab => {
    tab.addEventListener('show.bs.tab', (event) => {
        atualizarLocationAba(event.target.value);
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

    // Garante que ao clicar em um link/botão que abre o menu
    const anchor = event.target.closest('a');
    if (anchor) {
        if (!window.getSelection().containsNode(anchor, true)) {
            window.getSelection().setPosition(anchor);
        }
        dynamicTarget(anchor.href);
    }
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
    target = menu.querySelector(url.hash);

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
    const tab = menu.querySelector(`#menu-${nomeAba}-tab`);
    if (!tab) return false;

    const tabConteudo = menu.querySelector(`#menu-${nomeAba}-conteudo`);

    menu.open || tabConteudo.classList.remove('fade');
    Tab.getOrCreateInstance(tab).show();
    menu.open || tabConteudo.classList.add('fade');
    atualizarLocationAba(nomeAba);
    return true;
}

/**
 * Salva seleção.
 */
function saveSelection() {
    anchorNodeOriginal = window.getSelection().anchorNode;
    anchorOffsetOriginal = window.getSelection().anchorOffset;
    focusNodeOriginal = window.getSelection().focusNode;
    focusOffsetOriginal = window.getSelection().focusOffset;
}


function atualizarLocationAba(nomeAba) {
    const tab = menu.querySelector(`#menu-${nomeAba}-tab`);
    if (!tab) return;

    document.title = `${tab.textContent} | ${tituloOriginal}`;
    document.location.hash = `#menu-${nomeAba}`; // Necessário para limpar seletor css ":target".
    history.replaceState({}, document.title, `${document.location.pathname}#menu-${nomeAba}`);
}