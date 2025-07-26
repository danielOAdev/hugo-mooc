import GA from '../preferencias/privacidade/ga.mjs';
import { gTagID, gTagConfig } from './gtag-config.mjs';

export const inicializar = (function() {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': GA.valor ? 'granted' : 'denied'
    });
    gtag('js', new Date());
    gtag('config', gTagID, gTagConfig);
})();