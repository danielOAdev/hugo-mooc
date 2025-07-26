import GA from './preferencias/privacidade/ga.mjs';
import { showMainMenu } from './main-menu.mjs';

const cookieBanner = document.getElementById('cookie-banner');

if (GA.valor !== null) {
    removeCookieBanner();
} else {
    cookieBanner.classList.remove('d-none');
    cookieBanner.querySelector('#rejeitar-cookies')
        .addEventListener('click', (e) => {
            GA.valor = false;
            removeCookieBanner();
        }
    )
    
    cookieBanner.querySelector('#aceitar-cookies')
        .addEventListener('click', (e) => {
            GA.valor = true;
            removeCookieBanner();
        }
    )
    
    cookieBanner.querySelector('#gerenciar-cookies')
        .addEventListener('click', (e) => {
            GA.valor = false;
            removeCookieBanner();
            showMainMenu('privacidade');
        }
    )
}

function removeCookieBanner() {
    cookieBanner?.remove();
}