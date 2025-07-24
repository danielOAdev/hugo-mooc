/**
 * Implementa funcionalidade de definição da preferência de tema.
 * @author Daniel de Oliveira Araujo <danieloadev@gmail.com>
 * @copyright Daniel de Oliveira Araujo 2025
 */

selecionaVigiConfigTema(getLocal());

// gtag('config', 'G-WXPN4ETG2Q', {'theme': getTema(), 'update': true});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getLocal()
    if (!storedTheme || storedTheme === 'auto' ) {
        theme.setTema('auto')
    }
});

document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const theme = radio.value
        setLocal(theme)
        setTema(theme)
    })
})

/**
 * Retorna a preferência de tema em Local Storage.
 * @returns {string} auto, light, dark ou highcontrast
 */
export function getLocal() {
    return localStorage.getItem('preferenciaTema');
}

/**
 * Armazena preferência de tema em Local Storage.
 * @param {string} theme auto, light, dark ou highcontrast
 */
export function setLocal(theme) {
    return localStorage.setItem('preferenciaTema', theme);
}

/**
 * Remove preferência de tema em Local Storage.
 */
export function removeStoredTheme() {
    localStorage.removeItem('preferenciaTema');
}

/**
 * Retorna a preferência de tema do usuário.
 * @returns {string} auto, light, dark ou highcontrast
 */
export function getTema() {
    const storedTheme = getLocal()
    if (storedTheme && storedTheme !== 'auto') {
        return storedTheme
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Altera o atributo "data-bs-theme" do elemento <html>.
 * @param {string} theme auto, light, dark ou highcontrast
 */
export function setTema(theme) {
    if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
}

/**
 * Seleciona o botão de radio correspondente.
 * @param {string} theme auto, light, dark ou highcontrast
 */
export function selecionaVigiConfigTema(theme) {
    const radioToCheck = document.querySelector(`input[name="theme"][value="${theme}"]`)
    
    if (!radioToCheck) {
        return
    }
    
    radioToCheck.checked = true;
}
