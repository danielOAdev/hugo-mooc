/**
 * Implementa funcionalidade de definição da preferência de tamanho do texto do site.
 * @author Daniel de Oliveira Araujo <danieloadev@gmail.com>
 * @copyright Daniel de Oliveira Araujo 2025
 */

showActiveFontScale(getPreferredFontScale());

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedFontScale = getStoredFontScale();
    if (storedFontScale === 'auto') {
        setFontScale(getPreferredFontScale());
    }
});

document.querySelectorAll('input[name="font-scale"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const fontScale = radio.value;
        setStoredFontScale(fontScale);
        setFontSize(fontScale);
    })
});

/**
 * Retorna a preferência de tamanho do texto em Local Storage.
 * @returns {string} 1, 1.25, 1.5
 */
export function getStoredFontScale() {
    return localStorage.getItem('font-scale');
}

/**
 * Armazena preferência de tamanho do texto em Local Storage.
 * @param {string} fontScale  1, 1.25, 1.5
 */
export function setStoredFontScale(fontScale) {
    return localStorage.setItem('font-scale', fontScale);
}

/**
 * Remove preferência de tamanho do texto em Local Storage.
 */
export function removeStoredFontScale() {
    localStorage.removeItem('font-scale');
}

/**
 * Retorna a preferência de tamanho do texto do usuário.
 * @returns {string} 1, 1.25, 1.5
 */
export function getPreferredFontScale() {
    const storedFontScale = getStoredFontScale();
    if (storedFontScale) {
        return storedFontScale;
    } else {
        return '1';
    }
}

/**
 * Aplica a escala à propriedade de estilo "font-size" do elemento <html>.
 * @param {string} fontScale 1, 1.25, 1.5
 */
export function setFontSize(fontScale) {
    document.documentElement.style.setProperty("font-size", `${fontScale}em`);
}

/**
 * Marca o botão de radio correspondente.
 * @param {string} fontScale 1, 1.25, 1.5
 */
export function showActiveFontScale(fontScale) {
    const radioToCheck = document.querySelector(`input[name="font-scale"][value="${fontScale}"]`);
    
    if (!radioToCheck) {
        const checkedRadio = document.querySelector(`input[name="font-scale"]:checked`);
        if (!checkedRadio) {
            return;
        }
        checkedRadio.checked = false;
        return;
    }
    
    radioToCheck.checked = true;
}
