/**
 * Banner de solicitação de consentimento para o uso de cookies.
 * @author Daniel de Oliveira Araujo <danieloadev@gmail.com>
 * @copyright Daniel de Oliveira Araujo 2025
 */

import GA from './preferencias/privacidade/ga.mjs';
import * as Menu from './menu.mjs';

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
            Menu.abrir('privacidade');
        }
    )
}

function removeCookieBanner() {
    cookieBanner?.remove();
}