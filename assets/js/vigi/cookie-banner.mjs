import { setPreferenciaGA, getPreferenciaGA } from './cookies.mjs';
import { showMainMenu } from './main-menu.mjs';

const cookieBanner = document.getElementById('cookie-banner');

if (getPreferenciaGA() !== null) {
    cookieBanner.remove();
} else {
    cookieBanner.classList.remove('d-none');
    cookieBanner.querySelector('#rejeitar-cookies')
        .addEventListener('click', (e) => {
            removeCookieBanner();
            setPreferenciaGA(false);
        }
    )
    
    cookieBanner.querySelector('#aceitar-cookies')
        .addEventListener('click', (e) => {
            removeCookieBanner();
            setPreferenciaGA(true);
        }
    )
    
    cookieBanner.querySelector('#gerenciar-cookies')
        .addEventListener('click', (e) => {
            removeCookieBanner();
            setPreferenciaGA(false);
            showMainMenu('privacidade');
        }
    )
}

function removeCookieBanner() {
    cookieBanner?.remove();
}