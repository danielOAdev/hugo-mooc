import "./menu-a11y.mjs";
import "./menu-privacidade.mjs";
import * as bootstrap from "../bootstrap/bootstrap.min.mjs";

const menu = document.getElementById('menu');
const botaoFechar = document.getElementById('menu-fechar');
const navTabs = menu.querySelectorAll('#menu-tabs .nav-link');
const navSelect = menu.querySelector('#menu-select select');

menu.addEventListener("beforetoggle", (event) => {
    if (event.newState === 'open') {
        const tabName = event.target.currentTab ?? 'modulos';
        const tab = document.getElementById(`menu-${tabName}-tab`);
        const tabConteudo = document.getElementById(`menu-${tabName}-conteudo`);

        event.target.currentTab = null;
        tabConteudo.classList.remove('fade');
        bootstrap.Tab.getOrCreateInstance(tab).show();
        tabConteudo.classList.add('fade');
    }
});

menu.addEventListener('toggle', (event) => {
    if (event.newState === 'open') {
        menu.querySelector('#menu-titlebar button').focus()
    }
});

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
    bootstrap.Tab.getOrCreateInstance(document.getElementById(`menu-${event.target.value}-tab`)).show();
});

document.addEventListener('keydown', function(event) {
    if (!document.querySelector(':open') && event.code === 'Escape') {
        event.preventDefault();
        abrir();
    }
});

export function abrir(tabName = "modulos") {
    menu.currentTab = tabName;
    menu.showModal();
}

export function fechar() {
    menu.close();
}
