import Tema from './preferencias/tema.mjs';
import { removeStoredFontScale, setFontSize } from './preferencias/tamanho-da-fonte.mjs';

document.querySelector('#form-a11y button[type="reset"]')
    .addEventListener('click', () => {
        Tema.esquecer();

        removeStoredFontScale();
        setFontSize('1');
    }
)