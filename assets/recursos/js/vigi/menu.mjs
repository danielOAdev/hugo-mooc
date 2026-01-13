import { carousel } from "./menu-modulos.mjs";
import "./menu-a11y.mjs";
import "./menu-privacidade.mjs";
import { exibirSlide } from "./modulos.mjs"
import { getIndexPorNome, exibirModulo, exibirAula } from "./menu-modulos.mjs"
import { Tab } from "../bootstrap/bootstrap.min.mjs";

export const menu = document.getElementById('menu');
const botaoFechar = document.getElementById('menu-fechar');
const menuConteudo = document.getElementById('menu-conteudo');
const voltarAoTopo = menuConteudo.querySelector('.voltar-ao-topo');
const navTabs = menu.querySelectorAll('#menu-tabs .nav-link');
const navSelect = menu.querySelector('#menu-select select');
const tituloOriginal = document.title;
const hrefOriginal = window.location.origin + window.location.pathname + window.location.search;

let anchorNodeOriginal;
let anchorOffsetOriginal;
let focusNodeOriginal;
let focusOffsetOriginal;

dynamicTarget(window.location);

menu.addEventListener('beforetoggle', (event) => {
    if (event.newState !== 'open') return;
    // Nada por enquanto.
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
    const abaReset = function() {
        navSelect.value = tab.value;
        atualizarLocationAba(this.value);
        menuConteudo.scrollTop = 0;
    }

    tab.addEventListener('show.bs.tab', abaReset);
    tab.addEventListener('click', abaReset);
})

navSelect.addEventListener('change', (event) => {
    Tab.getOrCreateInstance(document.getElementById(`menu-${event.target.value}-tab`)).show();
});

voltarAoTopo.addEventListener('click', (event) => {
    menuConteudo.scrollTop = 0;
});

document.addEventListener('keydown', function(event) {
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;

    if (!document.querySelector('[open]') && event.code === 'Escape') {
        event.preventDefault();
        const modulo = document.documentElement.dataset.vigiModulo;
        const aulaIndex = document.documentElement.dataset.vigiPageIndex;
        if (modulo && aulaIndex) {
            exibirSlide(carousel, aulaIndex);
            exibirAba('modulos');
        } else {
            exibirAba('modulos');
        }
        abrir();
    }
});

menuConteudo.addEventListener('scroll', function() {
  if (menuConteudo.scrollTop > menuConteudo.clientHeight * .5) {
    menuConteudo.classList.add('deslocado');
  } else {
    menuConteudo.classList.remove('deslocado')
  }
});

document.addEventListener('click', function(event) {
    const btnMenu = event.target.closest('button[data-vigi-menu]');

    if (btnMenu) {
        const tabName = btnMenu.getAttribute('data-vigi-menu') || null;
        if (tabName) {
            exibirAba(tabName);
        }
        abrir();
        return;
    }

    // Garante que ao clicar em um link/botão que abre o menu a posição é movida para o link.
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
 * @param {URL|Location|string} url link com hash (#id-do-elemento)
 * @returns
 */
function dynamicTarget(url) {
    if (!(url instanceof URL)) {
        if (!url) return;

        url = new URL(url);
    }
    if (!eIDQueryValida(url.hash)) {
        fechar();
        return;
    }

    let target;
    target = menu.querySelector(url.hash);

    // Se o alvo já está visível na tela, paramos aqui e deixamos o navegador assumir o controle.
    if (target && target.checkVisibility?.() || false) return;

    // Hashs dinâmicos para os itens do menu.
    // Dinâmicos pois não existe um elemento com esse ID no DOM.
    // Essas hashs tem o formato "#menu-{nome-do-menu}".
    if (url.hash.startsWith('#menu-')) {
        target = menu.querySelector(url.hash + '-tab');
        if (target) {
            exibirAba(target.id.split('menu-')[1].split('-tab')[0]);
            abrir();
            return;
        }
    }

    // Hashs dinâmicos para os módulos.
    const re = /^#modulos-(?<modulo>.+?)(?:--aula-(?<aula>\d+))?$/i;
    const match = re.exec(url.hash);
    if (match) {
        const { modulo, aula } = match.groups;
        if (modulo) {
            if (aula) {
                exibirAula(getIndexPorNome(modulo), aula);
            } else {
                exibirModulo(getIndexPorNome(modulo));
            }
        }
    };

    target = menu.querySelector(url.hash);
    if (!target) return;

    const conteudo = target.closest('[role="tabpanel"]');
    if (!conteudo) return;

    const nome = conteudo.id.split('menu-')[1].split('-conteudo')[0];
    const tabElem = menu.querySelector('#menu-' + nome + '-tab');
    if (!tabElem) return;

    //Salva seleção antes de abrir o menu.
    salvarSelecao();
    exibirAba(nome);
    abrir();
    window.location.hash = url.hash;
    target.scrollIntoView();
    target.focus();
}

window.addEventListener('hashchange', () => {
    dynamicTarget(window.location);
})

/**
 * Abre o menu.
 * 
 * @param {null|string} nomeAba Nome da aba na qual o menu deve exibir ao abrir.
 * Ou deixe nulo para abrir menu na aba padrão.
 */
export function abrir() {
    menu.showModal();
}

/**
 * Fecha o menu.
 */
export function fechar() {
    menu.close();
}

export function exibirAba(nomeAba) {
    const tab = menu.querySelector(`#menu-${nomeAba}-tab[data-bs-target]`);
    if (!tab) return false;

    const tabConteudo = menu.querySelector(`#menu-${nomeAba}-conteudo`);

    menu.open || tabConteudo.classList.remove('fade');
    Tab.getOrCreateInstance(tab).show();
    navSelect.value = nomeAba;
    menu.open || tabConteudo.classList.add('fade');

    if (!eIDQueryValida(window.location.hash) || !menu.querySelector(window.location.hash)) {
        atualizarLocationAba(nomeAba);
    }
    return true;
}

function salvarSelecao() {
    anchorNodeOriginal = window.getSelection().anchorNode;
    anchorOffsetOriginal = window.getSelection().anchorOffset;
    focusNodeOriginal = window.getSelection().focusNode;
    focusOffsetOriginal = window.getSelection().focusOffset;
}


function atualizarLocationAba(nomeAba) {
    const tab = menu.querySelector(`#menu-${nomeAba}-tab`);
    if (!tab) return;

    document.title = `${tab.textContent} | ${tituloOriginal}`;
    window.location.hash = `#menu-${nomeAba}`; // Necessário para limpar seletor css ":target".
    history.replaceState({}, document.title, `${window.location.pathname}#menu-${nomeAba}`);
}

function eIDQueryValida(id) {
    const regex = /^#?[a-zA-Z_][a-zA-Z0-9_-]*$/;
    return regex.test(id);
}