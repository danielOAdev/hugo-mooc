import { removeStoredTheme, setTheme } from './theme.mjs';
import { removeStoredFontScale, setFontSize } from './font-scale.mjs';

document.querySelector('#form-a11y button[type="reset"]')
    .addEventListener('click', () => {
        removeStoredTheme()
        setTheme('auto')

        removeStoredFontScale();
        setFontSize('1');
    }
)