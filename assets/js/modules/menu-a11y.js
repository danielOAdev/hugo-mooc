import { removeStoredTheme, setTheme } from './theme.js';
import { removeStoredFontScale, setFontSize } from './font-scale.js';

document.querySelector('#form-a11y button[type="reset"]')
    .addEventListener('click', () => {
        removeStoredTheme()
        setTheme('auto')

        removeStoredFontScale();
        setFontSize('1');
    }
)